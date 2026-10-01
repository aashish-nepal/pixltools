import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Resize Image for Instagram Free – All Sizes 2026 | PixlTools",
    description: "Resize photos to the exact Instagram dimensions for posts, stories, reels, and profile. Free, instant, no signup. Square, portrait, landscape & story sizes.",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 } },
    alternates: {
        canonical: "https://www.pixltools.com/resize-image-for-instagram",
        languages: { "en": "https://www.pixltools.com/resize-image-for-instagram", "x-default": "https://www.pixltools.com/resize-image-for-instagram" },
    },
    openGraph: {
        title: "Resize Image for Instagram – All Sizes (2026 Guide)",
        description: "Get the exact Instagram image dimensions for posts, stories, reels & profile photos. Free resize tool, no signup.",
        url: "https://www.pixltools.com/resize-image-for-instagram",
        type: "article", locale: "en_US", siteName: "PixlTools",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "Instagram Image Sizes 2026 – PixlTools" }],
    },
    twitter: { card: "summary_large_image", title: "Resize Image for Instagram – All 2026 Sizes", description: "Exact Instagram image dimensions for posts, stories, reels & profile. Free resize tool.", images: ["https://www.pixltools.com/opengraph-image"] },
};

const INSTAGRAM_SIZES = [
    { type: "Square Post", dimensions: "1080 × 1080 px", ratio: "1:1", fileSize: "150–300 KB", notes: "Default format. Safe for all feed layouts. Crops to 4:5 on some feeds." },
    { type: "Portrait Post", dimensions: "1080 × 1350 px", ratio: "4:5", fileSize: "200–400 KB", notes: "Takes most feed space. Best for engagement. Most recommended format." },
    { type: "Landscape Post", dimensions: "1080 × 566 px", ratio: "1.91:1", fileSize: "100–200 KB", notes: "Avoid — Instagram crops aggressively and it shows less of your image." },
    { type: "Story", dimensions: "1080 × 1920 px", ratio: "9:16", fileSize: "300–600 KB", notes: "Full-screen vertical. Keep key content within 250px of top and bottom." },
    { type: "Reel Cover", dimensions: "1080 × 1920 px", ratio: "9:16", fileSize: "300–600 KB", notes: "Same as Story. Feed thumbnail crops to 1:1 so center your subject." },
    { type: "Profile Photo", dimensions: "320 × 320 px", ratio: "1:1", fileSize: "< 50 KB", notes: "Displayed circular at 110px. Keep subject centered and avoid fine details." },
    { type: "Carousel Slide", dimensions: "1080 × 1080 px", ratio: "1:1", fileSize: "150–300 KB", notes: "Use same ratio for all slides. Mixing ratios causes erratic cropping." },
    { type: "IGTV Cover", dimensions: "420 × 654 px", ratio: "1:1.55", fileSize: "< 100 KB", notes: "Vertical thumbnail. Bold text and faces work best at this size." },
];

const STEPS = [
    { n: 1, title: "Choose your Instagram format", desc: "Refer to the size guide above and pick the right dimensions for your post type — square (1080×1080), portrait (1080×1350), story (1080×1920), etc." },
    { n: 2, title: "Upload your image", desc: "Click 'Resize Image Now' and upload your photo. JPG, PNG, and WebP are all supported up to 10MB." },
    { n: 3, title: "Enter the exact pixel dimensions", desc: "Type the width and height from the table above. Enable 'Lock aspect ratio' if you want to avoid distortion — or turn it off to force an exact crop." },
    { n: 4, title: "Download and post", desc: "Click Process then Download. Your image is ready to upload directly to Instagram with no further resizing needed." },
];

const FAQS = [
    { q: "What is the best image size for Instagram posts in 2026?", a: "The best Instagram post size is 1080 × 1350 pixels (4:5 portrait ratio). It takes the most feed space, gets more engagement, and displays at full resolution on all devices. For square content, use 1080 × 1080 pixels." },
    { q: "What size should an Instagram story image be?", a: "Instagram Story images should be 1080 × 1920 pixels (9:16 ratio). Keep important content — text, faces, and CTAs — within the safe zone: 250px from the top and 250px from the bottom to avoid being obscured by the UI." },
    { q: "Why does Instagram crop my photos?", a: "Instagram enforces aspect ratio limits. It accepts ratios between 1.91:1 (landscape) and 4:5 (portrait). If you upload an image outside these bounds — like a tall 9:16 portrait for a feed post — Instagram crops it to the nearest accepted ratio. Always resize to the exact dimensions before uploading." },
    { q: "What is the Instagram profile photo size?", a: "Your Instagram profile photo should be at least 320 × 320 pixels in a 1:1 square ratio. Instagram displays it as a circle at approximately 110px diameter on mobile and 150px on desktop. Use a clear, centered subject with no fine details that would be lost at small sizes." },
    { q: "Does Instagram reduce image quality?", a: "Yes. Instagram re-compresses images during upload, applying JPEG compression at approximately quality 85. To minimize quality loss, upload at exactly 1080px wide (the maximum Instagram displays), in sRGB color profile, and at quality 80–85 — this matches Instagram's compression and avoids a second round of degradation." },
    { q: "What image format should I use for Instagram?", a: "Use JPEG for photos — it achieves the smallest file sizes at good quality. Use PNG only for graphics, logos, and text-heavy images where sharpness matters. Instagram accepts JPEG and PNG but re-compresses both to JPEG internally." },
];

