import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
    title: "Full Site Map – All Tools & Blog Articles | PixlTools",
    description: "A complete list of every free image tool, blog guide, and page on PixlTools. Browse 30+ tools and 30+ articles on image compression, resizing, conversion, and more.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    alternates: {
        canonical: "https://www.pixltools.com/sitemap-page",
    },
};

// Group tools by category for better readability
const CATEGORY_LABELS: Record<string, string> = {
    compression: "Compress Images",
    "resize-crop": "Resize & Crop",
    conversion: "Convert Formats",
    utilities: "Edit & Utilities",
    advanced: "AI & Advanced",
};

export default function SitemapPage() {
    // Group tools by category
    const grouped = TOOLS.reduce<Record<string, typeof TOOLS>>((acc, tool) => {
        const cat = tool.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(tool);
        return acc;
    }, {});

    const categoryOrder = ["compression", "resize-crop", "conversion", "utilities", "advanced"];

    const staticPages = [
        { href: "/", label: "Home – Free Online Image Tools" },
        { href: "/blog", label: "Blog – Image Optimization Guides" },
        { href: "/photo-collage-maker", label: "Photo Collage Maker" },
        { href: "/jpg-vs-png", label: "JPG vs PNG – Format Comparison Guide" },
        { href: "/png-vs-webp", label: "PNG vs WebP – Format Comparison Guide" },
        { href: "/how-to-compress-images-for-instagram", label: "How to Compress Images for Instagram" },
        { href: "/premium", label: "Premium – Unlock Advanced Features" },
        { href: "/api-access", label: "API Access – Developer Integration" },
        { href: "/about", label: "About PixlTools" },
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
    ];

    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-14">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">PixlTools</p>
                    <h1 className="font-display text-gray-200 text-3xl sm:text-4xl font-bold mb-3">Full Site Map</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm">
                        Every free image tool, blog guide, and page — all in one place.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12">

                {/* Static Pages */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">Pages</h2>
                    <div className="rounded-2xl border border-violet-500/15 bg-[#13102a] divide-y divide-violet-500/10 overflow-hidden">
                        {staticPages.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex items-center gap-3 px-5 py-3.5 hover:bg-violet-500/5 transition-colors group"
                            >
                                <span className="text-violet-500/50 text-xs font-mono select-none">→</span>
                                <span className="text-sm text-gray-300 group-hover:text-violet-200 transition-colors">{label}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Tools by category */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-6">
                        Free Image Tools ({TOOLS.length}+)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {categoryOrder.map(cat => {
                            const tools = grouped[cat] ?? [];
                            if (!tools.length) return null;
                            return (
                                <div key={cat} className="rounded-2xl border border-violet-500/15 bg-[#13102a] overflow-hidden">
                                    <div className="bg-violet-500/8 border-b border-violet-500/10 px-5 py-3">
                                        <p className="text-xs font-bold uppercase tracking-wider text-violet-400">
                                            {CATEGORY_LABELS[cat] ?? cat}
                                        </p>
                                    </div>
                                    <div className="divide-y divide-violet-500/10">
                                        {tools.map(tool => (
                                            <Link
                                                key={tool.slug}
                                                href={`/${tool.slug}`}
                                                className="flex items-center gap-3 px-5 py-3 hover:bg-violet-500/5 transition-colors group"
                                            >
                                                <span className="text-base flex-shrink-0">{tool.icon}</span>
                                                <span className="text-sm text-gray-300 group-hover:text-violet-200 transition-colors">
                                                    {tool.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Blog posts */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4">
                        Blog Articles ({BLOG_POSTS.length})
                    </h2>
                    <div className="rounded-2xl border border-violet-500/15 bg-[#13102a] divide-y divide-violet-500/10 overflow-hidden">
                        {BLOG_POSTS.map(post => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="flex items-start gap-3 px-5 py-3.5 hover:bg-violet-500/5 transition-colors group"
                            >
                                <span className="text-violet-500/50 text-xs font-mono select-none mt-0.5">→</span>
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-300 group-hover:text-violet-200 transition-colors leading-snug">
                                        {post.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{post.category} · {post.readTime} min read</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
