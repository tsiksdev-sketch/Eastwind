
'use server'

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

/**
 * Single endpoint that accommodates every variant of the lead form:
 *  - with the "size" dropdown or without it
 *  - with phone required or optional
 *
 * The client tells us which variant it is via `withSize` / `requirePhone`,
 * and we build the validation schema accordingly. The server never trusts
 * the client blindly — it re-validates the actual field values regardless
 * of which page the submission came from.
 */

// Allowed stand sizes — keep in sync with the form's <select> options.
const SIZE_OPTIONS = ["300 m²", "400 m²", "500 m²", "600 m²", "800 m²"] as const

const basePayload = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  phone: z.string().trim().max(40).optional().default(""),
  // Accept any of the known sizes, or empty ("Any size"). Unknown values are rejected.
  size: z
    .union([z.enum(SIZE_OPTIONS), z.literal("")])
    .optional()
    .default(""),
  message: z.string().trim().max(1000).optional().default(""),
  // Variant flags describing which page the form was rendered on.
  withSize: z.boolean().optional().default(false),
  requirePhone: z.boolean().optional().default(false),
})

function buildSchema(withSize: boolean, requirePhone: boolean) {
  return basePayload.superRefine((data, ctx) => {
    if (requirePhone && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Phone number is required",
      })
    }
    // If the page has no size field, ignore any size that slipped through.
    if (!withSize && data.size) {
      data.size = ""
    }
  })
}

export async function POST(request: NextRequest) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  // First pass: read the flags so we can apply the right rules.
  const flags = basePayload.pick({ withSize: true, requirePhone: true }).safeParse(json)
  const withSize = flags.success ? flags.data.withSize : false
  const requirePhone = flags.success ? flags.data.requirePhone : false

  const parsed = buildSchema(withSize, requirePhone).safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Please check your inputs",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { firstName, email, phone, size, message } = parsed.data

  const lead = {
    firstName,
    email,
    phone: phone || null,
    size: withSize ? size || null : null,
    message: message || null,
    submittedAt: new Date().toISOString(),
  }

  // Ensure Resend is configured before attempting to send.
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.LEAD_FROM_EMAIL
  const toEmail = process.env.LEAD_TO_EMAIL

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("[v0] Missing Resend configuration (RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL)")
    return NextResponse.json(
      { ok: false, error: "Email service is not configured. Please try again later." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  // A stable, human-readable From with a display name improves inbox placement.
  // NOTE: for best deliverability LEAD_FROM_EMAIL must be on a domain you have
  // verified in Resend (SPF + DKIM). DMARC alignment is what keeps mail out of spam.
  const from = /</.test(fromEmail) ? fromEmail : `Website Leads <${fromEmail}>`

  // Escape user-supplied values so they can't break the HTML or inject markup.
  const escapeHtml = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

  // Build the notification body, only including fields relevant to this variant.
  const rows: Array<[string, string]> = [
    ["Name", firstName],
    ["Email", email],
  ]
  if (requirePhone || lead.phone) rows.push(["Phone", lead.phone ?? "—"])
  if (withSize) rows.push(["Size", lead.size ?? "Any size"])
  if (lead.message) rows.push(["Message", lead.message])

  // A human-readable intro sentence is included on EVERY variant. Thin, near
  // identical emails (e.g. just name + email) look automated and get scored as
  // spam — a full sentence of real context gives filters legitimate content to
  // read and makes each message meaningfully distinct.
  const formattedDate = new Date(lead.submittedAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  })
  const intro =
    `${firstName} just reached out through your website contact form and would like to hear back from you. ` +
    `You can reply directly to this email to continue the conversation. Their details are below.`

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111;line-height:1.6;max-width:560px">
      <h2 style="margin:0 0 12px">New enquiry from ${escapeHtml(firstName)}</h2>
      <p style="margin:0 0 20px;color:#333">${escapeHtml(intro)}</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:8px 16px 8px 0;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
                 <td style="padding:8px 0">${escapeHtml(String(value)).replace(/\n/g, "<br/>")}</td>
               </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:20px;color:#666;font-size:13px">
        This enquiry was submitted on ${escapeHtml(formattedDate)}. Reply to this email to respond to ${escapeHtml(firstName)} directly.
      </p>
    </div>
  `

  // A plain-text alternative is essential — HTML-only messages score as spam,
  // and it must mirror the HTML content for the two parts to look consistent.
  const text =
    `New enquiry from ${firstName}\n\n${intro}\n\n` +
    `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n` +
    `This enquiry was submitted on ${formattedDate}. Reply to this email to respond to ${firstName} directly.`

  try {
    const { error } = await resend.emails.send({
      from,
      to: toEmail,
      // Replies go straight to the lead; also aligns the conversation for the recipient.
      replyTo: email,
      // A descriptive, non-generic subject on every variant. Bare repetitive
      // subjects like "New lead" are a strong spam signal.
      subject: `New website enquiry from ${firstName}${withSize && lead.size ? ` — ${lead.size}` : ""}`,
      html,
      text,
      headers: {
        // Unique ref stops Gmail from collapsing distinct leads into one thread.
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ ok: false, error: "Could not send your message. Please try again." }, { status: 502 })
    }
  } catch (err) {
    console.error("[v0] Resend threw:", err)
    return NextResponse.json({ ok: false, error: "Could not send your message. Please try again." }, { status: 502 })
  }

  return NextResponse.json(
    { ok: true, message: "Message sent! We'll respond within business hours." },
    { status: 201 },
  )
}
