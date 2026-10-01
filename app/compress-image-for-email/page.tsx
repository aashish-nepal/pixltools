import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Compress Image for Email Free – Reduce Photo Size Before Sending | PixlTools",
    description: "Compress images for email in seconds. Keep photos under 10MB attachment limits without losing quality. Free, instant, no signup. Works on any device.",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 } },
    alternates: {
        canonical: "https://www.pixltools.com/compress-image-for-email",
        languages: { "en": "https://www.pixltools.com/compress-image-for-email", "x-default": "https://www.pixltools.com/compress-image-for-email" },
    },
    openGraph: {
        title: "Compress Image for Email – Free, Fast & No Quality Loss",
        description: "Reduce image file size for email attachments. Keep photos under 10MB limits, load fast on mobile. No signup, instant download.",
        url: "https://www.pixltools.com/compress-image-for-email",
        type: "article", locale: "en_US", siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "Compress Image for Email – PixlTools" }],
    },
    twitter: { card: "summary_large_image", title: "Compress Image for Email – Free", description: "Reduce photo size for email in seconds. Under 10MB limits, no quality loss.", images: ["https://www.pixltools.com/opengraph-image"] },
};

const EMAIL_LIMITS = [
    { client: "Gmail", limit: "25 MB total", recommended: "< 3 MB/photo", note: "Files over 25MB are auto-sent as Google Drive links" },
    { client: "Outlook / Office 365", limit: "20 MB total", recommended: "< 2 MB/photo", note: "Many corporate IT policies set a lower 10MB limit" },
    { client: "Yahoo Mail", limit: "25 MB total", recommended: "< 3 MB/photo", note: "Inline images and attachments share the same 25MB pool" },
    { client: "iCloud Mail", limit: "20 MB total", recommended: "< 2 MB/photo", note: "Mail Drop activates for files over 20MB (stores up to 1 month)" },
    { client: "ProtonMail", limit: "25 MB total", recommended: "< 3 MB/photo", note: "End-to-end encrypted — large files slow delivery significantly" },
    { client: "Corporate / Business", limit: "10 MB typical", recommended: "< 1 MB/photo", note: "IT-enforced limits vary — 5–10MB is the most common corporate limit" },
];

const STEPS = [
    { n: 1, title: "Upload your photo", desc: "Click 'Compress Image Now' and upload your JPG, PNG, or WebP photo. Files up to 10MB are accepted." },
    { n: 2, title: "Set quality to 75–80", desc: "A quality of 75–80% reduces a 3–5MB photo to around 300–600KB — well within all email limits — with no visible quality difference on screen." },
    { n: 3, title: "Download the compressed file", desc: "Click Download. The file is ready to attach to any email client on any device." },
    { n: 4, title: "Attach and send", desc: "Attach your compressed photo to Gmail, Outlook, Apple Mail, or any other email client and send normally." },
];

const FAQS = [
    { q: "What is the maximum image size I can send by email?", a: "Most email providers allow total attachments of 20–25MB. Gmail allows 25MB, Outlook 20MB, and Yahoo 25MB. Corporate email servers often enforce lower limits of 5–10MB. For best deliverability, keep each photo under 2–3MB and total attachments under 10MB." },
    { q: "Why should I compress images before emailing?", a: "Large image files slow email delivery, fill recipient inboxes, are often blocked by corporate email filters, and take a long time to download on mobile data. Compressing to under 1MB per photo ensures fast, reliable delivery to all recipients." },
    { q: "Will email compression reduce photo quality?", a: "At quality 75–80%, compression is imperceptible on screens. The compressed photo looks identical to the original when viewed on a computer, phone, or tablet. Only at very high zoom levels (400%+) can minor differences be seen." },
    { q: "How do I send high-resolution photos by email without quality loss?", a: "Use a cloud storage link instead of a direct attachment. Upload the original photo to Google Drive, Dropbox, or iCloud and share the link in your email. This bypasses all size limits and the recipient gets the full-resolution file. Alternatively, send as a ZIP file — this does not compress images but may bypass some email size checks." },
    { q: "What is the best image format for email attachments?", a: "JPEG (JPG) is the best format for photos in email — it achieves the smallest file sizes for photographs. PNG is better for logos and graphics with transparency but creates larger files. Avoid WebP for email — some email clients (particularly older Outlook versions) cannot display WebP images inline." },
    { q: "How do I compress multiple images for email at once?", a: "Compress each image individually using our tool (takes under 30 seconds per image). For large batches, zip the compressed images into a single archive — this makes one attachment instead of many and may further reduce total size by 5–10%." },
];

const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "How to Compress Images for Email (2026 Guide)",
    description: "Compress photos for email without losing quality. Keep attachments under size limits for Gmail, Outlook, and all major email providers.",
    url: "https://www.pixltools.com/compress-image-for-email",
    datePublished: "2026-10-01", dateModified: "2026-10-01", inLanguage: "en-US",
    author: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
    publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com", logo: { "@type": "ImageObject", url: "https://www.pixltools.com/logo.jpg", width: 512, height: 512 } },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
        { "@type": "ListItem", position: 2, name: "Compress Image for Email", item: "https://www.pixltools.com/compress-image-for-email" },
    ]},
};

const howToSchema = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: "How to Compress an Image for Email",
    description: "Reduce photo file size for email attachments in 4 steps using PixlTools.",
    totalTime: "PT1M",
    step: STEPS.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.desc })),
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function CompressForEmailPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-sky-300 mb-6">
                        <Mail size={12} /> Platform Guide · Email
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        Compress Images{" "}
                        <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">for Email</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Reduce photo size before attaching to Gmail, Outlook, or Apple Mail.
                        Stay under attachment limits and ensure fast delivery to every recipient.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link href="/compress-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Compress Image Now <ArrowRight size={14} />
                        </Link>
                        <Link href="/compress-jpg" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200/70 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            Compress JPG <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Email limits table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Email Attachment Size Limits by Provider (2026)</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Email Provider</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-sky-400">Max Attachment</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-fuchsia-400">Recommended per Photo</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EMAIL_LIMITS.map(({ client, limit, recommended, note }, i) => (
                                    <tr key={client} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{client}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-sky-400">{limit}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-fuchsia-400">{recommended}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Steps */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">How to Compress Images for Email (4 Steps)</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="space-y-4">
                        {STEPS.map(({ n, title, desc }) => (
                            <div key={n} className="flex gap-4 bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                                <span className="w-9 h-9 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">{n}</span>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended settings */}
                <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Recommended Settings for Email Photos</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Format", value: "JPEG", note: "Universal email compatibility" },
                            { label: "Quality", value: "75–80%", note: "Imperceptible quality loss" },
                            { label: "Max Width", value: "1920 px", note: "Enough for any screen" },
                            { label: "Target Size", value: "< 1 MB", note: "Safe for all providers" },
                        ].map(({ label, value, note }) => (
                            <div key={label} className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
                                <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                                <p className="text-sky-400 font-bold text-lg">{value}</p>
                                <p className="text-xs text-gray-400 mt-1">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Free Tools for Email-Ready Images</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Compress JPG", href: "/compress-jpg" },
                            { label: "Resize Image", href: "/resize-image" },
                            { label: "PNG to JPG", href: "/png-to-jpg" },
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
                    <Link href="/compress-image-for-whatsapp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for WhatsApp <ArrowRight size={13} /></Link>
                    <Link href="/compress-image-to-100kb" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress to 100KB <ArrowRight size={13} /></Link>
                    <Link href="/jpg-vs-png" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">JPG vs PNG <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
