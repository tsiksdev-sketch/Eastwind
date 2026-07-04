import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTABanner({ secondary }: { secondary?: { to: string; label: string } }) {
  return (
    <section className="px-6 lg:px-12 py-20">
      <div className="max-w-6xl mx-auto rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 shadow-elegant relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-3">Limited Availability</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-xl">
              Act now — stands are selling fast
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </Link>
            {secondary && (
              <Link
                href={secondary.to}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}