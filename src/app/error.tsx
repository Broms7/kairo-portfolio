"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Phone } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En prod : envoyer à Sentry / log endpoint
    console.error("[App error]", error);
  }, [error]);

  return (
    <main className="container-prose flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-brick bg-brick/10 text-brick">
        <AlertOctagon className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="mt-6 h-slab text-3xl font-bold text-petrol">
        Une fuite dans le système
      </h1>
      <p className="mt-2 max-w-md text-graphite/70">
        Un imprévu s&apos;est produit côté technique. Vous pouvez réessayer ou
        nous joindre directement, on intervient 24/7.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-graphite/40">
          Réf. erreur : {error.digest}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-primary">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Réessayer
        </button>
        <a href="tel:+33970000000" className="btn-emergency">
          <Phone className="h-4 w-4" aria-hidden="true" />
          09 70 00 00 00
        </a>
        <Link href="/" className="btn-ghost">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
