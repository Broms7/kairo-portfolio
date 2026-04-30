import Link from "next/link";
import { Search, Home, Phone, Wrench } from "lucide-react";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="container-prose flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="font-slab text-7xl font-extrabold text-copper sm:text-9xl">
        404
      </div>
      <h1 className="mt-2 h-slab text-3xl font-bold text-petrol">
        Cette page est partie à la décharge
      </h1>
      <p className="mt-3 max-w-md text-graphite/70">
        L&apos;adresse demandée n&apos;existe plus, ou n&apos;a jamais existé.
        Pas grave — vos canalisations, elles, fonctionnent toujours.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" aria-hidden="true" />
          Accueil
        </Link>
        <Link href="/devis" className="btn-ghost">
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Demander un devis
        </Link>
        <a href="tel:+33970000000" className="btn-emergency">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Urgence 24/7
        </a>
      </div>
      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-graphite/60 underline-offset-4 hover:text-copper hover:underline"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        Voir nos services
      </Link>
    </main>
  );
}
