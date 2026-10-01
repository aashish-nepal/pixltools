import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Compress Image for WhatsApp Free – Send Photos Without Quality Loss | PixlTools",
    description: "Compress images for WhatsApp in seconds. Reduce photo size below 16MB for sending, keep quality high. Free, no signup, works on iPhone & Android.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/compress-image-for-whatsapp",
        languages: {
            "en": "https://www.pixltools.com/compress-image-for-whatsapp",
            "x-default": "https://www.pixltools.com/compress-image-for-whatsapp",
        },
    },
    openGraph: {
        title: "Compress Image for WhatsApp – Free, Fast & No Quality Loss",
        description: "Reduce photo size for WhatsApp in seconds. Keep images under 16MB limit without visible quality loss. No signup required.",
        url: "https://www.pixltools.com/compress-image-for-whatsapp",
        type: "article",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "Compress Image for WhatsApp – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Compress Image for WhatsApp – Free, No Signup",
        description: "Compress photos for WhatsApp instantly. Below 16MB, no visible quality loss, works on any device.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

const WHATSAPP_LIMITS = [
    { type: "Photos (JPG/PNG)", limit: "16 MB", recommended: "< 1 MB", quality: "80–85%", note: "WhatsApp auto-compresses above 1MB — pre-compress to avoid double quality loss" },
    { type: "Documents (original quality)", limit: "2 GB", recommended: "Any size", quality: "100%", note: "Send as Document to bypass WhatsApp photo compression" },
    { type: "Status / Stories", limit: "16 MB", recommended: "< 500 KB", quality: "80%", note: "Status images are re-compressed aggressively — start small" },
    { type: "Profile Photo", limit: "5 MB", recommended: "< 200 KB", quality: "85%", note: "Displayed at 192×192px — no need for large files" },
];

const STEPS = [
    { n: 1, title: "Upload your photo", desc: "Go to the PixlTools Image Compressor and upload your JPG, PNG, or WebP photo. Files up to 10MB are supported." },
    { n: 2, title: "Set quality to 80", desc: "Move the quality slider to 80. This gives you the best balance — photos look identical to the original but are 60–70% smaller." },
    { n: 3, title: "Download the compressed photo", desc: "Click Download. Your photo is now ready to send on WhatsApp with no visible quality loss." },
    { n: 4, title: "Send on WhatsApp", desc: "Share via WhatsApp as usual. Because the file is already optimised, WhatsApp will not degrade it further during sending." },
];

const FAQS = [
    { q: "Why does WhatsApp reduce photo quality?", a: "WhatsApp automatically compresses images to reduce data usage and transmission time. When you send a large photo, WhatsApp re-compresses it at around quality 70–75 before transmitting — causing blurry or pixelated images. Pre-compressing with the right settings prevents this double-compression." },
    { q: "What is the maximum photo size for WhatsApp?", a: "WhatsApp allows images up to 16MB when sent as a photo. However, WhatsApp starts auto-compressing images above approximately 1MB. For best quality, compress your photo to under 1MB before sending." },
    { q: "How do I send original quality photos on WhatsApp?", a: "Tap the attachment icon, choose Document instead of Gallery, and select your photo file. WhatsApp sends documents without any compression, preserving full quality. This works on both iPhone and Android." },
    { q: "What is the best WhatsApp image size in pixels?", a: "WhatsApp displays images at a maximum of 1600px wide. Resize to 1080–1280px wide before sending — this covers all screen sizes without wasting file size on pixels that will not be displayed." },
    { q: "Why do WhatsApp photos look blurry?", a: "Blurry WhatsApp photos are caused by double-compression: your phone first saves the photo with some compression, then WhatsApp compresses it again for transmission. The fix is to pre-compress the image yourself at quality 80 before sending — this satisfies WhatsApp size expectations and stops it from compressing further." },
    { q: "Does this tool work on iPhone and Android?", a: "Yes — PixlTools is a web-based tool that works in any browser on iPhone, Android, Windows, or Mac. No app download required." },
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Compress Images for WhatsApp (2026 Guide)",
    description: "Compress photos for WhatsApp without losing quality. Keep files under 16MB, prevent double-compression, and send sharp images on any device.",
    url: "https://www.pixltools.com/compress-image-for-whatsapp",
    datePublished: "2026-10-01",
    dateModified: "2026-10-01",
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
            { "@type": "ListItem", position: 2, name: "Compress Image for WhatsApp", item: "https://www.pixltools.com/compress-image-for-whatsapp" },
        ],
    },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress an Image for WhatsApp",
    description: "Compress photos for WhatsApp in 4 steps to prevent quality loss during sending.",
    totalTime: "PT1M",
    step: STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.n,
        name: s.title,
        text: s.desc,
    })),
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

