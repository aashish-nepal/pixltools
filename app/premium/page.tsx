import { Metadata } from "next";
import PremiumClient from "./PremiumClient";

export const metadata: Metadata = {
    title: "PixlTools Pro — Unlock Premium Image Processing",
    description: "Get unlimited batch processing, larger file sizes, priority processing, and API access with PixlTools Pro. Free plan always available.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/premium",
        languages: { "en": "https://www.pixltools.com/premium", "x-default": "https://www.pixltools.com/premium" },
    },
    openGraph: {
        title: "PixlTools Pro — Unlock Premium Image Processing",
        description: "Get unlimited batch processing, larger file sizes, priority processing, and API access with PixlTools Pro.",
        url: "https://www.pixltools.com/premium",
        type: "website",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "PixlTools Pro – Premium Image Processing" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "PixlTools Pro — Unlock Premium Image Processing",
        description: "Get unlimited batch processing, larger file sizes, priority processing, and API access with PixlTools Pro.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

export default function PremiumPage() {
    return <PremiumClient />;
}