const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: "Instagram Image Sizes 2026 – Complete Guide to Resize Photos",
    description: "Exact Instagram dimensions for posts, stories, reels, and profile photos. Resize images correctly to prevent Instagram cropping and quality loss.",
    url: "https://www.pixltools.com/resize-image-for-instagram",
    datePublished: "2026-10-01", dateModified: "2026-10-01", inLanguage: "en-US",
    author: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
    publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com", logo: { "@type": "ImageObject", url: "https://www.pixltools.com/logo.jpg", width: 512, height: 512 } },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
        { "@type": "ListItem", position: 2, name: "Resize Image for Instagram", item: "https://www.pixltools.com/resize-image-for-instagram" },
    ]},
};

const howToSchema = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: "How to Resize an Image for Instagram",
    description: "Resize photos to the correct Instagram dimensions in 4 steps.",
    totalTime: "PT2M",
    step: STEPS.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.desc })),
};

const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ResizeForInstagramPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(217,70,239,0.12) 0%, rgba(109,40,217,0.08) 50%, transparent 70%)" }} />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-fuchsia-300 mb-6">
                        Platform Guide · Instagram
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-4 tracking-tight">
                        Resize Image for{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Instagram</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Get the exact pixel dimensions for every Instagram format — posts, stories,
                        reels, carousels, and profile photos — and resize in one click.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link href="/resize-image" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-2xl transition-all text-sm shadow-lg shadow-violet-900/40">
                            Resize Image Now <ArrowRight size={14} />
                        </Link>
                        <Link href="/crop-image" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200/70 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all text-sm">
                            Crop to Ratio <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 space-y-16">

                {/* Size table */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Instagram Image Sizes 2026 — Complete Reference</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-violet-500/15">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-violet-500/10 bg-[#16122a]">
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Format</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-fuchsia-400">Dimensions</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Ratio</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">File Size</th>
                                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-violet-400">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INSTAGRAM_SIZES.map(({ type, dimensions, ratio, fileSize, notes }, i) => (
                                    <tr key={type} className={`border-b border-violet-500/10 last:border-none ${i % 2 === 0 ? "bg-[#16122a]" : "bg-[#130f25]"}`}>
                                        <td className="px-5 py-3.5 text-sm font-semibold text-violet-200/70">{type}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-fuchsia-400">{dimensions}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-400">{ratio}</td>
                                        <td className="px-5 py-3.5 text-sm font-mono text-violet-300/60">{fileSize}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400 max-w-xs">{notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Steps */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">How to Resize an Image for Instagram</h2>
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

                {/* Pro tip */}
                <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl p-6">
                    <h2 className="font-bold text-fuchsia-300 text-lg mb-3">Pro Tip: Use Portrait (4:5) for Maximum Reach</h2>
                    <p className="text-violet-300/80 text-sm leading-relaxed">
                        The <strong className="text-fuchsia-300">4:5 portrait format (1080×1350px)</strong> takes up significantly more vertical space in the Instagram feed than a square post — giving your image roughly <strong className="text-fuchsia-300">25% more screen real estate</strong>.
                        More space = more attention = higher engagement rates. Switch from square to 4:5 portrait for your next post and you will notice the difference immediately.
                    </p>
                </div>

                {/* Tools */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Free Tools for Instagram-Ready Images</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Resize Image", href: "/resize-image" },
                            { label: "Crop Image", href: "/crop-image" },
                            { label: "Compress Image", href: "/compress-image" },
                            { label: "Change Aspect Ratio", href: "/change-aspect-ratio" },
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
                    <Link href="/how-to-compress-images-for-instagram" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for Instagram <ArrowRight size={13} /></Link>
                    <Link href="/image-thumbnail" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Thumbnail Generator <ArrowRight size={13} /></Link>
                    <Link href="/compress-image-for-whatsapp" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">Compress for WhatsApp <ArrowRight size={13} /></Link>
                    <Link href="/#tools" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">All Image Tools <ArrowRight size={13} /></Link>
                </div>
            </div>
        </main>
    );
}
