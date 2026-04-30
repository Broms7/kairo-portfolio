import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Vue Artisan — Dashboard SaaS (Démo Kaïro)",
  description:
    "Démonstration du back-office artisan : KPIs, Kanban des leads IA, notifications temps-réel. Conçu par Kaïro.",
  robots: { index: false, follow: false },
};

export default function AdminDemoPage() {
  return <AdminDashboard />;
}
