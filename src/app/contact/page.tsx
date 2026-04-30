import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact · Plomberie Express",
  description:
    "Contactez Plomberie Express pour une question, un devis ou une intervention. Téléphone 24/7, email, formulaire — réponse sous 1h en jours ouvrés.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative bg-chalk py-14 sm:py-20"><div aria-hidden className="absolute inset-0 bg-blueprint bg-blueprint-lg opacity-50" />
        <div className="container-prose text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-slate-600">
            Une urgence ? Appelez-nous. Pour tout le reste, ce formulaire fera
            l&apos;affaire — réponse sous 1 heure en jours ouvrés.
          </p>
        </div>
      </section>

      <section className="relative container-prose py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <ContactForm />

          <aside className="space-y-4">
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Téléphone 24/7"
              primary="09 70 00 00 00"
              href="tel:+33970000000"
              accent="text-brand-orange bg-brand-orange/10"
            />
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              primary="contact@plomberie-express.fr"
              href="mailto:contact@plomberie-express.fr"
              accent="text-brand-blue bg-brand-blue/10"
            />
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="Zone d'intervention"
              primary="Île-de-France & périphérie"
              accent="text-emerald-700 bg-emerald-100"
            />
            <ContactCard
              icon={<Clock className="h-5 w-5" />}
              title="Horaires bureau"
              primary="Lun – Ven · 8h – 19h"
              secondary="Urgences acceptées 24/7"
              accent="text-kairo-gold bg-kairo-gold/15"
            />
          </aside>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  primary,
  secondary,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary?: string;
  href?: string;
  accent: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium"
    >
      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
        {icon}
      </span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <p className="mt-0.5 font-semibold text-brand-navy">{primary}</p>
      {secondary && <p className="text-xs text-slate-500">{secondary}</p>}
    </Wrapper>
  );
}
