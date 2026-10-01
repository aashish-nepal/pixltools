import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

export const metadata: Metadata = {
    title: "Convert HEIC to JPG on iPhone Free – No App Needed | PixlTools",
    description: "Convert iPhone HEIC photos to JPG instantly in any browser. No app download, no account, no watermarks. Works on iPhone, Mac, Windows & Android.",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 } },
    alternates: {
        canonical: "https://www.pixltools.com/heic-to-jpg-iphone",
        languages: { "en": "https://www.pixltools.com/heic-to-jpg-iphone", "x-default": "https://www.pixltools.com/heic-to-jpg-iphone" },
    },
    openGraph: {
        title: "HEIC to JPG on iPhone – Free, No App, Instant",
        description: "Convert iPhone HEIC photos to JPG in one click. No app download needed. Works on any browser on iPhone, Mac & Windows.",
        url: "https://www.pixltools.com/heic-to-jpg-iphone",
        type: "article", locale: "en_US", siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "HEIC to JPG on iPhone – PixlTools" }],
    },
    twitter: { card: "summary_large_image", title: "HEIC to JPG on iPhone – Free, No App", description: "Convert iPhone HEIC photos to JPG instantly. No app, no account, works in Safari.", images: ["https://www.pixltools.com/opengraph-image"] },
};

const METHODS = [
    {
        title: "Method 1 — Use PixlTools (Any Device, No App)",
        badge: "Fastest",
        badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
        steps: [
            "Open Safari or Chrome on your iPhone and go to pixltools.com/heic-to-jpg",
            "Tap 'Upload' and select your HEIC photo from your Camera Roll",
            "Tap 'Convert' — your JPG is ready in seconds",
            "Tap 'Download' to save the JPG to your Photos app",
        ],
        note: "This is the fastest method. No app download, no account, no HEIC files stored on any server.",
    },
    {
        title: "Method 2 — Change iPhone Camera Setting to JPEG",
        badge: "Permanent Fix",
        badgeColor: "bg-violet-500/10 border-violet-500/20 text-violet-300",
        steps: [
            "Open Settings on your iPhone",
            "Scroll down and tap Camera",
            "Tap Formats",
            "Select 'Most Compatible' instead of 'High Efficiency'",
        ],
        note: "After this change, your iPhone saves all new photos as JPEG instead of HEIC. This is the best long-term fix if you frequently need JPG files.",
    },
    {
        title: "Method 3 — Share from iPhone (Auto-Converts on PC)",
        badge: "Quick Share",
        badgeColor: "bg-sky-500/10 border-sky-500/20 text-sky-300",
        steps: [
            "Open the Photos app on your iPhone",
            "Select the HEIC photo you want to convert",
            "Tap Share → choose AirDrop, email, or Messages",
            "iPhone automatically converts to JPG when sharing to non-Apple devices",
        ],
        note: "iPhone automatically converts HEIC to JPG when sharing outside the Apple ecosystem. No conversion needed if you just need to send the photo.",
    },
];

const FAQS = [
    { q: "What is HEIC and why does iPhone use it?", a: "HEIC (High Efficiency Image Container) is Apple's photo format, introduced with iOS 11 in 2017. It uses the HEVC (H.265) codec to achieve file sizes roughly 50% smaller than JPEG at equivalent visual quality. A 3MB JPG becomes approximately 1.5MB as HEIC — saving significant storage on your iPhone. Apple uses HEIC by default because it doubles your photo storage capacity without any visible quality loss." },
    { q: "Why can't I open HEIC photos on my Windows PC or Android?", a: "HEIC is an Apple-specific format that Windows and Android do not natively support. Windows 10 and 11 can open HEIC files if you install the free HEVC Video Extensions from the Microsoft Store. Android has no built-in HEIC support. The easiest solution is to convert HEIC to JPG using PixlTools before sharing with non-Apple users." },
    { q: "Does converting HEIC to JPG reduce quality?", a: "The conversion itself is lossless in terms of visual quality when done at quality 90-100%. However, JPEG is a lossy format — once converted, re-saving the JPG will reduce quality. For best results, convert once at high quality and avoid re-saving the output JPG." },
    { q: "How do I stop my iPhone from taking HEIC photos?", a: "Go to Settings → Camera → Formats → select 'Most Compatible'. This makes your iPhone shoot in JPEG instead of HEIC. Note: this uses more storage per photo (approximately 2x) but ensures universal compatibility with all devices and platforms." },
    { q: "Can I convert HEIC to JPG without a computer?", a: "Yes — PixlTools works directly in your iPhone's Safari or Chrome browser. No computer needed. Simply open the website, upload your HEIC photo, and download the converted JPG back to your Camera Roll." },
    { q: "What is the difference between HEIC and HEIF?", a: "HEIC and HEIF are closely related. HEIF (High Efficiency Image File Format) is the container format standard. HEIC is the specific variant Apple uses for photos taken with iPhone cameras. They are functionally identical for most purposes — our converter handles both." },
];

