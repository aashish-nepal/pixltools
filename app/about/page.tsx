import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Zap, Lock, Clock, Mail, Users, BookOpen, Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: "About PixlTools – Free Online Image Processing Tools",
    description: "PixlTools is a free, privacy-first image processing suite built on Sharp. Compress, resize, convert, and optimize images instantly — no signup, no watermarks, no data stored.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
    },
    alternates: { canonical: "https://www.pixltools.com/about" },
    openGraph: {
        title: "About PixlTools – Free Online Image Processing Tools",
        description: "Learn how PixlTools works, who built it, and why it's the best free image tool suite on the web.",
        url: "https://www.pixltools.com/about",
        type: "website",
    },
};

const FEATURES = [
    {
        icon: Zap,
        title: "Powered by Sharp",
        desc: "We use Sharp — the industry-leading Node.js image processing library trusted by Netflix, Canva, and thousands of companies worldwide.",
        color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20",
    },
    {
        icon: ShieldCheck,
        title: "100% Private",
        desc: "Your images are processed in real-time and immediately deleted. We never store, log, or share your files with anyone — ever.",
        color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20",
    },
    {
        icon: Lock,
        title: "No Account Needed",
        desc: "No sign-up, no email, no credit card. Just open a tool, upload your image, and download the result. It really is that simple.",
        color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20",
    },
    {
        icon: Clock,
        title: "Always Free",
        desc: "PixlTools is free to use — forever. We're supported by non-intrusive advertising, not by charging users or selling data.",
        color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20",
    },
];

const HOW_IT_WORKS = [
    {
        icon: "📤",
        step: "Upload",
        desc: "Select your image file from your device. We accept JPG, PNG, WEBP, PDF, HEIC, and SVG files up to 10 MB.",
    },
    {
        icon: "⚙️",
        step: "Process",
        desc: "Our server instantly processes your image using Sharp's battle-tested algorithms — the same engine behind major platforms like Canva and Vercel.",
    },
    {
        icon: "📥",
        step: "Download",
        desc: "Your result is ready in seconds. Click Download and get your optimized file — no watermarks, no compression on the output.",
    },
    {
        icon: "🗑️",
        step: "Deleted",
        desc: "Your file is permanently deleted from our servers immediately after download. We have zero access to your images after processing.",
    },
];

const WHO_ITS_FOR = [
    { icon: "🖥️", label: "Web Developers", desc: "Optimize images for faster page loads, better Core Web Vitals scores, and improved SEO." },
    { icon: "📸", label: "Photographers", desc: "Batch-prepare photos for client delivery, social media, or online portfolios without expensive software." },
    { icon: "✍️", label: "Bloggers & Writers", desc: "Resize and compress featured images to meet WordPress, Medium, or Substack upload requirements." },
    { icon: "🛍️", label: "E-commerce Sellers", desc: "Prepare product images at the exact dimensions required by Amazon, Etsy, Shopify, and other platforms." },
    { icon: "📱", label: "Social Media Creators", desc: "Resize content to the exact pixel dimensions needed for Instagram, YouTube, TikTok, and LinkedIn." },
    { icon: "💼", label: "Business Professionals", desc: "Convert, compress, and watermark images for presentations, reports, and marketing materials." },
];

