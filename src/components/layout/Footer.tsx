import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { LEGAL } from "@/lib/legal";
import { PlomberieMark } from "./PlomberieMark";

const SERVICES = [
  { href: "/services#fuite", label: "Recherche de fuite" },
  { href: "/services#debouchage", label: "Débouchage canalisation" },
  { href: "/services#chauffage", label: "Chauffage & chaudière" },
  { href: "/services#installation", label: "Installation sanitaire" },
];

const COMPANY = [
  { href: "/a-propos", label: "À propos" },
  { href: "/devis", label: "Devis IA en 60s" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/admin-demo", label: "Démo dashboard artisan" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-petrol bg-petrol text-white/80">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="container-prose grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
          <TrustBadge
            icon={<Clock className="h-5 w-5" />}
            title="Intervention 24/7"
            subtitle="Sous 60 minutes en urgence"
          />
          <TrustBadge
            icon={<Shield className="h-5 w-5" />}
            title="Garantie pièces & main d'œuvre"
            subtitle="2 ans · décennale active"
          />
          <TrustBadge
            icon={<Award className="h-5 w-5" />}
            title="Artisans certifiés RGE Qualibat"
            subtitle={`N° ${LEGAL.qualibat}`}
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="container-prose grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2 font-bold">
            <PlomberieMark size={36} />
            <span className="font-slab text-lg text-white">
              Plomberie<span className="text-copper"> Express</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Le savoir-faire artisanal, augmenté par l&apos;IA. Devis instantané,
            qualification automatique, intervention rapide.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-copper" aria-hidden="true" />
              <a
                href={`tel:+33${LEGAL.phone.replace(/\D/g, "").slice(1)}`}
                className="text-white/90 hover:text-white transition-colors"
              >
                {LEGAL.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-copper" aria-hidden="true" />
              <a
                href={`mailto:${LEGAL.email}`}
                className="text-white/90 hover:text-white transition-colors"
              >
                {LEGAL.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-copper"
                aria-hidden="true"
              />
              <span>{LEGAL.address}</span>
            </li>
          </ul>
        </div>

        {/* Services */}
        <FooterColumn title="Services" links={SERVICES} className="md:col-span-3" />

        {/* Company */}
        <FooterColumn title="Entreprise" links={COMPANY} className="md:col-span-3" />

        {/* Legal */}
        <FooterColumn title="Informations" links={LEGAL_LINKS} className="md:col-span-2" />
      </div>

      {/* Legal info strip */}
      <div className="border-t border-white/10 bg-petrol-deep">
        <div className="container-prose grid grid-cols-1 gap-2 py-5 text-[11px] text-white/50 sm:grid-cols-2 lg:grid-cols-4">
          <span>SIRET : <span className="font-mono text-white/70">{LEGAL.siret}</span></span>
          <span>TVA : <span className="font-mono text-white/70">{LEGAL.vat}</span></span>
          <span>Code APE : <span className="font-mono text-white/70">{LEGAL.ape}</span></span>
          <span>Décennale : <span className="font-mono text-white/70">{LEGAL.insuranceCompany} · {LEGAL.insuranceNumber}</span></span>
        </div>
      </div>

      {/* Bottom bar — Kaïro signature */}
      <div className="border-t border-white/10 bg-petrol-deep">
        <div className="container-prose flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {LEGAL.companyName} — Démonstration fictive
          </p>
          <p className="flex items-center gap-1.5">
            <span>Conçu &amp; développé par</span>
            <a
              href="https://kairo.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-kairo-gold underline-offset-2 hover:underline"
            >
              l&apos;agence Kaïro
            </a>
            <span aria-hidden="true">·</span>
            <span>Web &amp; Automatisation IA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-slab text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              <span className="h-px w-0 bg-copper transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustBadge({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-2 border-copper/40 text-copper">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>
    </div>
  );
}
