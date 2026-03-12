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
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PixlTools Blog – Image Optimization Guides" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Image Optimization Blog – PixlTools",
        description: "Free guides and tutorials on image compression, format conversion, and web optimization.",
        images: ["/opengraph-image"],
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
                    <div className="mb-6 text-center">
                    <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl lg:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">Image Optimization Blog</h1>
                     </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
                <AdBanner slot="Blog Top Banner" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
