import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "How to Compress Images for Instagram (2025 Guide) | PixlTools",
    description: "Learn the exact image sizes, compression settings, and formats Instagram recommends for posts, stories, reels, and profiles. Keep quality high with small file sizes.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/how-to-compress-images-for-instagram",
        languages: {
            "en": "https://www.pixltools.com/how-to-compress-images-for-instagram",
            "x-default": "https://www.pixltools.com/how-to-compress-images-for-instagram",
        },
    },
    openGraph: {
        title: "How to Compress Images for Instagram (2025 Guide)",
        description: "Learn the exact image sizes, compression settings, and formats Instagram recommends for posts, stories, reels, and profiles.",
        url: "https://www.pixltools.com/how-to-compress-images-for-instagram",
        type: "article",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "How to compress images for Instagram – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Compress Images for Instagram (2025 Guide)",
        description: "Learn the exact image sizes, compression settings, and formats Instagram recommends for posts, stories, reels, and profiles.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

const SIZES = [
    { type: "Square Post", recommended: "1080 × 1080 px", ratio: "1:1", tip: "Compress to ~150–300 KB for fastest loading" },
    { type: "Landscape Post", recommended: "1080 × 566 px", ratio: "1.91:1", tip: "Avoid wider than 1.91:1 — Instagram crops aggressively" },
    { type: "Portrait Post", recommended: "1080 × 1350 px", ratio: "4:5", tip: "Best portrait ratio for maximum feed real estate" },
    { type: "Story / Reel", recommended: "1080 × 1920 px", ratio: "9:16", tip: "Full-screen vertical format — fill entire canvas" },
    { type: "Profile Photo", recommended: "320 × 320 px", ratio: "1:1", tip: "Displays circular — keep subject centered" },
    { type: "Carousel Slides", recommended: "1080 × 1080 px", ratio: "1:1", tip: "Keep all slides the same ratio to avoid cropping" },
];

const STEPS = [
    { n: 1, title: "Start with high resolution", desc: "Export or photograph at full resolution first. Maximum quality in = maximum quality out after compression." },
    { n: 2, title: "Resize to correct Instagram dimensions", desc: "Use our Resize Image tool to set the exact pixel dimensions (e.g. 1080×1080 for square posts). This prevents Instagram from auto-resizing and degrading quality." },
    { n: 3, title: "Compress to reduce file size", desc: "Use our Image Compressor with quality set to 80–85. This reduces the file to 150–400KB — fast upload and no visible quality loss." },
    { n: 4, title: "Convert to JPEG format", desc: "Instagram accepts JPEG best. If you have a PNG, convert it to JPG first. Our PNG to JPG converter does this in one click." },
    { n: 5, title: "Avoid double-compression", desc: "Instagram re-compresses your uploads. Uploading an already-compressed image means two rounds of lossy compression. Start from the original file each time." },
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Compress Images for Instagram (2026 Guide)",
    description: "Learn the exact image sizes, compression settings, and formats Instagram recommends for posts, stories, reels, and profiles.",
    url: "https://www.pixltools.com/how-to-compress-images-for-instagram",
    datePublished: "2026-03-18",
    dateModified: "2026-03-18",
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
    publisher: {
        "@type": "Organization",
        name: "PixlTools",
        url: "https://www.pixltools.com",
        logo: { "@type": "ImageObject", url: "https://www.pixltools.com/logo.jpg", width: 512, height: 512 },
    },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
            { "@type": "ListItem", position: 2, name: "Compress for Instagram", item: "https://www.pixltools.com/how-to-compress-images-for-instagram" },
        ],
    },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress Images for Instagram",
    description: "Learn the exact image sizes and compression settings to keep your Instagram photos looking sharp.",
    step: STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.n,
        name: s.title,
        text: s.desc,
    })),
};

export default function InstagramCompressionPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-fuchsia-300 mb-6">
                        Platform Guide · Instagram
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        How to Compress Images{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">for Instagram</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Instagram re-compresses your images before displaying them. Learn the exact dimensions and compression settings
                        to keep your photos looking sharp in the feed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link href="/compress-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Compress Image Now <ArrowRight size={14} />
                        </Link>
                        <Link href="/resize-image" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200/70 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            Resize to Instagram Size <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Why it matters */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <div className="text-2xl mb-2">⚠️</div>
                    <h2 className="font-bold text-amber-400 text-lg mb-2">Why Instagram Quality Degrades</h2>
                    <p className="text-violet-300/60 text-sm leading-relaxed">
                        Instagram automatically re-compresses images using JPEG quality settings around <strong className="text-amber-300">70–85%</strong>.
                        If you upload an oversized image (e.g. a 6MB camera JPG), Instagram does two things that hurt quality:
                        it <strong className="text-amber-300">downscales</strong> the image and then <strong className="text-amber-300">re-compresses</strong> it.
                        Starting with the correct dimensions and pre-compressing prevents both of these issues.
                    </p>
                </div>

                {/* Recommended sizes table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Recommended Instagram Image Sizes (2025)</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400/50">Post Type</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-fuchsia-400">Dimensions</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400/50">Ratio</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400/50">Pro Tip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SIZES.map(({ type, recommended, ratio, tip }, i) => (
                                    <tr key={type} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{type}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-fuchsia-400">{recommended}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{ratio}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{tip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Step by step */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Step-by-Step: Compress Images for Instagram</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="space-y-4">
                        {STEPS.map(({ n, title, desc }) => (
                            <div key={n} className="flex gap-4 bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                                <span className="w-9 h-9 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                                    {n}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Best settings */}
                <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Recommended Settings for Instagram</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Format", value: "JPEG (JPG)", note: "Best Instagram compatibility" },
                            { label: "Quality", value: "80–85%", note: "Imperceptible quality loss" },
                            { label: "Color profile", value: "sRGB", note: "Other profiles may shift colors" },
                        ].map(({ label, value, note }) => (
                            <div key={label} className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
                                <p className="text-xs text-violet-400/50 font-semibold uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-fuchsia-400 font-bold text-lg">{value}</p>
                                <p className="text-xs text-gray-400 mt-1">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools CTA */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Free Tools to Optimize Your Instagram Images</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Resize Image", href: "/resize-image" },
                            { label: "PNG to JPG", href: "/png-to-jpg" },
                            { label: "Thumbnail Generator", href: "/image-thumbnail" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} className="flex items-center justify-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-300/70 hover:text-violet-200 text-sm font-semibold rounded-xl px-4 py-3 transition-all">
                                {label} <ArrowRight size={13} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-8">
                    <Link href="/jpg-vs-png" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">JPG vs PNG <ArrowRight size={13} /></Link>
                    <Link href="/png-vs-webp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">PNG vs WEBP <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
