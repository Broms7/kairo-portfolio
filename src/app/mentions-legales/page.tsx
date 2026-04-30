import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Plomberie Express — éditeur, hébergeur, SIRET, assurance.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main className="container-prose max-w-3xl py-16">
      <h1 className="h-slab text-4xl font-bold text-petrol">Mentions légales</h1>
      <p className="mt-2 text-sm text-graphite/60">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>

      <Section title="Éditeur du site">
        <p>
          <strong>{LEGAL.companyName}</strong>
          <br />
          SARL au capital de {LEGAL.capital}
          <br />
          Siège social : {LEGAL.address}
          <br />
          Téléphone : {LEGAL.phone}
          <br />
          Email : {LEGAL.email}
        </p>
        <ul className="mt-3 list-inside list-disc text-sm text-graphite/80">
          <li>SIRET : {LEGAL.siret}</li>
          <li>RCS : {LEGAL.rcs}</li>
          <li>N° TVA intracommunautaire : {LEGAL.vat}</li>
          <li>Code APE : {LEGAL.ape} (Travaux d&apos;installation d&apos;eau et de gaz)</li>
          <li>Directeur de la publication : {LEGAL.publisher}</li>
        </ul>
      </Section>

      <Section title="Assurance professionnelle">
        <p>
          Assurance responsabilité civile professionnelle &amp; décennale —{" "}
          <strong>{LEGAL.insuranceCompany}</strong>, contrat n°{" "}
          <strong>{LEGAL.insuranceNumber}</strong>.
        </p>
        <p className="mt-2 text-sm text-graphite/70">
          Couverture géographique : France métropolitaine.
        </p>
      </Section>

      <Section title="Certifications">
        <ul className="list-inside list-disc text-sm text-graphite/80">
          <li>RGE Qualibat — n° {LEGAL.qualibat}</li>
          <li>Professionnel Gaz (PG) — n° {LEGAL.pg}</li>
          <li>Membre CAPEB Île-de-France</li>
        </ul>
      </Section>

      <Section title="Hébergement">
        <p>
          Le site est hébergé par{" "}
          <strong>Vercel Inc.</strong> — 340 S Lemon Ave #4133, Walnut, CA
          91789, USA — vercel.com.
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, images, logo, code)
          est la propriété de {LEGAL.companyName} ou de ses partenaires. Toute
          reproduction sans autorisation écrite préalable est interdite.
        </p>
      </Section>

      <Section title="Litiges & médiation">
        <p>
          En cas de litige, le client peut saisir gratuitement le médiateur de la
          consommation : <strong>CNPM Médiation</strong>, 27 avenue de la
          Libération, 42400 Saint-Chamond — cnpm-mediation-consommation.eu.
        </p>
      </Section>

      <Section title="Démonstration technique">
        <p className="text-sm text-graphite/70">
          Ce site est une démonstration technique réalisée par l&apos;agence{" "}
          <a
            href="https://kairo.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-copper underline-offset-2 hover:underline"
          >
            Kaïro
          </a>{" "}
          dans le cadre d&apos;un portfolio. Les coordonnées et numéros affichés
          sont fictifs.
        </p>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-t border-petrol/10 pt-6">
      <h2 className="h-slab text-xl font-bold text-petrol">{title}</h2>
      <div className="mt-3 space-y-2 text-graphite/90">{children}</div>
    </section>
  );
}
