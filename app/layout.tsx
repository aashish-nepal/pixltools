import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmailCapture from "@/components/ui/EmailCapture";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixltools.com"),
  title: {
    default: "Free Online Image Tools – Compress, Resize & Convert Images",
    template: "%s | PixlTools",
  },
  description:
    "Free online image tools. Compress, resize, crop, convert, and optimize images instantly. No signup required. Fast, secure, and 100% free.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.pixltools.com",
    siteName: "PixlTools",
    title: "Free Online Image Tools – Compress, Resize & Convert Images",
    description: "30+ free image tools. Compress, resize, crop, convert images instantly. No signup required.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PixlTools – Free Online Image Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Tools – PixlTools",
    description: "30+ free image tools. Compress, resize, crop, convert images instantly.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://www.pixltools.com",
    languages: {
      en: "https://www.pixltools.com",
      "x-default": "https://www.pixltools.com",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${inter.className}`}>
      <head>
        {/* Preconnects for fonts and ads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />

        {/* Google AdSense */}
        {ADSENSE_ID && (
          <script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            async
          ></script>
        )}
      </head>
      <body>
        {/* Google Analytics 4 */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

        <Navbar />
        {children}
        <Footer />

        {/* Floating email capture widget */}
        <EmailCapture />
      </body>
    </html>
  );
}