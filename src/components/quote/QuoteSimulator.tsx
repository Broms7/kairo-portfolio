"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Droplet,
  Pipette,
  Flame,
  Wrench,
  AlertTriangle,
  Clock,
  CalendarDays,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Loader2,
  ScanLine,
  Database,
  ShieldCheck,
  RefreshCw,
  Download,
  MapPin,
  Mail,
  User as UserIcon,
  Phone,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import {
  useQuoteStore,
  selectCanProceed,
  type QuoteStep,
} from "@/store/useQuoteStore";
import type { IssueType, Urgency } from "@/types";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

const STEPS_LABEL: Record<QuoteStep, string> = {
  1: "Problème",
  2: "Détails",
  3: "Urgence",
  4: "Contact",
  5: "Analyse IA",
  6: "Devis",
};

/* ──────────────────────────── Root ──────────────────────────── */

export function QuoteSimulator({ compact = false }: { compact?: boolean }) {
  const step = useQuoteStore((s) => s.step);

  return (
    <section
      aria-label="Simulateur de devis IA"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-premium",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-10"
      )}
    >
      {/* Decorative gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-kairo-gold/10 blur-3xl"
      />

      <Header step={step} />
      <Stepper step={step} />

      <div className="relative mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={SPRING}
          >
            {step === 1 && <Step1Issue />}
            {step === 2 && <Step2Details />}
            {step === 3 && <Step3Urgency />}
            {step === 4 && <Step4Contact />}
            {step === 5 && <Step5Processing />}
            {step === 6 && <Step6Result />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────── Header ─────────────────────────── */

function Header({ step }: { step: QuoteStep }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Simulateur IA
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
          Devis instantané en 60 secondes
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Étape {step} / 6 · {STEPS_LABEL[step]}
        </p>
      </div>
      <div className="hidden items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 sm:flex">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Sans engagement · 0€
      </div>
    </div>
  );
}

/* ─────────────────────────── Stepper ─────────────────────────── */

