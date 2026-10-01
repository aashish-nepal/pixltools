import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

export const metadata: Metadata = {
    title: "Compress Image to 100KB Free – Online, Instant, No Signup | PixlTools",
    description: "Compress any JPG, PNG or WebP image to under 100KB online for free. Perfect for government forms, job applications, and email. No signup, no watermarks.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.pixltools.com/compress-image-to-100kb",
        languages: {
            "en": "https://www.pixltools.com/compress-image-to-100kb",
            "x-default": "https://www.pixltools.com/compress-image-to-100kb",
        },
    },
    openGraph: {
        title: "Compress Image to 100KB Free – Online, Instant",
        description: "Compress JPG, PNG or WebP to under 100KB in seconds. Perfect for government forms, visa applications & email uploads. Free, no signup.",
        url: "https://www.pixltools.com/compress-image-to-100kb",
        type: "article",
        locale: "en_US",
        siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "Compress Image to 100KB – PixlTools" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Compress Image to 100KB Free – No Signup",
        description: "Reduce any image below 100KB for government forms, applications, and email. Free & instant.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
};

const USE_CASES = [
    { icon: "🏛️", title: "Government Forms", desc: "Passport, visa, ID, and government portal uploads often require images under 50–100KB." },
    { icon: "💼", title: "Job Applications", desc: "Many HR portals have strict attachment size limits of 100–200KB for photos and documents." },
    { icon: "📧", title: "Email Attachments", desc: "Keep email file sizes manageable for recipients on slow connections or mobile data." },
    { icon: "🌐", title: "Website Uploads", desc: "Profile photos, avatars, and CMS uploads often cap at 100–200KB for fast page loads." },
    { icon: "📋", title: "Online Forms", desc: "Medical, legal, and university forms frequently cap photo sizes at 50–100KB." },
    { icon: "📱", title: "App Uploads", desc: "Mobile apps often reject profile or verification photos over 100KB." },
];

const STEPS = [
    { n: 1, title: "Open the Image Compressor", desc: "Click the 'Compress Image Now' button below to go to the PixlTools Image Compressor tool." },
    { n: 2, title: "Upload your image", desc: "Upload your JPG, PNG, or WebP photo. Files up to 10MB are supported. The tool works entirely in your browser — nothing is stored." },
    { n: 3, title: "Set quality to 60–70", desc: "To get under 100KB for a typical photo (1–5MB original), set quality to around 60–70. For very large originals, also resize to 800px wide first using our Resize tool." },
    { n: 4, title: "Check the output size", desc: "The compressed file size is shown before you download. If it is still above 100KB, lower the quality further or reduce the image dimensions." },
    { n: 5, title: "Download", desc: "Click Download to save your compressed image. It is now under 100KB and ready for upload to any form, portal, or email." },
];

const SIZE_GUIDE = [
    { original: "5 MB camera JPG", target: "< 100 KB", quality: "50–60%", resize: "Resize to 800px wide first" },
    { original: "2 MB phone photo", target: "< 100 KB", quality: "55–65%", resize: "Resize to 1000px wide first" },
    { original: "500 KB PNG", target: "< 100 KB", quality: "Convert to JPG at 70%" , resize: "No resize needed" },
    { original: "200 KB JPG", target: "< 100 KB", quality: "70–75%", resize: "No resize needed" },
    { original: "100 KB JPG", target: "< 50 KB", quality: "60%", resize: "No resize needed" },
];

