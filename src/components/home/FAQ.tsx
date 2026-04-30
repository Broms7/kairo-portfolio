"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Combien coûte un dépannage plombier en urgence ?",
    a: "Une intervention d'urgence à Paris démarre à 120€ (déplacement + diagnostic), puis le tarif dépend de la nature du problème. Notre devis IA vous donne une fourchette précise en 60 secondes — sans engagement. La majoration urgence (nuit, week-end) est plafonnée à +60% du tarif jour.",
  },
  {
    q: "Vous intervenez vraiment 24h/24 et 7j/7 ?",
    a: "Oui. Notre équipe d'astreinte couvre toute l'Île-de-France, week-ends et jours fériés inclus. Le délai moyen d'arrivée pour une urgence (fuite active, inondation) est de 60 minutes intra-Paris, 90 minutes en banlieue.",
  },
  {
    q: "Comment fonctionne le devis IA ?",
    a: "Vous décrivez votre problème (4 étapes guidées + photo optionnelle). Notre IA croise des milliers d'interventions historiques pour estimer le coût et le délai. Un artisan valide ensuite la fourchette avant intervention. Aucun frais caché.",
  },
  {
    q: "Le devis est-il vraiment gratuit et sans engagement ?",
    a: "Oui, à 100%. Le devis IA est instantané et gratuit. Si vous souhaitez un devis détaillé après inspection sur place, il est également gratuit (déduit du montant final si vous validez l'intervention).",
  },
  {
    q: "Quelles garanties offrez-vous ?",
    a: "Toutes nos interventions sont garanties 2 ans pièces et main d'œuvre. Nous sommes couverts par une assurance décennale (MAAF Pro) et certifiés RGE Qualibat. Si l'intervention ne résout pas votre problème, nous repassons gratuitement.",
  },
  {
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Carte bancaire (sans contact, à distance), virement, espèces (jusqu'à 1000€), chèque. Paiement uniquement après intervention validée. Possibilité de paiement en 3x sans frais à partir de 500€.",
  },
  {
    q: "J'habite en copropriété — vous gérez les démarches ?",
    a: "Oui. Nous travaillons avec la majorité des syndics franciliens et savons identifier rapidement la responsabilité (privatif vs parties communes). Nous fournissons un rapport d'intervention détaillé pour vos démarches d'assurance.",
  },
  {
    q: "Puis-je envoyer une photo via le chatbot ?",
    a: "Oui. Notre chatbot accepte les photos pour pré-diagnostiquer (tuyau, robinet, dégât des eaux). Cela accélère la qualification et permet à l'artisan d'arriver avec les bonnes pièces.",
  },
  {
    q: "Et si je ne suis pas satisfait de l'intervention ?",
    a: "Engagement « satisfait ou non facturé » sur le diagnostic : si nous ne résolvons pas le problème lors de la première intervention, le déplacement n'est pas facturé. Nous repassons sans frais sous 24h.",
  },
  {
    q: "Les artisans sont-ils des employés ou des sous-traitants ?",
    a: "Tous nos plombiers sont salariés de Plomberie Express SARL. Pas de sous-traitance, pas d'auto-entrepreneurs masqués. Cela garantit la qualité, la formation continue et la responsabilité juridique.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <section
        aria-label="Questions fréquentes"
        className="container-prose py-20"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="tag-spec">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              FAQ
            </span>
            <h2 className="mt-3 h-slab text-3xl font-bold text-petrol sm:text-4xl">
              Les questions qu&apos;on nous pose
            </h2>
            <p className="mt-3 text-graphite/70">
              Tarifs, garanties, fonctionnement de l&apos;IA — on répond
              franchement, comme entre artisan et client.
            </p>
          </div>

          <div className="mt-10 divide-y-2 divide-petrol/10 border-y-2 border-petrol/10">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-chalk/60 focus-visible:outline-none focus-visible:bg-chalk"
                  >
                    <span
                      className={cn(
                        "font-slab font-semibold transition-colors",
                        isOpen ? "text-copper" : "text-petrol"
                      )}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-5 w-5 shrink-0 text-copper transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-graphite/80 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-graphite/60">
            Vous ne trouvez pas votre réponse ?{" "}
            <a
              href="tel:+33970000000"
              className="font-semibold text-copper underline-offset-2 hover:underline"
            >
              Appelez-nous au 09 70 00 00 00
            </a>
          </p>
        </div>
      </section>

      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