function Stepper({ step }: { step: QuoteStep }) {
  return (
    <ol className="mt-6 flex items-center gap-2" aria-label="Progression">
      {([1, 2, 3, 4, 5, 6] as QuoteStep[]).map((n) => {
        const active = n === step;
        const done = n < step;
        return (
          <li key={n} className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                initial={false}
                animate={{ width: done || active ? "100%" : "0%" }}
                transition={SPRING}
                className={cn(
                  "absolute left-0 top-0 h-full rounded-full",
                  done
                    ? "bg-copper"
                    : active
                      ? "bg-copper"
                      : "bg-transparent"
                )}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ─────────────────────────── Step 1 ─────────────────────────── */

const ISSUES: {
  id: IssueType;
  label: string;
  description: string;
  icon: typeof Droplet;
  accent: string;
}[] = [
  {
    id: "fuite",
    label: "Fuite d'eau",
    description: "Tuyau, robinet, infiltration",
    icon: Droplet,
    accent: "from-blue-500/20 to-blue-500/5 text-blue-600",
  },
  {
    id: "debouchage",
    label: "Débouchage",
    description: "Évier, WC, canalisation",
    icon: Pipette,
    accent: "from-cyan-500/20 to-cyan-500/5 text-cyan-600",
  },
  {
    id: "chauffage",
    label: "Chauffage",
    description: "Chaudière, radiateur",
    icon: Flame,
    accent: "from-orange-500/20 to-orange-500/5 text-orange-600",
  },
  {
    id: "installation",
    label: "Installation",
    description: "Sanitaires, robinetterie",
    icon: Wrench,
    accent: "from-violet-500/20 to-violet-500/5 text-violet-600",
  },
];

function Step1Issue() {
  const issueType = useQuoteStore((s) => s.issueType);
  const update = useQuoteStore((s) => s.updateField);

  return (
    <StepShell
      title="Quel est votre problème ?"
      subtitle="Sélectionnez le type d'intervention dont vous avez besoin."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ISSUES.map((opt) => {
          const Icon = opt.icon;
          const selected = issueType === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => update("issueType", opt.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING}
              aria-pressed={selected}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all",
                selected
                  ? "border-brand-blue bg-brand-blue/5 shadow-premium ring-2 ring-brand-blue/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div
                className={cn(
                  "mb-3 inline-flex h-11 w-11 items-center justify-center rounded-sm border-2",
                  opt.accent
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-semibold text-brand-navy">{opt.label}</p>
              <p className="mt-0.5 text-sm text-slate-500">
                {opt.description}
              </p>
              <AnimatePresence>
                {selected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={SPRING}
                    className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <NavButtons />
    </StepShell>
  );
}

/* ─────────────────────────── Step 2 ─────────────────────────── */

const DETAILS_BY_ISSUE: Record<IssueType, string[]> = {
  fuite: [
    "Fuite visible (tuyau apparent)",
    "Fuite cachée (mur / plafond)",
    "Robinet qui goutte",
    "Infiltration importante",
  ],
  debouchage: [
    "Évier de cuisine",
    "WC",
    "Douche / baignoire",
    "Canalisation principale",
  ],
  chauffage: [
    "Chaudière en panne",
    "Pas d'eau chaude",
    "Radiateur froid",
    "Entretien annuel",
  ],
  installation: [
    "Robinetterie / mitigeur",
    "Lavabo / WC",
    "Douche / baignoire",
    "Cumulus / chauffe-eau",
  ],
};

function Step2Details() {
  const issueType = useQuoteStore((s) => s.issueType);
  const details = useQuoteStore((s) => s.details);
  const update = useQuoteStore((s) => s.updateField);

  const presets = issueType ? DETAILS_BY_ISSUE[issueType] : [];

  return (
    <StepShell
      title="Précisez votre situation"
      subtitle="Ces détails permettent d'affiner l'estimation. Tout est optionnel."
    >
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const active = details === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => update("details", active ? "" : preset)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active
                  ? "border-brand-blue bg-brand-blue text-white shadow-premium"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue"
              )}
            >
              {preset}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <label
          htmlFor="freetext"
          className="mb-1.5 block text-sm font-medium text-brand-navy"
        >
          Description libre <span className="text-slate-400">(optionnel)</span>
        </label>
        <textarea
          id="freetext"
          rows={4}
          value={details}
          onChange={(e) => update("details", e.target.value.slice(0, 500))}
          placeholder="Ex : Fuite sous l'évier de la cuisine depuis ce matin, eau qui s'accumule..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        />
        <p className="mt-1 text-right text-xs text-slate-400">
          {details.length} / 500
        </p>
      </div>

      <NavButtons />
    </StepShell>
  );
}

/* ─────────────────────────── Step 3 ─────────────────────────── */

const URGENCY_OPTIONS: {
  id: Urgency;
  label: string;
  desc: string;
  icon: typeof AlertTriangle;
  ring: string;
}[] = [
  {
    id: "immediate",
    label: "Urgence absolue",
    desc: "Intervention sous 60 minutes",
    icon: AlertTriangle,
    ring: "border-brand-orange bg-brand-orange/5 ring-brand-orange/30",
  },
  {
    id: "24h",
    label: "Sous 24h",
    desc: "Rapide, créneau dans la journée",
    icon: Clock,
    ring: "border-brand-blue bg-brand-blue/5 ring-brand-blue/30",
  },
  {
    id: "planned",
    label: "Sur rendez-vous",
    desc: "Planifié sous 3 à 5 jours",
    icon: CalendarDays,
    ring: "border-emerald-500 bg-emerald-50 ring-emerald-300",
  },
];

function Step3Urgency() {
  const urgency = useQuoteStore((s) => s.urgency);
  const update = useQuoteStore((s) => s.updateField);

  return (
    <StepShell
      title="À quelle vitesse devons-nous intervenir ?"
      subtitle="L'urgence influence le tarif et la disponibilité."
    >
      <div className="grid grid-cols-1 gap-3">
        {URGENCY_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const selected = urgency === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => update("urgency", opt.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              transition={SPRING}
              aria-pressed={selected}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-5 text-left transition-all",
                selected
                  ? `${opt.ring} ring-2 shadow-premium`
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                  opt.id === "immediate" && "bg-brand-orange/10 text-brand-orange",
                  opt.id === "24h" && "bg-brand-blue/10 text-brand-blue",
                  opt.id === "planned" && "bg-emerald-100 text-emerald-700"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-brand-navy">{opt.label}</p>
                <p className="text-sm text-slate-500">{opt.desc}</p>
              </div>
              {selected && (
                <CheckCircle2 className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              )}
            </motion.button>
          );
        })}
      </div>

      <NavButtons />
    </StepShell>
  );
}

/* ─────────────────────────── Step 4 ─────────────────────────── */

const contactStepSchema = z.object({
  fullName: z.string().min(2, "Nom trop court").max(80),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro de téléphone français invalide"
    ),
  zipCode: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  consent: z
    .boolean()
    .refine((v) => v === true, "Consentement requis pour traiter votre demande"),
});

type ContactInput = z.infer<typeof contactStepSchema>;

function Step4Contact() {
  const store = useQuoteStore();
  const submit = useQuoteStore((s) => s.submitQuoteToAPI);
  const errorMessage = useQuoteStore((s) => s.errorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactStepSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: store.fullName,
      email: store.email,
      phone: store.phone,
      zipCode: store.zipCode,
      consent: store.consent,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    store.updateField("fullName", data.fullName);
    store.updateField("email", data.email);
    store.updateField("phone", data.phone);
    store.updateField("zipCode", data.zipCode);
    store.updateField("consent", data.consent);
    await submit();
  });

  return (
    <StepShell
      title="Vos coordonnées"
      subtitle="Pour vous envoyer le devis et coordonner l'intervention."
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Nom complet"
            icon={<UserIcon className="h-4 w-4" />}
            error={errors.fullName?.message}
          >
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              {...register("fullName")}
              className={inputCls(!!errors.fullName)}
            />
          </Field>

          <Field
            id="zipCode"
            label="Code postal"
            icon={<MapPin className="h-4 w-4" />}
            error={errors.zipCode?.message}
          >
            <input
              id="zipCode"
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              {...register("zipCode")}
              className={inputCls(!!errors.zipCode)}
            />
          </Field>

          <Field
            id="email"
            label="Email"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCls(!!errors.email)}
            />
          </Field>

          <Field
            id="phone"
            label="Téléphone"
            icon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              {...register("phone")}
              className={inputCls(!!errors.phone)}
            />
          </Field>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 cursor-pointer hover:border-brand-blue transition-colors">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          <span className="text-xs leading-relaxed text-slate-600">
            J&apos;accepte d&apos;être contacté(e) par Plomberie Express dans le
            cadre de cette demande de devis. Mes données ne sont pas
            communiquées à des tiers (RGPD).
          </span>
        </label>
        {errors.consent && (
          <p className="-mt-2 text-xs text-red-600">{errors.consent.message}</p>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => useQuoteStore.getState().prev()}
            className="btn-ghost"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Générer mon devis IA
          </button>
        </div>
      </form>
    </StepShell>
  );
}

/* ─────────────────────────── Step 5 ─────────────────────────── */

const PROCESSING_LINES = [
  { icon: ScanLine, text: "Analyse de votre demande via IA…" },
  { icon: Database, text: "Vérification des plannings artisans…" },
  { icon: MapPin, text: "Géolocalisation des techniciens disponibles…" },
  { icon: ShieldCheck, text: "Calcul du devis le plus juste…" },
];

function Step5Processing() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveLine((i) => (i + 1) % PROCESSING_LINES.length);
    }, 550);
    return () => clearInterval(t);
  }, []);

  return (
    <StepShell
      title="L'IA prépare votre devis"
      subtitle="Quelques secondes seulement…"
    >
      {/* Scanner UI */}
      <div className="relative overflow-hidden rounded-md border-2 border-petrol/10 bg-white p-6">
        <div className="relative h-32">
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-copper shadow-[0_0_8px_rgba(184,115,51,0.6)]"
            initial={{ top: 0 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="space-y-3 p-4">
            <div className="skeleton h-3 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
            <div className="skeleton h-3 w-2/3" />
            <div className="skeleton h-3 w-2/5" />
          </div>
        </div>
      </div>

      {/* Looping status */}
      <div className="mt-6 space-y-2">
        {PROCESSING_LINES.map((line, idx) => {
          const Icon = line.icon;
          const isActive = idx === activeLine;
          const isDone = idx < activeLine;
          return (
            <motion.div
              key={idx}
              animate={{
                opacity: isActive ? 1 : isDone ? 0.6 : 0.3,
                x: isActive ? 4 : 0,
              }}
              transition={SPRING}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm"
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  isActive && "bg-brand-blue/10 text-brand-blue",
                  isDone && "bg-emerald-100 text-emerald-700",
                  !isActive && !isDone && "bg-slate-100 text-slate-400"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </span>
              <span
                className={cn(
                  "font-medium",
                  isActive ? "text-brand-navy" : "text-slate-500"
                )}
              >
                {line.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </StepShell>
  );
}

/* ─────────────────────────── Step 6 ─────────────────────────── */

function Step6Result() {
  const result = useQuoteStore((s) => s.result);
  const reset = useQuoteStore((s) => s.reset);
  const issueType = useQuoteStore((s) => s.issueType);
  const fullName = useQuoteStore((s) => s.fullName);

  if (!result) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">Aucun devis disponible.</p>
        <button onClick={reset} className="btn-ghost mt-4">
          Recommencer
        </button>
      </div>
    );
  }

  const downloadMockPdf = () => {
    const blob = new Blob(
      [
        `PLOMBERIE EXPRESS — DEVIS\n` +
          `Réf : ${result.quoteId}\n` +
          `Client : ${fullName}\n` +
          `Type : ${issueType}\n` +
          `Estimation : ${formatPrice(result.priceMin)} – ${formatPrice(result.priceMax)}\n` +
          `Délai : ${result.estimatedArrival}\n` +
          `Généré le : ${new Date(result.generatedAt).toLocaleString("fr-FR")}\n\n` +
          `(Document mock — démo Kaïro)`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.quoteId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <StepShell
      title="Votre devis est prêt 🎉"
      subtitle="Synthèse générée par notre IA en moins de 3 secondes."
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING}
        className="overflow-hidden rounded-md border-2 border-copper bg-white p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
              Estimation
            </p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
              {formatPrice(result.priceMin)}
              <span className="text-2xl text-slate-400"> – </span>
              {formatPrice(result.priceMax)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tout compris · TVA incluse
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            CRM mis à jour
          </span>
        </div>

        <div className="mt-5 grid gap-3 rounded-xl bg-white/60 p-4 sm:grid-cols-2">
          <Info label="Délai d'intervention" value={result.estimatedArrival} />
          <Info label="Référence devis" value={result.quoteId} mono />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Détail estimé
          </p>
          <ul className="space-y-1.5">
            {result.breakdown.map((b) => (
              <li
                key={b.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-600">{b.label}</span>
                <span className="font-semibold text-brand-navy">
                  {formatPrice(b.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={downloadMockPdf}
          className="btn-primary flex-1"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Télécharger mon devis
        </button>
        <button type="button" onClick={reset} className="btn-ghost flex-1">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Nouveau devis
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Un artisan vous contactera sous peu pour confirmer le rendez-vous.
      </p>
    </StepShell>
  );
}

/* ─────────────────────────── Helpers ─────────────────────────── */

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight text-brand-navy">
        {title}
      </h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function NavButtons() {
  const step = useQuoteStore((s) => s.step);
  const next = useQuoteStore((s) => s.next);
  const prev = useQuoteStore((s) => s.prev);
  const canProceed = useQuoteStore(selectCanProceed);

  return (
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      {step > 1 ? (
        <button type="button" onClick={prev} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={next}
        disabled={!canProceed}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Suivant
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-brand-navy"
      >
        <span className="text-slate-400" aria-hidden="true">
          {icon}
        </span>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-slate-50 px-3.5 py-2.5 text-sm transition-colors",
    "focus:bg-white focus:outline-none focus:ring-2",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20"
  );
}

function Info({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-sm font-semibold text-brand-navy",
          mono && "font-mono"
        )}
      >
        {value}
      </p>
    </div>
  );
}
