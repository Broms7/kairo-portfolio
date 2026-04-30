"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";

const STORAGE_KEY = "kairo_banner_dismissed";

export function KairoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(window.localStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Bannière de démonstration Kaïro"
      className="relative z-30 w-full bg-petrol text-white"
    >
      <div className="container-prose flex items-center justify-center gap-3 py-2 text-center text-xs sm:text-sm">
        <span className="hidden h-1.5 w-1.5 rounded-full bg-kairo-gold sm:block" aria-hidden="true" />
        <span className="text-white/80">
          Démonstration technique conçue par l&apos;agence{" "}
          <a
            href="https://kairo.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-semibold text-kairo-gold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kairo-gold"
          >
            Kaïro
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer la bannière"
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
