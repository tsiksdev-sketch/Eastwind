'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";


const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },

  { to: "/land", label: "Land for Sale" },
   { to: "/contact", label: "Get In Touch" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky max-w-6xl mx-auto top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="hidden md:flex items-center justify-end gap-6 px-6 lg:px-12 py-2 text-xs text-muted-foreground border-b border-border/40">
        <a href="tel:+263242133604" className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Phone className="h-3 w-3" /> +263 242 133 604
        </a>
        <a href="mailto:eastwindtrust01@gmail.com" className="hover:text-primary transition-colors">
          eastwindtrust01@gmail.com
        </a>
      </div>
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/eastwind-logo.webp" alt="Eastwind Trust" className="h-12 w-auto" width={140} height={48} />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary-dark transition-all hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium py-2"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Get In Touch
          </Link>
        </div>
      )}
    </header>
  );
}
