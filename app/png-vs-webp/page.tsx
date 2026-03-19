import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "PNG vs WEBP: Which is Better for the Web? | PixlTools",
    description: "PNG vs WEBP comparison: file size, quality, transparency, browser support. Find out when to use PNG and when to switch to modern WEBP format.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/png-vs-webp",
        languages: { "en": "https://www.pixltools.com/png-vs-webp", "x-default": "https://www.pixltools.com/png-vs-webp" },
    },
    openGraph: {
        title: "PNG vs WEBP: Which is Better for the Web?",
        description: "PNG vs WEBP comparison: file size, quality, transparency, browser support. Find out when to use PNG and when to switch to WEBP.",
        url: "https://www.pixltools.com/png-vs-webp",
        type: "article",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/png-vs-webp/opengraph-image", width: 1200, height: 630, alt: "PNG vs WEBP comparison guide – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "PNG vs WEBP: Which is Better for the Web?",
        description: "PNG vs WEBP comparison: file size, quality, transparency, browser support. Find out when to switch to WEBP.",
        images: ["https://www.pixltools.com/png-vs-webp/opengraph-image"],
    },
};

const TABLE = [
    { feature: "Compression", png: "Lossless only", webp: "Lossy & lossless" },
    { feature: "File size vs JPEG", png: "Larger than JPEG", webp: "25–35% smaller than JPEG" },
    { feature: "Transparency", png: "✅ Full alpha channel", webp: "✅ Full alpha channel" },
    { feature: "Animation", png: "❌ (use APNG or WebP)", webp: "✅ Natively supported" },
    { feature: "Browser support", png: "✅ Universal (100%)", webp: "✅ All modern browsers" },
    { feature: "Lossless option", png: "✅ Always lossless", webp: "✅ Lossless mode available" },
    { feature: "IE support", png: "✅ Yes (IE6+)", webp: "❌ Not supported in IE" },
    { feature: "Google PageSpeed", png: "May flag PNG as too large", webp: "Recommended by Google" },
    { feature: "Color depth", png: "Up to 48-bit", webp: "Up to 24-bit" },
    { feature: "Metadata support", png: "Limited", webp: "EXIF/XMP/ICC supported" },
];

export default function PngVsWebpPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
                        Format Guide
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        PNG vs WEBP: <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Which is Better?</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        WEBP is the modern successor to PNG for web images. But when should you stick with PNG?
                        Here&apos;s the complete breakdown.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
                        <div className="text-2xl mb-2">🖼️</div>
                        <h2 className="font-bold text-violet-400 text-lg mb-3">Use PNG when…</h2>
                        <ul className="space-y-2 text-sm text-violet-300/60">
                            {["Publishing to all browsers including old IE", "Maximum color depth needed", "Working with design tools (Photoshop, Figma)", "Creating print-ready graphics", "Absolute lossless preservation required"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-400 flex-shrink-0" />{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6">
                        <div className="text-2xl mb-2">⚡</div>
                        <h2 className="font-bold text-teal-400 text-lg mb-3">Use WEBP when…</h2>
                        <ul className="space-y-2 text-sm text-violet-300/60">
                            {["Optimizing images for the web", "You want the smallest file size", "Google PageSpeed score matters", "You need transparency AND small size", "Building for modern browsers only"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400 flex-shrink-0" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

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
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">PNG</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-teal-400">WEBP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE.map(({ feature, png, webp }, i) => (
                                    <tr key={feature} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{feature}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{png}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{webp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">The Verdict: WEBP for Web, PNG for Everything Else</h2>
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            For websites, <strong className="text-violet-200">WEBP is almost always the better choice</strong>. It can be both lossy and lossless,
                            supports transparency just like PNG, and delivers 25–35% smaller files. Google explicitly recommends WEBP in its PageSpeed Insights tool.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">When PNG Still Wins</h2>
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            PNG remains the best choice when you need raw editing compatibility — design tools like Photoshop, Figma,
                            and Illustrator all work natively with PNG. For print workflows and archival purposes, PNG&apos;s lossless nature
                            and full color depth make it irreplaceable. Also use PNG if you need IE11 compatibility (WEBP is unsupported in IE).
                        </p>
                    </div>
                </div>

                <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Convert Between Formats — Free</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "PNG to WEBP", href: "/png-to-webp" },
                            { label: "WEBP to PNG", href: "/webp-to-png" },
                            { label: "Compress PNG", href: "/compress-png" },
                            { label: "Compress WEBP", href: "/compress-webp" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} className="flex items-center justify-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-300/70 hover:text-violet-200 text-sm font-semibold rounded-xl px-4 py-3 transition-all">
                                {label} <ArrowRight size={13} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-8">
                    <Link href="/jpg-vs-png" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">JPG vs PNG <ArrowRight size={13} /></Link>
                    <Link href="/how-to-compress-images-for-instagram" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for Instagram <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
