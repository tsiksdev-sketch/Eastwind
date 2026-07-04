'use client'

import { useMemo, useState } from "react";
import { SiteLayout } from "../pagelayout";
import { PageHeader } from "../pageheader";
import { CTABanner } from "../ctabanner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Image as ImageIcon, LayoutGrid, X } from "lucide-react";
import Image from "next/image";

type Item =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

const items: Item[] = [
  { type: "image", src: "/a.webp", alt: "Surveyed residential stand" },
  { type: "video", src: "/drone.mp4", poster: "/a.webp", alt: "Drone tour of Donybrooke" },
  { type: "image", src: "/b.webp", alt: "Access road to development" },
  { type: "image", src: "/c.webp", alt: "Cleared land ready for construction" },
  { type: "image", src: "/d.webp", alt: "New home under construction" },
  { type: "image", src: "/e.webp", alt: "Family walking their stand" },
  { type: "image", src: "/f.webp", alt: "Site pegs and boundary" },
  { type: "image", src: "/g.webp", alt: "Green trees on-site" },
  { type: "image", src: "/h.webp", alt: "Wide view of the estate" },
];

type Filter = "all" | "image" | "video";

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Item | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
    [filter],
  );

  const tabs: { key: Filter; label: string; icon: typeof LayoutGrid }[] = [
    { key: "all", label: "All", icon: LayoutGrid },
    { key: "image", label: "Photos", icon: ImageIcon },
    { key: "video", label: "Videos", icon: Play },
  ];

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="A glimpse of our developments."
        subtitle="Photos and drone footage from Donybrooke and the families building with us."
        image='/gallery-banner.jpg'
      />

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Media library</p>
              <h2 className="text-2xl md:text-3xl font-semibold">Browse by type</h2>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft">
              {tabs.map(({ key, label, icon: Icon }) => {
                const active = filter === key;
                const count = key === "all" ? items.length : items.filter((i) => i.type === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <span className={`text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground/70"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((item, i) => (
              <button
                key={`${item.src}-${i}`}
                onClick={() => setOpen(item)}
                className="block w-full aspect-[4/3] rounded-2xl overflow-hidden group relative bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Image
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={item.type === "image" ? item.src : item.poster}
                  alt={item.alt}
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-elegant backdrop-blur transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-full bg-background/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground">
                  {item.type === "video" ? "Video" : "Photo"}
                </span>
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No media yet in this category.</p>
          )}
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none">
          <button
            onClick={() => setOpen(null)}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          {open?.type === "image" && (
            <img src={open.src} alt={open.alt} className="w-full h-auto max-h-[85vh] object-contain" />
          )}
          {open?.type === "video" && (
            <video src={open.src} poster={open.poster} controls autoPlay className="w-full h-auto max-h-[85vh]" />
          )}
        </DialogContent>
      </Dialog>

      <CTABanner secondary={{ to: "/land-for-sale", label: "View Land for Sale" }} />
    </SiteLayout>
  );
}
