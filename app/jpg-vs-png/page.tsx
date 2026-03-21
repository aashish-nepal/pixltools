import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "JPG vs PNG: Which Format Should You Use? | PixlTools",
    description: "Complete comparison of JPG vs PNG image formats. Learn when to use JPEG vs PNG for photos, graphics, web, and print. Side-by-side feature table with examples.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/jpg-vs-png",
        languages: { "en": "https://www.pixltools.com/jpg-vs-png", "x-default": "https://www.pixltools.com/jpg-vs-png" },
    },
    openGraph: {
        title: "JPG vs PNG: Which Format Should You Use?",
        description: "Complete comparison of JPG vs PNG image formats. Learn when to use JPEG vs PNG for photos, graphics, web, and print.",
        url: "https://www.pixltools.com/jpg-vs-png",
        type: "article",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/jpg-vs-png/opengraph-image", width: 1200, height: 630, alt: "JPG vs PNG comparison guide – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "JPG vs PNG: Which Format Should You Use?",
        description: "Complete comparison of JPG vs PNG image formats. Learn when to use JPEG vs PNG for photos, graphics, web, and print.",
        images: ["https://www.pixltools.com/jpg-vs-png/opengraph-image"],
    },
};

const TABLE = [
    { feature: "Compression", jpg: "Lossy (smaller files)", png: "Lossless (larger files)" },
    { feature: "Transparency", jpg: "❌ Not supported", png: "✅ Full alpha channel" },
    { feature: "Best for", jpg: "Photographs & complex colors", png: "Logos, screenshots, graphics" },
    { feature: "File size", jpg: "Very small (40–80% smaller)", png: "Large (especially for photos)" },
    { feature: "Animation", jpg: "❌ Not supported", png: "❌ Not supported (use GIF/WEBP)" },
    { feature: "Color depth", jpg: "Up to 24-bit", png: "Up to 48-bit (true color)" },
    { feature: "Progressive loading", jpg: "✅ Progressive JPEG", png: "✅ Interlaced PNG" },
    { feature: "Browser support", jpg: "✅ Universal", png: "✅ Universal" },
    { feature: "Print quality", jpg: "Good", png: "Excellent (lossless)" },
    { feature: "Multiple saves", jpg: "Degrades each re-save", png: "No degradation" },
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "JPG vs PNG: Which Format Should You Use?",
    description: "Complete comparison of JPG vs PNG image formats. Learn when to use JPEG vs PNG for photos, graphics, web, and print. Side-by-side feature table with examples.",
    url: "https://www.pixltools.com/jpg-vs-png",
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
            { "@type": "ListItem", position: 2, name: "JPG vs PNG", item: "https://www.pixltools.com/jpg-vs-png" },
        ],
    },
};

export default function JpgVsPngPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
                        Format Guide
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        JPG vs PNG: <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Complete Comparison</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Choosing between JPEG and PNG is one of the most common decisions in web design and photography.
                        Here&apos;s everything you need to know to pick the right format.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Quick answer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                        <div className="text-2xl mb-2">📸</div>
                        <h2 className="font-bold text-blue-400 text-lg mb-3">Use JPG when…</h2>
                        <ul className="space-y-2 text-sm text-violet-300/60">
                            {["You're sharing photographs", "File size matters (email, web)", "No transparency needed", "Colors are complex & gradients exist", "Uploading to social media"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
                        <div className="text-2xl mb-2">🖼️</div>
                        <h2 className="font-bold text-violet-400 text-lg mb-3">Use PNG when…</h2>
                        <ul className="space-y-2 text-sm text-violet-300/60">
                            {["You need transparent backgrounds", "Saving logos or graphics", "Image will be re-edited later", "Text or sharp edges are present", "Lossless quality is required"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-violet-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Comparison table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Side-by-Side Comparison</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400/50">Feature</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-blue-400">JPG / JPEG</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">PNG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE.map(({ feature, jpg, png }, i) => (
                                    <tr key={feature} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{feature}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{jpg}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{png}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detailed explanation */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">What is JPG/JPEG?</h2>
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            JPEG (Joint Photographic Experts Group) is the most widely used image format for photographs and complex imagery.
                            It uses <strong className="text-violet-200">lossy compression</strong>, meaning some image data is discarded during compression.
                            This results in dramatically smaller file sizes — often 5–10x smaller than PNG for the same photo.
                            JPEG works by reducing detail in areas the human eye is least sensitive to, making the quality loss often imperceptible.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">What is PNG?</h2>
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            PNG (Portable Network Graphics) uses <strong className="text-violet-200">lossless compression</strong>, preserving every single pixel.
                            This makes it ideal for graphics, logos, screenshots, and images with transparent backgrounds.
                            PNG files are significantly larger than JPEG for photographs, but the quality is perfect — no artifacts, no compression damage.
                            PNG also supports partial transparency (alpha channel), which JPEG cannot.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">The Modern Alternative: WEBP</h2>
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            In most cases, <strong className="text-violet-200">WEBP</strong> is now the best choice for web images. It offers 25–35% smaller file sizes than JPEG
                            while supporting transparency like PNG. All modern browsers support WEBP. Convert your images using our free tool below.
                        </p>
                    </div>
                </div>

                {/* CTA tools */}
                <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Convert Between Formats — Free</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "JPG to PNG", href: "/jpg-to-png" },
                            { label: "PNG to JPG", href: "/png-to-jpg" },
                            { label: "JPG to WEBP", href: "/jpg-to-webp" },
                            { label: "Compress JPG", href: "/compress-jpg" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} className="flex items-center justify-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-300/70 hover:text-violet-200 text-sm font-semibold rounded-xl px-4 py-3 transition-all">
                                {label} <ArrowRight size={13} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Related links */}
                <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-8">
                    <Link href="/png-vs-webp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">PNG vs WEBP <ArrowRight size={13} /></Link>
                    <Link href="/how-to-compress-images-for-instagram" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for Instagram <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
