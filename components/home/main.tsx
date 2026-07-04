import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet, Headphones, Leaf, MapPin, Ruler, CheckCircle2, Images } from "lucide-react";
import Image from "next/image";
import { LeadForm } from "./leadform";
import { CTABanner } from "./ctabanner";
import { SiteLayout } from "../pagelayout";



const Imag = [
  {name:"g1", src:"/a.webp"},
  {name:"g2", src:"/b.webp"},
  {name:"g3", src:"/c.webp"},
  {name:"g4", src:"/d.webp"},
  {name:"g5", src:"/e.webp"},
  {name:"g6", src:"/f.webp"}

]


const features = [
  { icon: ShieldCheck, title: "Transparent Sales", text: "Clear pricing, no hidden costs. What you see is what you pay." },
  { icon: Wallet, title: "Flexible Payments", text: "Pay 50% to secure your stand, then choose 6, 12 or 18-month plans." },
  { icon: Headphones, title: "Customer Support", text: "A dedicated sales team that walks you through every step." },
  { icon: Leaf, title: "Integrity & Sustainability", text: "Building communities responsibly — for today and generations to come." },
];

const steps = [
  { n: "01", title: "Secure your stand", text: "Pay a 50% deposit to reserve your preferred plot." },
  { n: "02", title: "Choose your plan", text: "Spread the balance over monthly installments." },
  { n: "03", title: "Flexible terms", text: "Plans available from 6 to 18 months." },
  { n: "04", title: "Zero hidden costs", text: "Straightforward, transparent, honest." },
];

export default function HomePage() {
  return (
  
      <SiteLayout>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
         style={{
  backgroundImage: `linear-gradient(115deg, rgba(27,86,130,0.92) 0%, rgba(27,86,130,0.55) 55%, rgba(27,86,130,0.15) 100%), url("/hero.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-36 text-primary-foreground">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-medium border border-white/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-900 animate-pulse" /> Now Selling in Donybrooke
            </span>
            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.02] mb-6">
              Build your <em className="not-italic text-blue-900">dream home</em> today
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-3 max-w-xl">
              Residential stands in Donybrooke Zimre Extension, Harare.
            </p>
            <p className="text-3xl md:text-4xl font-display font-semibold mb-10">
              From only <span className="text-blue-900">$30</span> per m²
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/land-for-sale" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition shadow-soft">
                View Land for Sale <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
                Get In Touch
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-md pt-8 border-t border-white/20">
              <div>
                <p className="text-2xl md:text-3xl font-display font-semibold">300–800</p>
                <p className="text-xs text-primary-foreground/75 uppercase tracking-wider mt-1">m² sizes</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-semibold">6–18</p>
                <p className="text-xs text-primary-foreground/75 uppercase tracking-wider mt-1">Month plans</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-semibold">50%</p>
                <p className="text-xs text-primary-foreground/75 uppercase tracking-wider mt-1">To secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Why Eastwind Trust</p>
              <h2 className="text-4xl md:text-5xl font-semibold max-w-2xl">A partner you can build with.</h2>
            </div>
            <p className="text-muted-foreground max-w-md">Four reasons families across Harare choose Eastwind Trust to begin their homeownership journey.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-soft transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LAND */}
      <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Land for Sale</p>
          <h2 className="text-4xl md:text-5xl font-semibold mb-14 max-w-2xl">Premium stands in a prime location.</h2>
          <div className="rounded-3xl bg-card border border-border overflow-hidden grid lg:grid-cols-2 shadow-soft">
            <div className="aspect-4/3 lg:aspect-auto bg-cover bg-center" style={{ backgroundImage: `url('/gallery-3.jpg')` }} />
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-primary mb-4">
                <MapPin className="h-4 w-4" /> Donybrooke Zimre Extension, Harare
              </div>
              <h3 className="text-3xl font-semibold mb-4">Donybrooke Residential Stands</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Well-surveyed, ready-to-build stands in a fast-growing residential community on the outskirts of Harare.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Price</p>
                  <p className="text-2xl font-display font-semibold text-primary">$30 <span className="text-sm text-muted-foreground font-sans">/m²</span></p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Stand sizes</p>
                  <p className="text-2xl font-display font-semibold text-primary">300–800 <span className="text-sm text-muted-foreground font-sans">m²</span></p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/land-for-sale" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition">
                  Request Availability <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition">
                  Book a Site Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-semibold">Simple, transparent process.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="rounded-2xl border border-border bg-card p-7 h-full hover:shadow-soft transition">
                  <span className="block text-5xl font-display font-semibold text-primary/15 mb-4">{s.n}</span>
                  <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:bg-primary-dark transition shadow-soft">
              Talk to our Sales Team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

       <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Gallery</p>
              <h2 className="text-4xl md:text-5xl font-semibold">A glimpse of our developments.</h2>
            </div>
            <Link href="/land" className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Claim Yours<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Imag.map((img, i) => (
        <div
          key={img.name}
          className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "row-span-2" : ""}`}
        >
          {/* If you can use next/image, it's better */}
          <img
            src={img.src}
            alt={img.name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}
    </div>
        </div>
      </section>

     
      {/* TRUST STATEMENT */}
      <section className="px-6 lg:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Ruler className="h-10 w-10 text-primary mx-auto mb-6" />
          <p className="text-3xl md:text-4xl font-display italic text-foreground leading-snug">
            "Building with Integrity. Growing with Trust."
          </p>
          <p className="mt-6 text-muted-foreground">
            Every stand we sell is a foundation for a family's future. We're proud to be part of yours.
          </p>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="px-6 lg:px-12 py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Let's start the conversation.</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tell us a little about yourself and we'll get back to you with stand availability, pricing details and a personalised payment plan.
            </p>
            <ul className="space-y-3">
              {["Free consultation", "No obligation", "Personalised payment plan"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </section>

      <CTABanner secondary={{ to: "/land", label: "View Land for Sale" }} />
    
     </SiteLayout>
  );
}
