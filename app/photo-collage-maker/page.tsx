import type { Metadata } from "next";
import CollageMakerClient from "./CollageMakerClient";

export const metadata: Metadata = {
    title: "Free Photo Collage Maker – Combine Images Online | PixlTools",
    description: "Create beautiful photo collages online for free. Combine up to 16 images into a custom grid with adjustable columns, gap spacing, and background color. No signup needed.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/photo-collage-maker",
        languages: {
            "en": "https://www.pixltools.com/photo-collage-maker",
            "x-default": "https://www.pixltools.com/photo-collage-maker",
        },
    },
    openGraph: {
        title: "Free Photo Collage Maker – Combine Images Online",
        description: "Create beautiful photo collages online for free. Combine up to 16 images into a custom grid. No signup needed.",
        url: "https://www.pixltools.com/photo-collage-maker",
        type: "website",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "Photo Collage Maker – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Photo Collage Maker – Combine Images Online",
        description: "Create beautiful photo collages online for free. Combine up to 16 images into a custom grid.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

export default function PhotoCollageMakerPage() {
    return <CollageMakerClient />;
}
