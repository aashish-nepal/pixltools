import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getAllCategories, getPostsByCategory } from "@/lib/blog-data";

interface Props { params: Promise<{ category: string }>; }

/** Convert slug-style category (e.g. "social-media") to display label (e.g. "Social Media") */
function slugToLabel(slug: string): string {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

/** Convert display label to URL slug */
function labelToSlug(label: string): string {
    return label.toLowerCase().replace(/\s+/g, "-");
}

export async function generateStaticParams() {
    return getAllCategories().map((cat) => ({
        category: labelToSlug(cat),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const label = slugToLabel(category);
    const posts = getPostsByCategory(category);
    if (posts.length === 0) return {};

    const url = `https://www.pixltools.com/blog/category/${category}`;
    return {
        title: `${label} Guides & Tips – Image Optimization | PixlTools Blog`,
        description: `Browse all free ${label.toLowerCase()} guides on PixlTools. Learn best practices, tips, and step-by-step tutorials on ${label.toLowerCase()} for images.`,
        robots: {
            index: false,   // thin filter page — excluded to preserve crawl budget for content pages
            follow: true,
            googleBot: { index: false, follow: true },
        },
        alternates: { canonical: url },
        openGraph: {
            title: `${label} Guides – PixlTools Blog`,
            description: `Free ${label.toLowerCase()} guides and tutorials from PixlTools.`,
            url,
            type: "website",
            images: [{ url: "https://www.pixltools.com/opengraph-image", width: 1200, height: 630, alt: `PixlTools – ${label} Guides` }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${label} Guides – PixlTools Blog`,
            description: `Free ${label.toLowerCase()} guides and tutorials from PixlTools.`,
            images: ["https://www.pixltools.com/opengraph-image"],
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const label = slugToLabel(category);
    const posts = getPostsByCategory(category);
    if (posts.length === 0) notFound();

    const allCategories = getAllCategories();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.pixltools.com/blog" },
            { "@type": "ListItem", position: 3, name: label, item: `https://www.pixltools.com/blog/category/${category}` },
        ],
    };

    const collectionPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${label} Guides – PixlTools Blog`,
        description: `Free ${label.toLowerCase()} guides and tutorials on image optimization from PixlTools.`,
        url: `https://www.pixltools.com/blog/category/${category}`,
        isPartOf: { "@type": "Blog", "@id": "https://www.pixltools.com/blog", name: "PixlTools Blog" },
        numberOfItems: posts.length,
    };

    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />

            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
                    <Link href="/blog" className="text-violet-400 text-sm hover:text-violet-300 mb-4 inline-block">
                        ← All Articles
                    </Link>
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">
                        PixlTools Blog · Category
                    </p>
                    <div className="mb-4 text-center">
                        <h1 className="font-display text-gray-200 leading-[1.02] text-4xl sm:text-5xl mt-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 inline-block">
                            {label} Guides
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                        {posts.length} free guide{posts.length !== 1 ? "s" : ""} on {label.toLowerCase()} — practical
                        tips, step-by-step tutorials, and best practices.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
                {/* Other categories */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <Link
                        href="/blog"
                        className="text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        All
                    </Link>
                    {allCategories.map((cat) => {
                        const slug = labelToSlug(cat);
                        const isActive = slug === category;
                        return (
                            <Link
                                key={cat}
                                href={`/blog/category/${slug}`}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${isActive
                                    ? "text-white bg-violet-600 border-violet-500"
                                    : "text-violet-400 bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40"
                                    }`}
                            >
                                {cat}
                            </Link>
                        );
                    })}
                </div>

                {/* Post grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <article className="tool-card bg-[#16122a] rounded-2xl p-6 border border-violet-500/15 hover:border-violet-500/35 h-full flex flex-col transition-all hover:shadow-lg hover:shadow-violet-900/20 hover:-translate-y-1">
                                <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-full w-fit mb-3">
                                    {post.category}
                                </span>
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

                {/* Back to blog CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                    >
                        ← Browse all articles
                    </Link>
                </div>
            </div>
        </main>
    );
}
