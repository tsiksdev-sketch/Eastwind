'use client'

import { useEffect, useRef } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    if (!image) return;
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [image]);

  return (
    <section className="relative overflow-hidden border-b border-border isolate">
      {image && (
        <>
          <div
            ref={bgRef}
            className="absolute inset-0 -z-20 will-change-transform"
            style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(115deg, rgba(27,86,130,0.92) 0%, rgba(27,86,130,0.72) 50%, rgba(27,86,130,0.4) 100%)",
            }}
          />
        </>
      )}
      <div className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-36 ${image ? "text-primary-foreground" : ""}`}>
        {eyebrow && (
          <p className={`text-xs uppercase tracking-[0.25em] mb-4 ${image ? "text-primary-foreground/85" : "text-primary"}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl font-semibold max-w-3xl leading-[1.02]">{title}</h1>
        {subtitle && (
          <p className={`mt-6 text-lg md:text-xl max-w-2xl ${image ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {image && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-8 w-px bg-primary-foreground/40 animate-pulse" />
        </div>
      )}
    </section>
  );
}
