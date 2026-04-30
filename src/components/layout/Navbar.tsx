"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Wrench, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlomberieMark } from "./PlomberieMark";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/devis", label: "Devis IA" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b-2 border-petrol/10 bg-white shadow-crafted"
          : "border-b border-petrol/5 bg-white"
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="container-prose flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Plomberie Express — Accueil"
          className="group flex items-center gap-2 font-bold tracking-tight"
        >
          <PlomberieMark />
          <span className="font-slab text-lg text-petrol">
            Plomberie<span className="text-copper"> Express</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-copper"
                      : "text-slate-600 hover:text-petrol"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-copper/10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/admin-demo"
            className="inline-flex items-center gap-1.5 rounded-lg border border-kairo-gold/30 bg-kairo-gold/5 px-3 py-2 text-xs font-semibold text-kairo-gold transition-all hover:bg-kairo-gold/10 hover:scale-[1.02]"
            aria-label="Voir la démo dashboard artisan"
          >
            <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
            Vue Artisan
          </Link>
          <a
            href="tel:+33970000000"
            className="btn-emergency text-sm"
            aria-label="Appeler l'urgence plomberie"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Urgence 24/7
          </a>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-petrol md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <ul className="container-prose flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-copper/10 text-copper"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/admin-demo"
                  className="btn-ghost text-sm"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Vue Artisan (démo)
                </Link>
                <a href="tel:+33970000000" className="btn-emergency text-sm">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Urgence 24/7
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
