import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image src='/logo.webp' alt="Eastwind Trust" className="h-14 w-auto bg-white/95 rounded-lg p-2" width={160} height={56} />
          <p className="text-sm text-primary-foreground/75 leading-relaxed">
            Guiding You Home with Trust. Quality residential stands in Harare.
          </p>
          <a
            href="https://www.youtube.com/@granttsikisayi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/85 hover:text-white transition"
          >
            <YouTubeIcon className="h-5 w-5" /> Watch on YouTube
          </a>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> 1272 Ventersburg, Sunwaycity, Harare</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> <span>+263 242 133 604<br />+263 771 944 499</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> eastwindtrust01@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">Hours</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> Mon–Fri: 08:00–16:00</li>
            <li className="ml-6">Sat: 08:00–13:00</li>
            <li className="ml-6">Sun: Closed</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-base">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-primary-foreground/85 hover:text-white">Home</Link></li>
            <li><Link href="/about" className="text-primary-foreground/85 hover:text-white">About</Link></li>
            <li><Link href="/land-for-sale" className="text-primary-foreground/85 hover:text-white">Land for Sale</Link></li>
            <li><Link href="/gallery" className="text-primary-foreground/85 hover:text-white">Gallery</Link></li>
            <li><Link href="/contact" className="text-primary-foreground/85 hover:text-white">Get In Touch</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 text-xs text-primary-foreground/65 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Eastwind Trust. All rights reserved.</p>
          <p>Building with Integrity. Growing with Trust.</p>
        </div>
      </div>
    </footer>
  );
}
