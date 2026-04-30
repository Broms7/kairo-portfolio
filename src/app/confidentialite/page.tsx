import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Plomberie Express collecte, utilise et protège vos données personnelles. RGPD compliant.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <main className="container-prose max-w-3xl py-16">
      <h1 className="h-slab text-4xl font-bold text-petrol">
        Politique de confidentialité
      </h1>
      <p className="mt-2 text-sm text-graphite/60">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
      </p>

      <p className="mt-6 text-graphite/90">
        {LEGAL.companyName} traite vos données personnelles dans le cadre du
        Règlement Général sur la Protection des Données (RGPD) et de la loi
        Informatique et Libertés.
      </p>

      <Section title="1. Données collectées">
        <p>Nous collectons uniquement les données strictement nécessaires :</p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li>Nom, email, téléphone, code postal — via le simulateur de devis</li>
          <li>Description de votre demande de plomberie</li>
          <li>Échanges via le chatbot (anonymisés après 30 jours)</li>
          <li>Données techniques (logs, IP) — durée de conservation : 12 mois</li>
        </ul>
      </Section>

      <Section title="2. Finalités du traitement">
        <ul className="list-inside list-disc text-sm">
          <li>Vous recontacter pour confirmer le devis et planifier l&apos;intervention</li>
          <li>Établir la facture et la garantie</li>
          <li>Améliorer la qualité de notre service (analyse anonymisée)</li>
        </ul>
      </Section>

      <Section title="3. Base légale">
        <p>
          Le traitement repose sur votre consentement explicite (case à cocher
          du formulaire) et sur l&apos;exécution du contrat de prestation.
        </p>
      </Section>

      <Section title="4. Durée de conservation">
        <ul className="list-inside list-disc text-sm">
          <li>Devis non transformés : 12 mois</li>
          <li>Clients avec intervention : 10 ans (obligation comptable et garantie décennale)</li>
          <li>Logs techniques : 12 mois</li>
        </ul>
      </Section>

      <Section title="5. Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li>Accès à vos données</li>
          <li>Rectification</li>
          <li>Effacement (droit à l&apos;oubli)</li>
          <li>Limitation du traitement</li>
          <li>Portabilité</li>
          <li>Opposition</li>
        </ul>
        <p className="mt-2">
          Pour exercer ces droits, contactez-nous à{" "}
          <a href={`mailto:${LEGAL.email}`} className="font-semibold text-copper">
            {LEGAL.email}
          </a>
          .
        </p>
      </Section>

      <Section title="6. Sous-traitants">
        <p>Nous utilisons les sous-traitants suivants, tous conformes RGPD :</p>
        <ul className="mt-2 list-inside list-disc text-sm">
          <li>Vercel (hébergement) — sous Standard Contractual Clauses</li>
          <li>Brevo (envois email transactionnels) — France</li>
        </ul>
      </Section>

      <Section title="7. Cookies">
        <p>
          Ce site utilise uniquement des cookies techniques essentiels au
          fonctionnement (session, préférences). Aucun cookie publicitaire ou
          analytique tiers n&apos;est déposé sans votre accord.
        </p>
      </Section>

      <Section title="8. Réclamation">
        <p>
          Vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong>{" "}
          (cnil.fr) si vous estimez que vos droits ne sont pas respectés.
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
