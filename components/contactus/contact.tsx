import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteLayout } from "../pagelayout";
import { PageHeader } from "../pageheader";
import { LeadForm } from "../home/leadform";



export default function  ContactPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="Get In Touch" subtitle="Let Eastwind Trust guide you home." image='/contact-banner.jpg' />

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Contact Information</h3>
              <h2 className="text-3xl font-semibold mb-2">We'd love to hear from you.</h2>
              <p className="text-muted-foreground">Reach out by phone, email or visit our office.</p>
            </div>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-sm mb-1">Address</p>
                  <p className="text-sm text-muted-foreground">1272 Ventersburg, Sunwaycity, Harare</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-sm mb-1">Phone</p>
                  <a href="tel:+263242133604" className="block text-sm text-muted-foreground hover:text-primary">+263 242 133 604</a>
                  <a href="tel:+263771944499" className="block text-sm text-muted-foreground hover:text-primary">+263 771 944 499</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-sm mb-1">Email</p>
                  <a href="mailto:eastwindtrust01@gmail.com" className="text-sm text-muted-foreground hover:text-primary">eastwindtrust01@gmail.com</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Clock className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-sm mb-1">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon–Fri: 08:00 – 16:00</p>
                  <p className="text-sm text-muted-foreground">Sat: 08:00 – 13:00</p>
                  <p className="text-sm text-muted-foreground">Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-soft">
              <h3 className="text-2xl font-semibold mb-1">Send us a message</h3>
              <p className="text-sm text-muted-foreground mb-6">We respond within business hours.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 text-center shadow-elegant">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-3">Limited Availability</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Act now — stands are selling fast.</h2>
          <Link href="/land" className="inline-flex items-center justify-center rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition">
            View Land for Sale
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
