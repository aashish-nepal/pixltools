import type { Metadata } from "next";
import CollageMakerClient from "./CollageMakerClient";
import Link from "next/link";

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
        images: [{ url: "https://www.pixltools.com/photo-collage-maker/opengraph-image", width: 1200, height: 630, alt: "Photo Collage Maker – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Photo Collage Maker – Combine Images Online",
        description: "Create beautiful photo collages online for free. Combine up to 16 images into a custom grid.",
        images: ["https://www.pixltools.com/photo-collage-maker/opengraph-image"],
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
        { "@type": "ListItem", position: 2, name: "Photo Collage Maker", item: "https://www.pixltools.com/photo-collage-maker" },
    ],
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Photo Collage Maker",
    operatingSystem: "Web",
    applicationCategory: "MultimediaApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Create beautiful photo collages online for free. Combine up to 16 images into a custom grid with adjustable columns, gap spacing, and background color.",
    url: "https://www.pixltools.com/photo-collage-maker",
    publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
};

export default function PhotoCollageMakerPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [breadcrumbSchema, softwareSchema] }) }} />
            {/* sr-only h1 ensures Googlebot always has a primary heading in the static HTML,
                even before the client component hydrates. Invisible to sighted users. */}
            <h1 className="sr-only">Free Photo Collage Maker – Combine Images Online | PixlTools</h1>
            <CollageMakerClient />

            {/* Server-rendered content — fully visible to users and Googlebot */}
            <div className="bg-[#0b0816] pb-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">

                    {/* About section */}
                    <div className="bg-[#110e24] border border-violet-500/15 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-base font-semibold text-violet-300 mb-3">About the Photo Collage Maker</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            PixlTools&apos; free photo collage maker lets you combine up to 16 images into a beautiful grid layout — no account, no watermarks, no limits.
                            Choose your number of columns, adjust gap spacing, pick a background color, and download a high-quality PNG collage instantly.
                            Unlike desktop apps, everything runs in your browser: your photos never leave your device.
                        </p>
                    </div>

                    {/* How to use */}
                    <div className="bg-[#110e24] border border-violet-500/15 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-base font-semibold text-violet-300 mb-4">How to Make a Photo Collage Online</h2>
                        <ol className="space-y-3">
                            {[
                                { n: "1", title: "Upload your photos", text: "Click the upload area or drag and drop up to 16 images. JPG, PNG, and WEBP are all supported." },
                                { n: "2", title: "Arrange and customise", text: "Set the number of columns (1–5), adjust gap size between images, and choose a background color for the canvas." },
                                { n: "3", title: "Download your collage", text: "Click Download PNG to save your collage at full resolution. No watermarks added, no signup required." },
                            ].map(({ n, title, text }) => (
                                <li key={n} className="flex gap-4">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold flex items-center justify-center">{n}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-violet-200">{title}</p>
                                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Trust signals */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "🔒", title: "100% Private", desc: "Images are processed entirely in your browser. Nothing is uploaded to our servers." },
                            { icon: "🆓", title: "Always Free", desc: "No account, no watermarks, no limits. Combine up to 16 photos at zero cost." },
                            { icon: "⚡", title: "Instant Download", desc: "Your collage is generated and ready to download in seconds — high-quality PNG output." },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="bg-[#14102a] border border-violet-500/15 rounded-xl p-5 flex gap-4">
                                <span className="text-2xl flex-shrink-0">{icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-violet-200 mb-1">{title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Related tools */}
                    <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-4">
                        {[
                            { href: "/compress-image", label: "Compress Image" },
                            { href: "/resize-image", label: "Resize Image" },
                            { href: "/crop-image", label: "Crop Image" },
                            { href: "/image-border", label: "Add Border" },
                        ].map(({ href, label }) => (
                            <Link key={href} href={href} className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                                {label} →
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

