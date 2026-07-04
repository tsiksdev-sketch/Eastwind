import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, Calculator } from "lucide-react";
import { SiteLayout } from "../pagelayout";
import { LeadForm } from "../home/leadform";
import { CTABanner } from "../ctabanner";
import { PriceCalculator } from "../pricecalculator";


const plans = [
  { months: 6, deposit: "50%", desc: "Fast-track ownership with the lowest total cost.", highlight: false },
  { months: 12, deposit: "50%", desc: "Balanced monthly installments — our most popular plan.", highlight: true },
  { months: 18, deposit: "50%", desc: "Lowest monthly amount, spread over a longer term.", highlight: false },
];

const steps = [
  { n: "01", title: "Secure your stand", text: "Pay a 50% deposit to reserve your preferred plot." },
  { n: "02", title: "Choose your plan", text: "Select 6, 12 or 18 monthly installments for the balance." },
  { n: "03", title: "Pay monthly", text: "Make fixed monthly payments — no surprises." },
  { n: "04", title: "Own your stand", text: "Receive your paperwork. Start building your dream." },
];

const faqs = [
  { q: "How do I secure a stand?", a: "Submit an enquiry, schedule a site visit, and pay a 50% deposit to reserve your preferred plot." },
  { q: "Do you offer installments?", a: "Yes — after the 50% deposit you can pay the balance over 6, 12 or 18 months." },
  { q: "Are there hidden costs?", a: "No. Our pricing is transparent. The only costs outside the stand price are standard cession/transfer fees, which we explain up-front." },
  { q: "Where is the land located?", a: "Donybrooke, Zimre Extension on the outskirts of Harare — a fast-growing residential area with great access." },
  { q: "Can I visit the site?", a: "Absolutely. Book a site visit through our contact form or call us during business hours." },
];

export default function LandPage() {
  return (
    <SiteLayout>
      {/* HEADER */}
      <section
        className="relative border-b border-border"
        style={{ backgroundImage: `linear-gradient(rgba(27,86,130,0.88), rgba(27,86,130,0.75)), url(/gallery-3.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/80 mb-4">Available Now</p>
          <h1 className="text-5xl md:text-7xl font-semibold leading-[1.02] mb-6 max-w-3xl">Land for Sale</h1>
          <div className="flex items-center gap-2 text-lg mb-8">
            <MapPin className="h-5 w-5" /> Donybrooke Zimre Extension, Harare
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Price</p>
              <p className="text-3xl font-display font-semibold mt-1">$30 <span className="text-base font-sans text-primary-foreground/80">/m²</span></p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Stand sizes</p>
              <p className="text-3xl font-display font-semibold mt-1">300–800 <span className="text-base font-sans text-primary-foreground/80">m²</span></p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Plans</p>
              <p className="text-3xl font-display font-semibold mt-1">6–18 <span className="text-base font-sans text-primary-foreground/80">months</span></p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#enquire" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition shadow-soft">
              Request Availability <ArrowRight className="h-4 w-4" />
            </a>
              <PriceCalculator
              trigger={
                <button className="inline-flex items-center gap-2 rounded-full bg-gold text-foreground px-7 py-3.5 text-sm font-semibold hover:bg-gold/90 transition shadow-soft cursor-pointer">
                  <Calculator className="h-4 w-4" /> Price Calculator
                </button>
              }
            />
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
              Book a Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* AVAILABLE LISTING */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Available Stands</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-12 max-w-2xl">Donybrooke Residential Stands</h2>
          <div className="rounded-3xl border border-border overflow-hidden grid lg:grid-cols-5 bg-card shadow-soft">
            <div className="lg:col-span-2 min-h-72 bg-cover bg-center" style={{ backgroundImage: `url(/sitemap.webp)` }} />
            <div className="lg:col-span-3 p-10 md:p-14">
              <h3 className="text-3xl font-semibold mb-3">Donybrooke, Zimre Extension</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">A planned residential development with surveyed stands, graded access roads and growing community infrastructure.</p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Sizes</p>
                  <p className="text-xl font-semibold text-primary">300–800 m²</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
                  <p className="text-xl font-semibold text-primary">$30 /m²</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Status</p>
                  <p className="text-xl font-semibold text-primary">Selling Fast</p>
                </div>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {["Properly surveyed", "Title cession", "Graded roads", "Flexible payment terms"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> {x}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="#enquire" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition">
                  Request Details <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition">
                  Book a Site Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT PLANS */}
      <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Flexible Payment Options</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Choose a plan that fits.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.months} className={`rounded-3xl p-10 border transition ${p.highlight ? "bg-primary text-primary-foreground border-primary shadow-elegant scale-[1.02]" : "bg-card border-border hover:shadow-soft"}`}>
                {p.highlight && <span className="inline-block text-xs uppercase tracking-wider bg-gold text-foreground px-3 py-1 rounded-full mb-4 font-semibold">Most Popular</span>}
                <p className={`text-sm ${p.highlight ? "text-primary-foreground/80" : "text-muted-foreground"} uppercase tracking-wider`}>Plan</p>
                <p className="text-5xl font-display font-semibold mt-2 mb-1">{p.months} <span className="text-base font-sans opacity-70">months</span></p>
                <p className={`text-sm mb-6 ${p.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.deposit} deposit to secure</p>
                <p className={`leading-relaxed text-sm ${p.highlight ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Four simple steps to ownership.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-7">
                <span className="block text-5xl font-display font-semibold text-primary/15 mb-4">{s.n}</span>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 text-center">FAQs</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12">Frequently asked questions.</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/40 transition">
                <summary className="cursor-pointer font-semibold flex justify-between items-center list-none">
                  {f.q}
                  <span className="text-primary text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section id="enquire" className="px-6 lg:px-12 py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Request Availability</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Reserve your stand today.</h2>
          </div>
          <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-soft">
            <LeadForm withSize requirePhone />
          </div>
        </div>
      </section>

      <CTABanner />
    </SiteLayout>
  );
}
