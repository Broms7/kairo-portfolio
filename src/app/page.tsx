import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Award,
  Star,
  Droplet,
  Pipette,
  Flame,
  Wrench,
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle2,
  Bot,
  Zap,
} from "lucide-react";
import { QuoteSimulator } from "@/components/quote/QuoteSimulator";

export const metadata: Metadata = {
  title: "Plombier 24/7 · Devis IA en 60 secondes",
  description:
    "Plomberie Express : intervention rapide en Île-de-France, devis instantané par IA, qualification automatique. Sans engagement.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section
      aria-label="Présentation"
      className="relative overflow-hidden bg-chalk"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint bg-blueprint-lg opacity-60"
      />

      <div className="container-prose relative grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-24">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <span className="tag-spec">
            <span className="h-1.5 w-1.5 rounded-full bg-brick animate-pulse" aria-hidden="true" />
            Disponible 24/7 · Île-de-France
          </span>
          <h1 className="mt-4 h-slab text-balance text-4xl font-bold text-petrol sm:text-5xl lg:text-6xl">
            Coupez l&apos;arrivée d&apos;eau.{" "}
            <span className="text-copper">On arrive</span>.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-graphite/80">
            Plombier d&apos;urgence à <strong className="text-petrol">60 minutes</strong> de
            chez vous. Devis transparent en 60 secondes, artisan certifié RGE,
            garantie 2 ans sur l&apos;intervention.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/devis" className="btn-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Devis IA gratuit
            </Link>
            <a href="tel:+33970000000" className="btn-emergency">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Urgence 24/7
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              "Intervention sous 60 min",
              "Devis transparent",
              "Garantie 2 ans",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-emerald-500"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — embedded simulator */}
        <div className="relative">
          <QuoteSimulator compact />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Trust ─────────────────────────── */

function TrustStrip() {
  const items = [
    { icon: Clock, label: "Sous 60 min en urgence", sub: "24/7" },
    { icon: ShieldCheck, label: "Garantie 2 ans", sub: "pièces & main d'œuvre" },
    { icon: Award, label: "Artisans certifiés RGE", sub: "Qualibat" },
    { icon: Star, label: "4.9/5 sur 1 280 avis", sub: "Google · Trustpilot" },
  ];
  return (
    <section
      aria-label="Garanties"
      className="border-y border-slate-200 bg-white"
    >
      <div className="container-prose grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="font-semibold text-brand-navy">{label}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── Services ─────────────────────────── */

const SERVICES = [
  {
    id: "fuite",
    label: "Recherche de fuite",
    desc: "Détection non destructive, caméra thermique, intervention rapide.",
    icon: Droplet,
    accent: "from-blue-500/15 to-blue-500/5 text-blue-600",
  },
  {
    id: "debouchage",
    label: "Débouchage",
    desc: "Évier, WC, douche, canalisation — résolu en moins d'1h.",
    icon: Pipette,
    accent: "from-cyan-500/15 to-cyan-500/5 text-cyan-600",
  },
  {
    id: "chauffage",
    label: "Chauffage & chaudière",
    desc: "Dépannage, entretien annuel, remplacement, mise en service.",
    icon: Flame,
    accent: "from-orange-500/15 to-orange-500/5 text-orange-600",
  },
  {
    id: "installation",
    label: "Installation sanitaire",
    desc: "Salle de bain complète, robinetterie, ballon d'eau chaude.",
    icon: Wrench,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
  },
];

function ServicesGrid() {
  return (
    <section
      aria-label="Nos services"
      id="services"
      className="container-prose py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
          Services
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          Tout ce dont votre plomberie a besoin
        </h2>
        <p className="mt-3 text-slate-600">
          Une expertise complète, du dépannage d&apos;urgence à l&apos;installation neuve.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ id, label, desc, icon: Icon, accent }) => (
          <Link
            key={id}
            href={`/services#${id}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-premium"
          >
            <span
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-sm border-2 ${accent}`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-bold text-brand-navy">{label}</h3>
            <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
              En savoir plus
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      icon: Bot,
      title: "1. Décrivez en 30s",
      desc: "Notre IA pose les bonnes questions pour qualifier votre besoin.",
    },
    {
      icon: Zap,
      title: "2. Devis instantané",
      desc: "Estimation transparente, sans surprise, en moins de 60 secondes.",
    },
    {
      icon: Wrench,
      title: "3. Artisan dépêché",
      desc: "Un plombier certifié intervient au créneau choisi.",
    },
  ];
  return (
    <section
      aria-label="Comment ça marche"
      className="bg-brand-navy py-20 text-white"
    >
      <div className="container-prose">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-kairo-gold/30 bg-kairo-gold/10 px-3 py-1 text-xs font-semibold text-kairo-gold">
            Comment ça marche
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            3 étapes, zéro friction
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="relative rounded-md border-2 border-copper/30 bg-petrol-soft p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-300">{desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-kairo-gold md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── Testimonials ─────────────────────────── */

function Testimonials() {
  const reviews = [
    {
      name: "Julie M.",
      role: "Paris 11e",
      rating: 5,
      content:
        "Fuite à 22h, devis IA en 1 minute, plombier sur place à 23h. Service incroyable, transparent.",
    },
    {
      name: "Karim B.",
      role: "Boulogne-Billancourt",
      rating: 5,
      content:
        "J'ai pu envoyer une photo de mon tuyau via le chat — l'IA a tout compris immédiatement.",
    },
    {
      name: "Sophie L.",
      role: "Versailles",
      rating: 5,
      content:
        "Devis exact, aucun surcoût. L'artisan est arrivé pile à l'heure annoncée. Bravo !",
    },
  ];

  return (
    <section aria-label="Avis clients" className="container-prose py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          Ils nous ont fait confiance
        </h2>
        <p className="mt-3 text-slate-600">
          1 280+ interventions notées 4.9/5 par nos clients.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-0.5" aria-label={`Note : ${r.rating} sur 5`}>
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-kairo-gold text-kairo-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
              «&nbsp;{r.content}&nbsp;»
            </blockquote>
            <footer className="mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-copper text-xs font-bold text-white">
                {r.name.charAt(0)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-brand-navy">
                  {r.name}
                </p>
                <p className="text-xs text-slate-500">{r.role}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── Final CTA ─────────────────────────── */

function FinalCTA() {
  return (
    <section
      aria-label="Appel à l'action final"
      className="container-prose pb-20"
    >
      <div className="relative overflow-hidden rounded-md bg-petrol p-10 text-center text-white shadow-premium sm:p-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blueprint bg-blueprint-sm opacity-15"
        />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Une fuite ? Un bouchage ? Pas de panique.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Lancez le simulateur IA et obtenez un devis vérifié, sans
            engagement, en moins d&apos;une minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-navy shadow-premium transition-all hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Lancer le simulateur
            </Link>
            <a href="tel:+33970000000" className="btn-emergency">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Appel direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