const FAQS = [
    { q: "How do I compress an image to exactly 100KB?", a: "Use our Image Compressor and set quality to around 60–70% for a typical 2–5MB photo. Check the output file size before downloading — if it is still over 100KB, lower quality further. For very large originals, resize the image to 800–1000px wide first, then compress. This two-step approach reliably brings most photos under 100KB." },
    { q: "Will compressing to 100KB make my image look bad?", a: "It depends on the original size. For a 500KB JPG compressed to 100KB (5:1 ratio), quality is good. For a 5MB photo compressed to 100KB (50:1 ratio), there will be visible JPEG artifacts. The best strategy is to also resize the image to a smaller pixel size first — this allows a higher quality setting while still meeting the file size limit." },
    { q: "What formats can I compress to under 100KB?", a: "You can compress JPG, PNG, and WebP images. JPG (JPEG) is the most efficient format for photos and will achieve the smallest file sizes. PNG is better for graphics and logos but produces larger files — convert PNG to JPG first if you need to go under 100KB for a photo." },
    { q: "How do I reduce image size for a government form upload?", a: "Most government forms require JPEG format, maximum size 50–100KB, and specific pixel dimensions (often 200×200px to 600×600px for photos). Use our Resize tool first to match the required dimensions, then use the Image Compressor at quality 70–80 to bring the file size under the limit. If still too large, lower quality to 60." },
    { q: "Can I reduce a PNG image to under 100KB?", a: "Yes, but PNG files are harder to compress than JPEG for photographs. The most effective approach is to convert the PNG to JPG first using our PNG to JPG converter, then compress the resulting JPG to under 100KB. For graphics and logos, keep PNG format and use our PNG compressor — transparent areas compress efficiently." },
    { q: "Is there a faster way to compress multiple images to 100KB?", a: "Our tool processes one image at a time. For batch compression, you can process each image individually — it takes under 30 seconds per image. For very large batches (100+ images), desktop tools like ImageMagick with a script are more efficient." },
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Compress an Image to Under 100KB (2026 Guide)",
    description: "Step-by-step guide to compressing any image to under 100KB for government forms, job applications, email, and web uploads.",
    url: "https://www.pixltools.com/compress-image-to-100kb",
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
            { "@type": "ListItem", position: 2, name: "Compress Image to 100KB", item: "https://www.pixltools.com/compress-image-to-100kb" },
        ],
    },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress an Image to Under 100KB",
    description: "Compress any JPG, PNG or WebP image to under 100KB using PixlTools Image Compressor.",
    totalTime: "PT2M",
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

export default function CompressTo100KBPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/12 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
                        File Size Guide · 100KB Target
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        Compress Image to{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Under 100KB</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Reduce any JPG, PNG, or WebP image below 100KB in seconds. Perfect for government
                        portal uploads, job applications, visa forms, and email attachments.
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

                {/* Use cases */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Why You Need an Image Under 100KB</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {USE_CASES.map(({ icon, title, desc }) => (
                            <div key={title} className="bg-[#16122a] border border-violet-500/15 rounded-xl p-5">
                                <div className="text-2xl mb-3">{icon}</div>
                                <h3 className="font-semibold text-violet-200 mb-1">{title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Steps */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">How to Compress an Image to 100KB</h2>
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

                {/* Quality settings reference table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Quality Settings Reference Guide</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="bg-[#0f0c1e] border border-violet-500/10 rounded-2xl p-4 flex gap-3 mb-4">
                        <Info size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-violet-300/70 leading-relaxed">
                            The quality setting you need depends on both the original file size and dimensions. Always resize the image to a reasonable pixel size first — this is the most effective way to reduce file size without ugly compression artifacts.
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Original Size</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-fuchsia-400">Target</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Quality Setting</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Resize First?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SIZE_GUIDE.map(({ original, target, quality, resize }, i) => (
                                    <tr key={original} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-mono text-gray-300">{original}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-fuchsia-400">{target}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{quality}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{resize}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tool CTAs */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Tools You Will Need</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Resize Image", href: "/resize-image" },
                            { label: "PNG to JPG", href: "/png-to-jpg" },
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
                    <Link href="/compress-image-for-whatsapp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for WhatsApp <ArrowRight size={13} /></Link>
                    <Link href="/compress-image-for-email" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for Email <ArrowRight size={13} /></Link>
                    <Link href="/reduce-image-file-size" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Reduce Image File Size <ArrowRight size={13} /></Link>
                    <Link href="/png-to-jpg" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">PNG to JPG <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
