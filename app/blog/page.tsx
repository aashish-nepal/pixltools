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
        url: "https://pixltools.com/blog",
        type: "website",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "PixlTools Blog – Image Optimization Guides",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Image Optimization Blog – PixlTools",
        description: "Free guides and tutorials on image compression, format conversion, and web optimization.",
        images: ["/opengraph-image"],
    },
    alternates: { canonical: "https://pixltools.com/blog" },
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-950">
            {/* Hero */}
            <div className="bg-slate-950 border-b border-slate-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Blog</p>
                    <h1 className="text-4xl font-bold mb-4 text-white">Image Optimization Blog</h1>
                    <p className="text-slate-400 text-lg">Guides, tutorials and tips for optimizing images for web and mobile.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <AdBanner slot="Blog Top Banner" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {BLOG_POSTS.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article className="tool-card bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/30 h-full flex flex-col transition-all">
                                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full w-fit mb-3">{post.category}</span>
                                <h2 className="text-lg font-bold text-slate-200 mb-2 line-clamp-2">{post.title}</h2>
                                <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center gap-3 mt-4 text-xs text-slate-600">
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
