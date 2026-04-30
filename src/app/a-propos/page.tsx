import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Bot, Heart, Award, Users, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos · L'artisanat augmenté par l'IA",
  description:
    "Plomberie Express : 25 ans de savoir-faire artisanal combinés aux dernières technologies d'IA pour offrir un service plomberie sans équivalent.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <main>
      <section className="relative bg-chalk py-14 sm:py-20"><div aria-hidden className="absolute inset-0 bg-blueprint bg-blueprint-lg opacity-50" />
        <div className="container-prose text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-kairo-gold/30 bg-kairo-gold/5 px-3 py-1 text-xs font-semibold text-kairo-gold">
            Notre histoire
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            L&apos;artisanat traditionnel,{" "}
            <span className="text-copper">
              augmenté par l&apos;IA
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-slate-600">
            Depuis 25 ans, nos plombiers interviennent avec rigueur et passion.
            Aujourd&apos;hui, nous combinons ce savoir-faire avec les outils
            d&apos;intelligence artificielle les plus avancés pour vous offrir
            un service inégalé.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-prose py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy">
              Une équipe humaine, des outils du futur
            </h2>
            <p className="mt-4 text-slate-600">
              Plomberie Express a été fondée en 1999 par Marc Renaud, plombier
              de père en fils. Aujourd&apos;hui, nous sommes 12 artisans
              certifiés RGE Qualibat, intervenant dans toute l&apos;Île-de-France.
            </p>
            <p className="mt-4 text-slate-600">
              En 2024, nous avons fait le pari d&apos;adopter l&apos;intelligence
              artificielle pour qualifier les demandes, générer des devis
              instantanés, et coordonner les interventions. Résultat : un délai
              moyen de réponse divisé par 8, et une satisfaction client de
              4.9/5.
            </p>
            <p className="mt-4 text-slate-600">
              Notre conviction : la technologie ne remplace pas le savoir-faire,
              elle le libère. Nos plombiers passent moins de temps au téléphone,
              plus de temps sur le terrain, à faire ce qu&apos;ils font le mieux.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Stat icon={<Award className="h-5 w-5" />} value="25+" label="années d'expérience" />
            <Stat icon={<Users className="h-5 w-5" />} value="12" label="artisans certifiés" />
            <Stat icon={<Wrench className="h-5 w-5" />} value="8 200+" label="interventions réussies" />
            <Stat icon={<MapPin className="h-5 w-5" />} value="Île-de-France" label="zone d'intervention" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nos engagements
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Value
              icon={<Heart className="h-6 w-6" />}
              title="Transparence totale"
              desc="Nos devis détaillent chaque ligne. Pas de frais cachés, pas de mauvaise surprise."
            />
            <Value
              icon={<Bot className="h-6 w-6" />}
              title="Innovation utile"
              desc="L'IA est un outil au service du client, jamais une excuse pour réduire la qualité humaine."
            />
            <Value
              icon={<Wrench className="h-6 w-6" />}
              title="Savoir-faire artisanal"
              desc="Chaque intervention est réalisée par un compagnon plombier formé, pas un sous-traitant."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-navy">
          Une question ? Un projet ?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Contactez-nous, nous répondons sous 1 heure pendant les jours ouvrés.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Nous contacter
          </Link>
          <Link href="/devis" className="btn-ghost">
            Lancer un devis IA
          </Link>
        </div>
      </section>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
        {icon}
      </span>
      <p className="mt-3 text-3xl font-bold tracking-tight text-brand-navy">
        {value}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Value({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border-2 border-copper/30 bg-petrol-soft p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  );
}
