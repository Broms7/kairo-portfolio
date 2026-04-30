"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn, sleep } from "@/lib/utils";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

const contactSchema = z.object({
  fullName: z.string().min(2, "Nom trop court").max(80),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro français invalide"
    )
    .optional()
    .or(z.literal("")),
  subject: z.enum(["devis", "intervention", "info", "autre"]),
  message: z.string().min(10, "Message trop court (10 caractères min)").max(2000),
  consent: z.boolean().refine((v) => v, "Consentement requis"),
});

type ContactInput = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { subject: "info" },
  });

  const onSubmit = handleSubmit(async () => {
    // simulate network round-trip
    await sleep(1200);
    setSubmitted(true);
    reset();
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            className="py-12 text-center"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-brand-navy">
              Message bien reçu !
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
              Nous revenons vers vous sous 1 heure (en jours ouvrés). En cas
              d&apos;urgence, appelez-nous directement.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn-ghost mt-6"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-4"
          >
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
                label={
                  <>
                    Téléphone <span className="text-slate-400">(optionnel)</span>
                  </>
                }
                icon={<Phone className="h-4 w-4" />}
                error={errors.phone?.message}
              >
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone")}
                  className={inputCls(!!errors.phone)}
                />
              </Field>

              <Field
                id="subject"
                label="Sujet"
                icon={<MessageSquare className="h-4 w-4" />}
                error={errors.subject?.message}
              >
                <select
                  id="subject"
                  {...register("subject")}
                  className={inputCls(!!errors.subject)}
                >
                  <option value="info">Demande d&apos;information</option>
                  <option value="devis">Demande de devis</option>
                  <option value="intervention">Prise de RDV intervention</option>
                  <option value="autre">Autre</option>
                </select>
              </Field>
            </div>

            <Field
              id="message"
              label="Message"
              icon={<MessageSquare className="h-4 w-4" />}
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                placeholder="Décrivez votre besoin…"
                className={cn(inputCls(!!errors.message), "resize-none")}
              />
            </Field>

            <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 cursor-pointer hover:border-brand-blue transition-colors">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
              />
              <span className="text-xs leading-relaxed text-slate-600">
                J&apos;accepte d&apos;être recontacté(e) au sujet de ma demande.
                Mes données restent confidentielles (RGPD).
              </span>
            </label>
            {errors.consent && (
              <p className="-mt-2 text-xs text-red-600">{errors.consent.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Envoyer le message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
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
  label: React.ReactNode;
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
