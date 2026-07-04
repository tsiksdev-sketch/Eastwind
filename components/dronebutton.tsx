'use client'

import { useState } from "react";
import { Play, X } from "lucide-react";


export default function DroneButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Play aerial drone footage"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-3 pr-5 py-3 shadow-elegant hover:bg-primary-dark transition-all hover:-translate-y-1"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" aria-hidden />
        <span className="relative h-9 w-9 rounded-full bg-white/15 flex items-center justify-center backdrop-blur">
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </span>
        <span className="relative text-sm font-semibold hidden sm:inline">Watch Drone Tour</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-elegant bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src='/drone.mp4'
              autoPlay
              controls
              loop
              playsInline
              className="w-full h-auto block"
            />
            <div className="p-5 bg-primary text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 mb-1">Aerial Tour</p>
              <p className="font-semibold">Donybrooke Zimre Extension, Harare</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
