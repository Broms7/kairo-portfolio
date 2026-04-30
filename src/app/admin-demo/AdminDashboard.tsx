"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  LayoutDashboard,
  Users,
  Wrench,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  Euro,
  Calendar,
  Clock,
  MapPin,
  Bot,
  Phone,
  Globe,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Zap,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useQuoteStore } from "@/store/useQuoteStore";
import {
  KANBAN_COLUMNS,
  MOCK_CARDS,
  MOCK_NOTIFS,
  type KanbanCard,
} from "@/components/admin/mockData";
import type { LeadStatus } from "@/types";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

/* ─────────────────────────── Root ─────────────────────────── */

export function AdminDashboard() {
  const userQuote = useQuoteStore((s) => s.result);
  const userIssue = useQuoteStore((s) => s.issueType);
  const userUrgency = useQuoteStore((s) => s.urgency);
  const userName = useQuoteStore((s) => s.fullName);
  const userZip = useQuoteStore((s) => s.zipCode);

  const cards: KanbanCard[] = useMemo(() => {
    const base = [...MOCK_CARDS];
    if (userQuote && userIssue && userUrgency) {
      base.unshift({
        id: userQuote.leadId,
        customerName: userName || "Prospect IA",
        issue: `Demande ${userIssue}${userUrgency === "immediate" ? " (URGENT)" : ""}`,
        zipCode: userZip || "—",
        priceMin: userQuote.priceMin,
        priceMax: userQuote.priceMax,
        urgency: userUrgency,
        status: "NEW_AI_LEAD",
        createdAt: userQuote.generatedAt,
        source: "ai_form",
        isFresh: true,
      });
    }
    return base;
  }, [userQuote, userIssue, userUrgency, userName, userZip]);

  return (
    <div className="bg-slate-100">
      {/* Demo banner */}
      <div className="border-b-2 border-kairo-gold/40 bg-kairo-gold/10">
        <div className="container-prose flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-navy">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kairo-gold/15 text-kairo-gold">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>
              <span className="font-bold">Vue côté Artisan</span> — Voici ce que le
              plombier reçoit quand l&apos;IA qualifie un prospect.
            </span>
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center gap-1 text-xs font-semibold text-kairo-gold hover:text-amber-700 transition-colors"
          >
            Vue côté Client
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container-prose py-6 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="min-w-0 space-y-6">
            <Topbar />
            <KPIs cards={cards} hasFresh={!!userQuote} />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
              <KanbanBoard cards={cards} />
              <NotificationsPanel hasFresh={!!userQuote} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Sidebar ─────────────────────────── */

const NAV: { icon: typeof LayoutDashboard; label: string; active?: boolean; badge?: number }[] = [
  { icon: LayoutDashboard, label: "Tableau de bord", active: true },
  { icon: Users, label: "Leads IA", badge: 4 },
  { icon: Wrench, label: "Interventions" },
  { icon: TrendingUp, label: "Statistiques" },
  { icon: Bell, label: "Notifications", badge: 2 },
  { icon: Settings, label: "Paramètres" },
];

function Sidebar() {
  return (
    <aside className="sticky top-[120px] hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 lg:block">
      {/* Brand row */}
      <div className="mb-4 flex items-center gap-2.5 rounded-md bg-petrol p-3 text-white">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue">
          <Wrench className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">Plomberie Express</p>
          <p className="truncate text-[10px] text-slate-300">SaaS Artisan v2.4</p>
        </div>
      </div>

      <nav aria-label="Navigation dashboard">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    item.active
                      ? "bg-brand-blue text-white shadow-premium"
                      : "text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                        item.active
                          ? "bg-white/20 text-white"
                          : "bg-brand-orange/15 text-brand-orange"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User pill */}
      <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-slate-200 p-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-copper text-xs font-bold text-white">
          MR
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-semibold text-brand-navy">
            Marc Renaud
          </p>
          <p className="truncate text-[10px] text-slate-500">Plombier · Niv. Pro</p>
        </div>
        <button
          type="button"
          aria-label="Déconnexion"
          className="text-slate-400 hover:text-brand-navy"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}

/* ─────────────────────────── Topbar ─────────────────────────── */

function Topbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
          Bonjour Marc 👋
        </h1>
        <p className="text-sm text-slate-500">
          Voici votre activité du{" "}
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Rechercher un lead…"
            aria-label="Rechercher"
            className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <button type="button" className="btn-primary text-sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouveau devis
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── KPIs ─────────────────────────── */

function KPIs({ cards, hasFresh }: { cards: KanbanCard[]; hasFresh: boolean }) {
  const totalRevenue = cards.reduce((acc, c) => acc + (c.priceMin + c.priceMax) / 2, 0);
  const todayCount = cards.length;
  const aiSourced = cards.filter((c) => c.source.startsWith("ai")).length;
  const conversionRate = Math.round((aiSourced / Math.max(todayCount, 1)) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KPICard
        icon={<Euro className="h-5 w-5" />}
        label="CA estimé du jour"
        value={formatPrice(totalRevenue)}
        delta="+18%"
        deltaPositive
        accent="from-emerald-500/15 to-emerald-500/5 text-emerald-600"
        spark={[8, 12, 9, 14, 18, 22, 28]}
      />
      <KPICard
        icon={<Wrench className="h-5 w-5" />}
        label="Interventions du jour"
        value={String(todayCount)}
        delta={hasFresh ? "+1 nouveau" : "+2"}
        deltaPositive
        accent="from-blue-500/15 to-blue-500/5 text-blue-600"
        spark={[3, 4, 5, 4, 6, 6, todayCount]}
      />
      <KPICard
        icon={<Zap className="h-5 w-5" />}
        label="Taux conversion IA"
        value={`${conversionRate}%`}
        delta="+6 pts"
        deltaPositive
        accent="from-amber-500/15 to-amber-500/5 text-kairo-gold"
        spark={[40, 48, 52, 55, 60, 64, conversionRate]}
      />
      <KPICard
        icon={<BarChart3 className="h-5 w-5" />}
        label="Satisfaction client"
        value="4.9 / 5"
        delta="98% avis ★★★★★"
        deltaPositive
        accent="from-violet-500/15 to-violet-500/5 text-violet-600"
        spark={[4.6, 4.7, 4.8, 4.85, 4.9, 4.9, 4.9]}
      />
    </div>
  );
}

function KPICard({
  icon,
  label,
  value,
  delta,
  deltaPositive,
  accent,
  spark,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  deltaPositive?: boolean;
  accent: string;
  spark: number[];
}) {
  // sparkline path
  const w = 80;
  const h = 28;
  const min = Math.min(...spark);
  const max = Math.max(...spark);
  const norm = (v: number) =>
    max === min ? h / 2 : h - ((v - min) / (max - min)) * h;
  const path = spark
    .map((v, i) => {
      const x = (i / (spark.length - 1)) * w;
      const y = norm(v);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={SPRING}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-sm border-2",
            accent
          )}
        >
          {icon}
        </div>
        <svg width={w} height={h} aria-hidden="true" className="text-brand-blue">
          <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-brand-navy">
        {value}
      </p>
      <p
        className={cn(
          "mt-1 inline-flex items-center gap-1 text-xs font-semibold",
          deltaPositive ? "text-emerald-600" : "text-red-500"
        )}
      >
        {deltaPositive && <ArrowUpRight className="h-3 w-3" aria-hidden="true" />}
        {delta}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────── Kanban ─────────────────────────── */

function KanbanBoard({ cards }: { cards: KanbanCard[] }) {
  return (
    <section
      aria-label="Tableau Kanban des leads"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-brand-navy">
          Pipeline des leads
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Auto-qualifié par IA
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {KANBAN_COLUMNS.map((col) => {
          const colCards = cards.filter((c) => c.status === col.id);
          return <KanbanColumn key={col.id} column={col} cards={colCards} />;
        })}
      </div>
    </section>
  );
}

function KanbanColumn({
  column,
  cards,
}: {
  column: { id: LeadStatus; label: string; tone: string };
  cards: KanbanCard[];
}) {
  const toneCls: Record<string, string> = {
    blue: "border-brand-blue/30 bg-brand-blue/5 text-brand-blue",
    orange: "border-brand-orange/30 bg-brand-orange/5 text-brand-orange",
    emerald: "border-emerald-300 bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="flex min-h-[400px] flex-col rounded-2xl bg-slate-50 p-3">
      <div
        className={cn(
          "mb-3 flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider",
          toneCls[column.tone]
        )}
      >
        <span>{column.label}</span>
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px]">
          {cards.length}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        <AnimatePresence>
          {cards.map((card) => (
            <KanbanCardView key={card.id} card={card} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function KanbanCardView({ card }: { card: KanbanCard }) {
  const sourceIcon =
    card.source === "ai_chat" || card.source === "ai_form" ? (
      <Bot className="h-3 w-3" />
    ) : card.source === "phone" ? (
      <Phone className="h-3 w-3" />
    ) : (
      <Globe className="h-3 w-3" />
    );

  const urgencyTone =
    card.urgency === "immediate"
      ? "bg-brand-orange/10 text-brand-orange border-brand-orange/30"
      : card.urgency === "24h"
        ? "bg-brand-blue/10 text-brand-blue border-brand-blue/30"
        : "bg-emerald-100 text-emerald-700 border-emerald-300";

  return (
    <motion.article
      layout
      initial={card.isFresh ? { opacity: 0, y: -10, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={SPRING}
      className={cn(
        "group relative cursor-grab rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md",
        card.isFresh
          ? "border-kairo-gold ring-2 ring-kairo-gold/30"
          : "border-slate-200"
      )}
    >
      {card.isFresh && (
        <span className="absolute -top-2 -right-2 inline-flex items-center gap-1 rounded-full bg-kairo-gold px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-premium">
          <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
          Nouveau · IA
        </span>
      )}

      {/* Customer */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-brand-navy">
            {card.customerName}
          </p>
          <p className="truncate text-xs text-slate-500">{card.issue}</p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase",
            urgencyTone
          )}
        >
          {card.urgency === "immediate"
            ? "Urgent"
            : card.urgency === "24h"
              ? "24h"
              : "Planifié"}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-0.5">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {card.zipCode}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-0.5">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {timeAgo(card.createdAt)}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-0.5 capitalize">
          {sourceIcon}
          {card.source.replace("_", " ")}
        </span>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="font-bold text-brand-navy">
          {formatPrice(card.priceMin)} – {formatPrice(card.priceMax)}
        </span>
        <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-blue" />
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── Notifications ─────────────────────────── */

function NotificationsPanel({ hasFresh }: { hasFresh: boolean }) {
  const userQuote = useQuoteStore((s) => s.result);
  const userName = useQuoteStore((s) => s.fullName);

  const notifs = [
    ...(hasFresh && userQuote
      ? [
          {
            id: "fresh",
            title: "🆕 Nouveau devis généré automatiquement",
            detail: `${userName || "Client IA"} — ${formatPrice(
              Math.round((userQuote.priceMin + userQuote.priceMax) / 2)
            )}`,
            timeAgo: "à l'instant",
            tone: "gold" as const,
          },
        ]
      : []),
    ...MOCK_NOTIFS,
  ];

  const toneCls: Record<string, string> = {
    blue: "bg-brand-blue/10 text-brand-blue",
    orange: "bg-brand-orange/10 text-brand-orange",
    emerald: "bg-emerald-100 text-emerald-700",
    gold: "bg-kairo-gold/15 text-kairo-gold",
  };

  return (
    <aside
      aria-label="Notifications"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-brand-navy">
          <Bell className="h-4 w-4" aria-hidden="true" />
          Activité temps-réel
        </h2>
        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          LIVE
        </span>
      </header>

      <ul className="space-y-2.5">
        <AnimatePresence>
          {notifs.map((n) => (
            <motion.li
              key={n.id}
              layout
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              className={cn(
                "flex items-start gap-2.5 rounded-xl p-3 transition-colors",
                n.id === "fresh"
                  ? "border border-kairo-gold/30 bg-kairo-gold/5"
                  : "hover:bg-slate-50"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  toneCls[n.tone]
                )}
              >
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-brand-navy">
                  {n.title}
                </p>
                <p className="truncate text-xs text-slate-500">{n.detail}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">{n.timeAgo}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Calendar peek */}
      <div className="mt-4 rounded-md border-2 border-petrol/10 bg-chalk p-3">
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          Prochain RDV
        </p>
        <p className="text-sm font-semibold text-brand-navy">
          14h30 · 75015 Paris
        </p>
        <p className="text-xs text-slate-500">Recherche fuite — Camille R.</p>
      </div>
    </aside>
  );
}

/* ─────────────────────────── Helpers ─────────────────────────── */

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}