const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PixlTools – Free Online Image Processing Tools",
    description: "PixlTools is a free, privacy-first image processing suite built on Sharp. Compress, resize, convert, and optimize images instantly — no signup, no watermarks, no data stored.",
    url: "https://www.pixltools.com/about",
    datePublished: "2026-01-01",
    dateModified: "2026-03-18",
    inLanguage: "en-US",
    publisher: {
        "@type": "Organization",
        name: "PixlTools",
        url: "https://www.pixltools.com",
        logo: {
            "@type": "ImageObject",
            url: "https://www.pixltools.com/logo.jpg",
            width: 512,
            height: 512,
        },
    },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://www.pixltools.com/about" },
        ],
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">About PixlTools</p>
                    <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mb-5">
                        Professional Image Tools,<br />Free for Everyone
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        PixlTools was built to give every developer, designer, blogger, and creator access to
                        enterprise-grade image processing — without the enterprise price tag.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 space-y-10">

                {/* Mission */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-5">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Our Mission</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            Images are the most bandwidth-heavy resource on the web — and most people have no easy way to
                            optimise them. Professional tools cost money, require accounts, or leave watermarks. We think that&apos;s wrong.
                        </p>
                        <p>
                            PixlTools was created by a team of web developers and designers who were tired of choosing between
                            expensive desktop software and slow, watermark-laden online tools. We built the toolkit
                            we always wished existed: fast, clean, professional-grade tools that anyone can use, completely free.
                        </p>
                        <p>
                            Today, PixlTools offers 30+ image processing operations — from compression and format conversion to
                            AI background removal and upscaling — all powered by <strong className="text-violet-300">Sharp</strong>,
                            the same industry-standard image processing library used by Netflix, Vercel, GitHub, and Canva.
                            Every tool runs server-side, meaning results are consistent, high-quality, and not dependent on your device&apos;s processing power.
                        </p>
                    </div>
                </section>

                {/* Why PixlTools */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Why PixlTools?</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
                            <div key={title} className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-6">
                                <div className={`inline-flex w-10 h-10 items-center justify-center ${bg} border ${border} rounded-xl mb-4`}>
                                    <Icon size={18} className={color} strokeWidth={1.8} />
                                </div>
                                <h3 className="font-bold text-violet-100 mb-2">{title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Code2 size={20} className="text-violet-400" />
                        <h2 className="text-2xl font-bold text-gray-300">How It Works</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Unlike purely client-side tools that rely on your browser&apos;s processing capabilities,
                        PixlTools processes every image on our secure servers using Sharp — a Node.js library built on
                        the libvips image processing pipeline. This means you get consistent, high-quality results
                        regardless of your device, browser, or connection speed.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {HOW_IT_WORKS.map(({ icon, step, desc }) => (
                            <div key={step} className="bg-[#0f0c1f] border border-violet-500/10 rounded-xl p-5">
                                <div className="text-2xl mb-3">{icon}</div>
                                <h3 className="font-semibold text-violet-200 mb-2">{step}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-5 leading-relaxed">
                        All image processing happens over HTTPS. Files are transmitted securely, processed in an
                        isolated environment, and deleted immediately. We do not use your images for training AI models,
                        analytics enrichment, or any other secondary purpose.
                    </p>
                </section>

                {/* Who It's For */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Users size={20} className="text-violet-400" />
                        <h2 className="text-2xl font-bold text-gray-300">Who Uses PixlTools?</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        PixlTools is used by hundreds of thousands of people every month across industries. Whether you need
                        to compress a single photo for an email or convert an entire library of PNGs to WebP for a website
                        relaunch, PixlTools has the right tool for the job.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {WHO_ITS_FOR.map(({ icon, label, desc }) => (
                            <div key={label} className="bg-[#16122a] border border-violet-500/15 rounded-xl p-5 flex gap-4">
                                <span className="text-2xl flex-shrink-0">{icon}</span>
                                <div>
                                    <h3 className="font-semibold text-violet-200 mb-1">{label}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Commitment */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-5">
                        <BookOpen size={20} className="text-violet-400" />
                        <h2 className="text-2xl font-bold text-gray-300">Our Editorial Commitment</h2>
                    </div>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            Beyond building tools, we publish in-depth guides and tutorials on image optimisation on our
                            <Link href="/blog" className="text-violet-400 hover:text-violet-300 transition-colors mx-1">blog</Link>.
                            Every article is written by practitioners with real-world experience in web performance,
                            digital photography, and image processing. We don&apos;t publish for search rankings — we publish
                            because we genuinely want you to understand how images work and how to get the most out of them.
                        </p>
                        <p>
                            Our guides cover topics like choosing the right image format, optimizing for Google Core Web Vitals,
                            social media image dimension requirements, and advanced compression techniques. All content
                            is regularly reviewed and updated to reflect current platform specifications and best practices.
                        </p>
                    </div>
                </section>

                {/* Tools count */}
                <section className="relative overflow-hidden rounded-2xl p-8 text-center border border-violet-500/20 bg-[#0f0c1f]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(139,92,246,0.35)_0%,rgba(99,102,241,0.18)_38%,rgba(8,6,16,0.96)_72%)]" />
                    <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 right-[-5%] h-64 w-64 rounded-full bg-indigo-400/20 blur-[90px]" />
                    <div className="relative">
                        <div className="text-5xl font-black text-white mb-2">30+</div>
                        <div className="text-violet-200/80 font-semibold mb-4">Free Image Tools Available — No Account Required</div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                                Explore All Tools →
                            </Link>
                            <Link href="/blog" className="inline-block bg-violet-500/10 hover:bg-violet-500/20 border border-violet-400/20 text-violet-200 font-bold px-6 py-3 rounded-xl transition-colors">
                                Read Our Blog →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail size={18} className="text-violet-400" strokeWidth={1.8} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-gray-300 whitespace-nowrap">Contact Us</h2>
                                <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                Have a question, feature request, or found a bug? We&apos;d love to hear from you.
                                PixlTools is constantly improving based on user feedback. Whether you&apos;re requesting a new
                                image format, a new tool, or reporting an issue, we read every message.
                            </p>
                            <p className="text-sm text-gray-400">
                                Reach us at:{" "}
                                <a
                                    href="mailto:contact@pixltools.com"
                                    className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2"
                                >
                                    contact@pixltools.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Back */}
                <div className="pt-6 border-t border-violet-500/10 flex flex-wrap gap-4 text-sm">
                    <Link href="/" className="text-violet-400 hover:text-violet-300 transition-colors">← Back to Home</Link>
                    <Link href="/blog" className="text-gray-400 hover:text-violet-300 transition-colors">Blog</Link>
                    <Link href="/privacy-policy" className="text-gray-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-400 hover:text-violet-300 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </main>
    );
}