export default function CompressForWhatsAppPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-emerald-300 mb-6">
                        Platform Guide · WhatsApp
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        Compress Images{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-violet-400 bg-clip-text text-transparent">for WhatsApp</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        WhatsApp re-compresses photos when you send them — causing blurry, degraded images.
                        Pre-compress your photos first to prevent double quality loss.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link href="/compress-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Compress Image Now <ArrowRight size={14} />
                        </Link>
                        <Link href="/reduce-image-file-size" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200/70 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            Reduce File Size <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Warning callout */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
                    <AlertCircle size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="font-bold text-amber-400 text-lg mb-2">Why WhatsApp Makes Photos Blurry</h2>
                        <p className="text-violet-300/80 text-sm leading-relaxed">
                            When you send a large photo on WhatsApp, it compresses it <strong className="text-amber-300">automatically</strong> at around quality 70–75 before transmitting.
                            If your original photo was already compressed (as most camera photos are), this is a <strong className="text-amber-300">second round of lossy compression</strong> — and each round makes the image noticeably worse.
                            The fix: compress it yourself first at quality 80, so WhatsApp sees a small file and skips its own compression step.
                        </p>
                    </div>
                </div>

                {/* WhatsApp limits table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">WhatsApp Image Size Limits (2026)</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Type</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-400">Max Limit</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Recommended Size</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Quality</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Tip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {WHATSAPP_LIMITS.map(({ type, limit, recommended, quality, note }, i) => (
                                    <tr key={type} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{type}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-emerald-400">{limit}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-fuchsia-400">{recommended}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{quality}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Step by step */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">How to Compress Images for WhatsApp (4 Steps)</h2>
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
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Recommended Settings for WhatsApp Photos</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Format", value: "JPEG", note: "Best WhatsApp compatibility" },
                            { label: "Quality", value: "80%", note: "No visible quality loss" },
                            { label: "Max Width", value: "1280 px", note: "Sufficient for all screen sizes" },
                            { label: "Target Size", value: "< 1 MB", note: "Prevents WhatsApp re-compression" },
                        ].map(({ label, value, note }) => (
                            <div key={label} className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
                                <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-emerald-400 font-bold text-lg">{value}</p>
                                <p className="text-xs text-gray-400 mt-1">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro tip */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex gap-4">
                    <CheckCircle size={22} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="font-bold text-emerald-300 text-lg mb-2">Pro Tip: Send as Document for Zero Compression</h2>
                        <p className="text-violet-300/80 text-sm leading-relaxed">
                            To send a photo with <strong className="text-emerald-300">absolutely zero WhatsApp compression</strong>, tap the attachment icon → choose <strong className="text-emerald-300">Document</strong> → select your image file.
                            WhatsApp never compresses documents — the recipient gets the exact file you sent. This works on both iPhone and Android and is the best way to share high-resolution photos with photographers or clients.
                        </p>
                    </div>
                </div>

                {/* Tool CTAs */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Free Tools to Compress WhatsApp Photos</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Compress JPG", href: "/compress-jpg" },
                            { label: "Resize Image", href: "/resize-image" },
                            { label: "Reduce File Size", href: "/reduce-image-file-size" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} className="flex items-center justify-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-300/70 hover:text-violet-200 text-sm font-semibold rounded-xl px-4 py-3 transition-all">
                                {label} <ArrowRight size={13} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Frequently Asked Questions</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="space-y-4">
                        {FAQS.map(({ q, a }) => (
                            <div key={q} className="bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                                <h3 className="font-semibold text-violet-200 mb-2">{q}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related links */}
                <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-8">
                    <Link href="/compress-image-to-100kb" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress to 100KB <ArrowRight size={13} /></Link>
                    <Link href="/compress-image-for-email" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for Email <ArrowRight size={13} /></Link>
                    <Link href="/resize-image-for-instagram" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Resize for Instagram <ArrowRight size={13} /></Link>
                    <Link href="/jpg-vs-png" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">JPG vs PNG <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
