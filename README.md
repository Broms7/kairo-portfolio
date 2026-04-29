# Plomberie Express — Démo Kaïro

Application Next.js 14 (App Router) + Zustand + Framer Motion + Zod.
Démonstration technique flagship de l'agence **Kaïro**.

## Démarrage

```bash
npm install
npm run dev
```

## Architecture

- **Next.js 14** App Router (Server + Client Components)
- **Zustand** : store global (Quoting Engine, Session)
- **Framer Motion** : springs (stiffness 400 / damping 30), `layoutId`
- **Tailwind** + tokens design (`brand-navy`, `brand-blue`, `brand-orange`, `kairo-gold`)
- **Zod** + `react-hook-form` : validation stricte
- **Mock API** : `/api/quote`, `/api/chat`

## Phases

- [x] **Phase 1** — Setup (Next, Tailwind, fonts, layout, `cn()`)
- [ ] Phase 2 — State Zustand & API mocks
- [ ] Phase 3 — Navbar / Footer / Bannière Kaïro
- [ ] Phase 4 — Chatbot IA (Vision simulée)
- [ ] Phase 5 — QuoteSimulator (6 steps)
- [ ] Phase 6 — `/admin-demo` (Kanban SaaS)
- [ ] Phase 7 — Pages publiques + SEO