const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "How to Convert HEIC to JPG on iPhone (2026 Guide — No App Needed)",
    description: "Three methods to convert iPhone HEIC photos to JPG — using a free online tool, changing camera settings, or using iPhone share conversion.",
    url: "https://www.pixltools.com/heic-to-jpg-iphone",
    datePublished: "2026-10-01", dateModified: "2026-10-01", inLanguage: "en-US",
    author: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
    publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com", logo: { "@type": "ImageObject", url: "https://www.pixltools.com/logo.jpg", width: 512, height: 512 } },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
        { "@type": "ListItem", position: 2, name: "HEIC to JPG on iPhone", item: "https://www.pixltools.com/heic-to-jpg-iphone" },
    ]},
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function HeicToJpgIphonePage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-blue-300 mb-6">
                        <Smartphone size={12} /> iPhone Guide · HEIC Conversion
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        Convert HEIC to JPG{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">on iPhone</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        iPhone photos are saved as HEIC by default — a format that Windows, Android,
                        and most websites cannot open. Convert to JPG instantly, no app required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link href="/heic-to-jpg" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Convert HEIC to JPG Now <ArrowRight size={14} />
                        </Link>
                        <Link href="/jpg-to-png" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200/70 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            JPG to PNG <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Why HEIC */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: "📦", label: "HEIC File Size", value: "~1.5 MB", note: "Typical iPhone HEIC photo" },
                        { icon: "📸", label: "Same Photo as JPG", value: "~3 MB", note: "HEIC is 50% smaller at equal quality" },
                        { icon: "⚡", label: "Conversion Time", value: "< 5 sec", note: "Using PixlTools online tool" },
                    ].map(({ icon, label, value, note }) => (
                        <div key={label} className="bg-[#16122a] border border-violet-500/15 rounded-xl p-6 text-center">
                            <div className="text-3xl mb-2">{icon}</div>
                            <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                            <p className="text-blue-400 font-bold text-2xl mb-1">{value}</p>
                            <p className="text-xs text-gray-400">{note}</p>
                        </div>
                    ))}
                </div>

                {/* 3 Methods */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">3 Ways to Convert HEIC to JPG on iPhone</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="space-y-6">
                        {METHODS.map(({ title, badge, badgeColor, steps, note }) => (
                            <div key={title} className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="font-bold text-white text-lg">{title}</h3>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border flex-shrink-0 ${badgeColor}`}>{badge}</span>
                                </div>
                                <ol className="space-y-2 mb-4">
                                    {steps.map((step, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-400">
                                            <span className="w-5 h-5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                                <p className="text-xs text-violet-300/60 bg-violet-500/5 border border-violet-500/10 rounded-lg px-4 py-2">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compatibility table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">HEIC Compatibility by Platform</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Platform</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">HEIC Support</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">What to Do</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { platform: "iPhone / iPad (iOS 11+)", support: "✅ Native", action: "No conversion needed" },
                                    { platform: "Mac (macOS High Sierra+)", support: "✅ Native", action: "No conversion needed" },
                                    { platform: "Windows 10 / 11", support: "⚠️ Partial", action: "Install HEVC Extension from Microsoft Store, or convert to JPG" },
                                    { platform: "Windows 7 / 8", support: "❌ None", action: "Convert to JPG before opening" },
                                    { platform: "Android", support: "❌ None", action: "Convert to JPG before sharing" },
                                    { platform: "Gmail / Outlook Web", support: "⚠️ Partial", action: "Displays inline on some browsers — convert to JPG for reliability" },
                                    { platform: "WordPress / CMSs", support: "❌ None", action: "Convert to JPG or WebP before uploading" },
                                    { platform: "WhatsApp / Telegram", support: "✅ Auto-convert", action: "Apps convert automatically when sharing from iPhone" },
                                ].map(({ platform, support, action }, i) => (
                                    <tr key={platform} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{platform}</td>
                                        <td className="px-5 py-3.5 text-sm">{support}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tools */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Free Conversion Tools</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "HEIC to JPG", href: "/heic-to-jpg" },
                            { label: "JPG to PNG", href: "/jpg-to-png" },
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Resize Image", href: "/resize-image" },
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

                <div className="flex flex-wrap gap-3 text-sm border-t border-violet-500/10 pt-8">
                    <Link href="/heic-to-jpg" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">HEIC to JPG Tool <ArrowRight size={13} /></Link>
                    <Link href="/jpg-to-png" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">JPG to PNG <ArrowRight size={13} /></Link>
                    <Link href="/compress-image-for-whatsapp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for WhatsApp <ArrowRight size={13} /></Link>
                    <Link href="/resize-image-for-instagram" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Resize for Instagram <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
