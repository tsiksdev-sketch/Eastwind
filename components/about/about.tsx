
import { Target, Eye, ShieldCheck, Award, Recycle, Scale } from "lucide-react";
import { SiteLayout } from "../pagelayout";
import { PageHeader } from "../pageheader";
import { CTABanner } from "../ctabanner";



const values = [
  { icon: ShieldCheck, label: "Integrity" },
  { icon: Scale, label: "Accountability" },
  { icon: Award, label: "Excellence" },
  { icon: Recycle, label: "Sustainability" },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About Us" title="About Eastwind Trust" subtitle="Guiding families home through quality land, fair pricing, and lasting trust." image='/about-banner.jpg' />

      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">Building with Integrity. Growing with Trust.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>Eastwind Trust was founded with a simple belief: every Zimbabwean family deserves an honest, transparent path to owning land — and ultimately, a home.</p>
            <p>We specialise in residential stands in carefully chosen locations around Harare, starting with Donybrooke Zimre Extension. Each plot is properly surveyed, fairly priced, and backed by a flexible payment plan that fits real family budgets.</p>
            <p>From your first enquiry to the final installment, we treat every transaction with the integrity it deserves. No hidden costs. No surprises. Just a clear path to your dream home.</p>
            <p>We're more than land sellers — we're partners in your story.</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-3xl bg-card border border-border p-10 hover:shadow-soft transition">
            <Target className="h-10 w-10 text-primary mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">To make residential land ownership accessible, transparent, and dignified for every Zimbabwean family through fair pricing and flexible payments.</p>
          </div>
          <div className="rounded-3xl bg-card border border-border p-10 hover:shadow-soft transition">
            <Eye className="h-10 w-10 text-primary mb-5" />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">To be Zimbabwe's most trusted name in residential land — building communities that grow with the families who call them home.</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 text-center">Our Values</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">What we stand for.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.label} className="rounded-2xl bg-card border border-border p-8 text-center hover:border-primary/40 hover:shadow-soft transition">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <p className="font-semibold">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Trusted by families across Harare.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Transparent Sales", d: "Clear pricing, written terms, zero hidden fees." },
              { t: "Flexible Payment Options", d: "6, 12 or 18-month plans tailored to your budget." },
              { t: "Customer Support", d: "Real people, real answers — every step of the way." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-secondary/50 p-8">
                <h3 className="font-semibold text-lg mb-2 text-primary">{x.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner secondary={{ to: "/land-for-sale", label: "View Land for Sale" }} />
    </SiteLayout>
  );
}
