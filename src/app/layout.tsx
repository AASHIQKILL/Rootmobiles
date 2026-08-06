import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";

import "./globals.css";

import { BUSINESS } from "@/lib/constants";
import { SITE_URL, localBusinessJsonLd } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} — Premium Smartphones, Repairs & Trade-ins in Coimbatore`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Root Mobiles, Gandhipuram Coimbatore — buy new & certified pre-owned smartphones, sell or trade in your device, expert same-day repairs, laptops, accessories, and gaming consoles. EMI available. 5000+ happy customers, 4.8★ rated.",
  keywords: [
    "Root Mobiles",
    "mobile store Coimbatore",
    "buy smartphone Coimbatore",
    "sell phone Coimbatore",
    "mobile repair Gandhipuram",
    "certified pre-owned phones",
    "phone trade-in Coimbatore",
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Premium Smartphones, Repairs & Trade-ins`,
    description: BUSINESS.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — Premium Smartphones, Repairs & Trade-ins`,
    description: BUSINESS.tagline,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="bg-noise overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <LoadingScreen />
        <SmoothScrollProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <WhatsappFab />
        </SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}
