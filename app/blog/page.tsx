import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import AdBanner from "@/components/ui/AdBanner";

export const metadata: Metadata = {
    title: "Image Optimization Blog – Tips, Guides & Best Practices | PixlTools",
    description: "Learn how to compress images, choose the right format, and optimize images for faster websites. Free image optimization guides and tutorials from PixlTools.",
    openGraph: {
        title: "Image Optimization Blog – PixlTools",
        description: "Free guides and tutorials on image compression, format conversion, resizing, and web optimization.",
        url: "https://www.pixltools.com/blog",
        type: "website",
        images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: "PixlTools Blog – Image Optimization Guides" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Image Optimization Blog – PixlTools",
        description: "Free guides and tutorials on image compression, format conversion, and web optimization.",
        images: ["https://www.pixltools.com/opengraph-image"],
    },
    alternates: { canonical: "https://www.pixltools.com/blog" },
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">PixlTools Blog</p>
                    <div className="mb-4 text-center">
                        <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">Image Optimization Blog</h1>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mx-auto mt-4">
                        Practical guides on image compression, format conversion, resizing, and web performance — written
                        by developers and designers who work with images every day.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
                <AdBanner slot="Blog Top Banner" />

                {/* Editorial intro */}
                <div className="mt-8 mb-8 bg-[#16122a] border border-violet-500/15 rounded-2xl p-7">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-300 whitespace-nowrap">About This Blog</h2>
                        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm mb-3 text-justify">
                        The PixlTools blog covers everything you need to know about working with images on the web and beyond.
                        Whether you&apos;re a developer trying to improve your Google PageSpeed score, a photographer preparing
                        images for a client gallery, or a social media manager making sure your posts look sharp on every platform —
                        you&apos;ll find practical, actionable advice here. Every article is tested and written by people who use
                        these tools daily.
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm text-justify">
                        Topics covered include: image compression techniques, choosing between JPG vs PNG vs WebP, understanding
                        DPI and resolution for print and screen, resizing images for social media platforms, Core Web Vitals
                        optimisation, background removal workflows, AI upscaling, and much more. All guides are updated
                        regularly to keep pace with changing platform requirements and new tools.
                    </p>
                </div>

                {/* Categories quick-nav */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {Array.from(new Set(BLOG_POSTS.map(p => p.category))).map(cat => (
                        <span key={cat} className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full">
                            {cat}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BLOG_POSTS.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article className="tool-card bg-[#16122a] rounded-2xl p-6 border border-violet-500/15 hover:border-violet-500/35 h-full flex flex-col transition-all hover:shadow-lg hover:shadow-violet-900/20 hover:-translate-y-1">
                                <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-full w-fit mb-3">{post.category}</span>
                                <h2 className="text-lg font-bold text-violet-100 mb-2 line-clamp-2">{post.title}</h2>
                                <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                                    <span>📅 {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                                    <span>⏱ {post.readTime} min read</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
