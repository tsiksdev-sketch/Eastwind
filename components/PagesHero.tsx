'use client'

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  align?: "left" | "center";
  children?: ReactNode;
};

/**
 * Interactive page hero with:
 *  - scroll parallax on the background image
 *  - cursor-following tilt + a floating accent orb that tracks the mouse
 *  - subtle floating "polaroid" image that drifts with the pointer
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  align = "left",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  // pointer offset in range [-1, 1]
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // negative when scrolled past the top of the hero
      setScrollY(-rect.top);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setP({ x: x * 2 - 1, y: y * 2 - 1 });
  };

  const onMouseLeave = () => setP({ x: 0, y: 0 });

  const bgY = scrollY * 0.35;
  const bgScale = 1.15;

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative isolate overflow-hidden bg-navy"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 -z-10 will-change-transform transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${p.x * -14}px, ${bgY + p.y * -14}px, 0) scale(${bgScale})`,
        }}
      >
        <img
          src={image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(15,27,61,0.88) 0%, rgba(15,27,61,0.55) 45%, rgba(15,27,61,0.25) 100%)",
        }}
      />

      {/* Cursor-following accent orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-105 w-105 rounded-full blur-3xl opacity-60 transition-transform duration-300 ease-out"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate3d(calc(-50% + ${p.x * 120}px), calc(-50% + ${p.y * 80}px), 0)`,
          background:
            "radial-gradient(circle, rgba(31,84,130,0.85) 0%, rgba(31,84,130,0) 70%)",
        }}
      />

      {/* Soft grain / vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 100%, rgba(0,0,0,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="container-px mx-auto relative">
        <div
          className={`min-h-[64vh] lg:min-h-[72vh] py-24 lg:py-32 flex flex-col justify-end ${
            align === "center" ? "items-center text-center" : ""
          }`}
        >
          <div
            className="will-change-transform transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${p.x * 8}px, ${p.y * 6}px, 0)`,
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {eyebrow}
            </span>

            <h1 className="mt-6 font-display text-[2.5rem] sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-white max-w-4xl">
              {title}
            </h1>

            {subtitle && (
              <p
                className={`mt-6 max-w-xl text-lg leading-relaxed text-white/75 ${
                  align === "center" ? "mx-auto" : ""
                }`}
              >
                {subtitle}
              </p>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>

        {/* Floating polaroid preview that follows the cursor */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-56 will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${p.x * 28}px, calc(-50% + ${p.y * 24}px), 0) rotate(${p.x * 4 + 3}deg)`,
          }}
        >
          <div className="rounded-3xl bg-white p-3 shadow-lift">
            <div className="overflow-hidden rounded-[1rem] aspect-3/4">
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
                style={{
                  transform: `scale(1.2) translate(${p.x * -10}px, ${p.y * -10}px)`,
                }}
              />
            </div>
            <div className="px-1 pt-3 pb-1">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand">
                Eastwind Trust
              </div>
              <div className="text-xs font-semibold text-foreground">
                Drone perspective
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-background"
      />
    </section>
  );
}
