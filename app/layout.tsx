import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://pixltools.com"),
  title: {
    default: "Free Online Image Tools – Compress, Resize & Convert Images",
    template: "%s | PixlTools",
  },
  description:
    "Free online image tools. Compress, resize, crop, convert, and optimize images instantly. No signup required. Fast, secure, and 100% free.",
  keywords: ["image compressor", "image converter", "resize image", "compress image", "jpg to png", "webp converter", "free image tools"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pixltools.com",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            async
            strategy="beforeInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
