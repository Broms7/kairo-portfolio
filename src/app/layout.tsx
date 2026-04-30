import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { KairoBanner } from "@/components/layout/KairoBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotMount } from "@/components/chat/ChatbotMount";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  weight: ["500", "700", "800"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://plomberie-express.kairo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Plomberie Express — Plombier 24/7 · Devis en 60s | Démo Kaïro",
    template: "%s | Plomberie Express",
  },
  description:
    "Plombier d'urgence en Île-de-France. Intervention sous 60 minutes, devis transparent en 60 secondes. Artisans certifiés RGE, garantie 2 ans.",
  keywords: [
    "plombier Paris",
    "plombier urgence",
    "devis plomberie",
    "plombier Île-de-France",
    "fuite eau",
    "débouchage canalisation",
    "dépannage chaudière",
  ],
  authors: [{ name: "Kaïro", url: "https://kairo.fr" }],
  creator: "Kaïro Agency",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    title: "Plomberie Express — Plombier 24/7 · Devis en 60s",
    description:
      "Coupez l'arrivée d'eau. On arrive. Plombier certifié sous 60 minutes en Île-de-France.",
    siteName: "Plomberie Express",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plomberie Express — Plombier 24/7",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2540",
  colorScheme: "light",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: "Plomberie Express",
  url: SITE_URL,
  telephone: "+33970000000",
  priceRange: "€€",
  image: `${SITE_URL}/og.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 rue des Artisans",
    addressLocality: "Paris",
    postalCode: "75011",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Paris" },
    { "@type": "City", name: "Boulogne-Billancourt" },
    { "@type": "City", name: "Versailles" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1280",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de plomberie",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recherche de fuite" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Débouchage canalisation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dépannage chaudière" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Installation sanitaire" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={cn(inter.variable, robotoSlab.variable)}>
      <body className="min-h-screen bg-chalk font-sans text-graphite">
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        <KairoBanner />
        <Navbar />
        <div id="main" className="flex min-h-[calc(100vh-200px)] flex-col">
          {children}
        </div>
        <Footer />
        <ChatbotMount />
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
