"use client"

import { useMemo, useState, type FormEvent } from "react"
import { z } from "zod"
import { CheckCircle2, AlertCircle } from "lucide-react"

// Base fields shared by every variant. The variant-specific rules
// (required phone, size options) are layered on in `buildSchema`.
const SIZE_OPTIONS = ["300 m²", "400 m²", "500 m²", "600 m²", "800 m²"] as const

function buildSchema(withSize: boolean, requirePhone: boolean) {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "Please enter your first name")
      .max(80, "That name is too long")
      .regex(/^[\p{L}\s'-]+$/u, "Use letters only"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address")
      .max(160, "That email is too long"),
    phone: requirePhone
      ? z
          .string()
          .trim()
          .min(1, "Phone number is required")
          .regex(/^[+()\d][\d\s()-]{5,}$/, "Enter a valid phone number")
      : z
          .string()
          .trim()
          .max(40)
          .refine((v) => v === "" || /^[+()\d][\d\s()-]{5,}$/.test(v), "Enter a valid phone number")
          .optional()
          .or(z.literal("")),
    size: withSize
      ? z.union([z.enum(SIZE_OPTIONS), z.literal("")]).optional()
      : z.string().optional(),
    message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
  })
}

type Fields = { firstName: string; email: string; phone: string; size: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { firstName: "", email: "", phone: "", size: "", message: "" }

export function LeadForm({ withSize = false, requirePhone = false }: { withSize?: boolean; requirePhone?: boolean }) {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState<null | { firstName: string }>(null)

  const schema = useMemo(() => buildSchema(withSize, requirePhone), [withSize, requirePhone])

  function validate(next: Fields): Errors {
    const parsed = schema.safeParse(next)
    if (parsed.success) return {}
    const out: Errors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Fields
      if (key && !out[key]) out[key] = issue.message
    }
    return out
  }

  function update(key: keyof Fields, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }

  function blur(key: keyof Fields) {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ firstName: true, email: true, phone: true, size: true, message: true })
    if (Object.keys(found).length > 0) return

    setLoading(true)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the variant flags so one route can validate every page's config.
        body: JSON.stringify({ ...values, withSize, requirePhone }),
      })
      const result = await res.json()
      if (!res.ok || !result.ok) {
        if (result.issues) setErrors(result.issues)
        setErrors((prev) => ({ ...prev, email: result.error || "Something went wrong. Please try again." }))
        return
      }
      setSent({ firstName: values.firstName })
      setValues(EMPTY)
      setTouched({})
    } catch {
      setErrors((prev) => ({ ...prev, email: "Network error. Please try again." }))
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 px-6 py-12 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-foreground text-balance">
          {`Thank you, ${sent.firstName}!`}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          {"Your message has been sent successfully. Our team will get back to you within business hours."}
        </p>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Send another message
        </button>
      </div>
    )
  }

  const fieldCls = (key: keyof Fields) =>
    `w-full rounded-lg border bg-background px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${
      errors[key] ? "border-destructive" : "border-input"
    }`

  const FieldError = ({ name }: { name: keyof Fields }) =>
    errors[name] ? (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-foreground/80">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => blur("firstName")}
            aria-invalid={!!errors.firstName}
            className={fieldCls("firstName")}
            placeholder="Your first name"
          />
          <FieldError name="firstName" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-foreground/80">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            className={fieldCls("email")}
            placeholder="you@example.com"
          />
          <FieldError name="email" />
        </div>
      </div>

      <div className={withSize ? "grid gap-4 sm:grid-cols-2" : ""}>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-foreground/80">
            Phone Number {requirePhone && "*"}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            className={fieldCls("phone")}
            placeholder="+263 …"
          />
          <FieldError name="phone" />
        </div>
        {withSize && (
          <div>
            <label htmlFor="size" className="mb-1.5 block text-xs font-medium text-foreground/80">
              Preferred stand size
            </label>
            <select
              id="size"
              name="size"
              value={values.size}
              onChange={(e) => update("size", e.target.value)}
              className={fieldCls("size")}
            >
              <option value="">Any size</option>
              {SIZE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-foreground/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!errors.message}
          className={fieldCls("message")}
          placeholder="Tell us how we can help…"
        />
        <FieldError name="message" />
      </div>

      <button
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
      <p className="text-xs text-muted-foreground">{"We'll respond within business hours."}</p>
    </form>
  )
}
