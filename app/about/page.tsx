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
    "@graph": [
        {
            "@type": "AboutPage",
            name: "About PixlTools – Free Online Image Processing Tools",
            description: "PixlTools is a free, privacy-first image processing suite built on Sharp. Compress, resize, convert, and optimize images instantly — no signup, no watermarks, no data stored.",
            url: "https://www.pixltools.com/about",
            datePublished: "2026-01-01",
            dateModified: "2026-04-14",
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
            author: { "@id": "https://www.pixltools.com/about#author" },
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
                    { "@type": "ListItem", position: 2, name: "About", item: "https://www.pixltools.com/about" },
                ],
            },
        },
        {
            "@type": "Person",
            "@id": "https://www.pixltools.com/about#author",
            name: "Aashish Nepal",
            url: "https://www.pixltools.com/about",
            sameAs: ["https://www.linkedin.com/in/aashish-nepal-56247727b/"],
            jobTitle: "Founder & Software Developer",
            worksFor: {
                "@type": "Organization",
                name: "PixlTools",
                url: "https://www.pixltools.com",
            },
            description: "Full-stack developer and founder of PixlTools. Specialises in web performance, image optimisation, and building fast, accessible developer tools.",
        },
    ],
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

                {/* Author */}
                <section id="author" className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">Meet the Author</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white select-none">
                            AN
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-violet-100">Aashish Nepal</h3>
                                <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                                    Founder &amp; Developer
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                Aashish Nepal is a full-stack developer and the founder of PixlTools. He built the platform
                                to make professional-grade image processing accessible to everyone — developers, designers,
                                bloggers, and creators alike — without paywalls or privacy trade-offs. He has hands-on
                                experience with web performance optimisation, server-side image pipelines using Sharp and
                                libvips, and building production-ready Next.js applications. The guides and tutorials on
                                the PixlTools blog are written and reviewed by Aashish to ensure accuracy and practical value.
                            </p>
                            <a
                                href="https://www.linkedin.com/in/aashish-nepal-56247727b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 px-4 py-2 rounded-xl"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn Profile →
                            </a>
                        </div>
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
                            Every article is written by Aashish Nepal, drawing on real-world experience in web performance,
                            image processing pipelines, and modern frontend development. Content is published to genuinely
                            help you understand how images work — not just to rank in search.
                        </p>
                        <p>
                            Our guides cover choosing the right image format, optimizing for Google Core Web Vitals,
                            social media image dimensions, and advanced compression techniques. All content is regularly
                            reviewed and updated to reflect current platform specifications and best practices.
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
