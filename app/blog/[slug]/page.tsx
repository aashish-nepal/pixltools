import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import { buildJsonLdFAQ } from "@/lib/utils";
import FAQSection from "@/components/ui/FAQSection";
import AdBanner from "@/components/ui/AdBanner";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
    return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    const ogImageUrl = `/blog/${slug}/opengraph-image`;
    return {
        title: `${post.title} | PixlTools Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [ogImageUrl],
        },
        alternates: { canonical: `https://pixltools.com/blog/${slug}` },
    };
}

function renderContent(content: string) {
    const lines = content.split("\n");
    return lines.map((line, i) => {
        if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-slate-200 mt-8 mb-4">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold text-slate-300 mt-6 mb-3">{line.slice(4)}</h3>;
        if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-slate-300 my-2">{line.slice(2, -2)}</p>;
        if (line.startsWith("- ")) return <li key={i} className="ml-4 text-slate-500 my-1">{line.slice(2)}</li>;
        if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-slate-500 my-1 list-decimal">{line.replace(/^\d+\.\s/, "")}</li>;
        if (line.startsWith("| ")) return null;
        if (line.trim() === "") return <br key={i} />;
        return <p key={i} className="text-slate-500 leading-relaxed my-3">{line}</p>;
    });
}

const blogFaqs = [
    { question: "Are all image tools free?", answer: "Yes — all 30+ tools on PixlTools are completely free to use." },
    { question: "What image formats are supported?", answer: "JPG, PNG, WEBP, and PDF are supported across our various tools." },
    { question: "Is my data stored?", answer: "No — images are processed and deleted immediately. We never store your files." },
];

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const relatedPosts = (post!.relatedSlugs ?? [])
        .map((s) => BLOG_POSTS.find((p) => p.slug === s))
        .filter((p): p is NonNullable<typeof p> => !!p && p.slug !== slug)
        .slice(0, 3);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post!.title,
        description: post!.excerpt,
        datePublished: post!.date,
        dateModified: post!.date,
        author: { "@type": "Organization", name: "PixlTools" },
        publisher: {
            "@type": "Organization",
            name: "PixlTools",
            url: "https://pixltools.com",
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://pixltools.com/blog/${slug}` },
    };

    const faqSchema = buildJsonLdFAQ(blogFaqs);

    return (
        <main className="min-h-screen bg-slate-950">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Header */}
            <div className="bg-slate-950 border-b border-slate-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Link href="/blog" className="text-emerald-400 text-sm hover:text-emerald-300 mb-4 inline-block">← Back to Blog</Link>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">{post!.category}</span>
                    <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white">{post!.title}</h1>
                    <p className="text-slate-400">{post!.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        <span>📅 {new Date(post!.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span>⏱ {post!.readTime} min read</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <AdBanner slot="Blog Post Top" />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* ── Main content column (2/3) ── */}
                    <div className="lg:col-span-2">
                        {(() => {
                            const lines = post!.content.split("\n");
                            const mid = Math.floor(lines.length / 2);
                            return (
                                <>
                                    <article className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                                        {renderContent(lines.slice(0, mid).join("\n"))}
                                    </article>
                                    <AdBanner slot="Blog Post Middle" />
                                    <article className="bg-slate-900 rounded-2xl p-8 border border-slate-800 mt-6">
                                        {renderContent(lines.slice(mid).join("\n"))}
                                    </article>
                                </>
                            );
                        })()}

                        <div className="mt-8">
                            <FAQSection faqs={blogFaqs} />
                        </div>

                        {/* Related Articles */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-slate-200 mb-4">Related Articles</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedPosts.map((rp) => (
                                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 rounded-xl p-5 transition-all">
                                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{rp.category}</span>
                                            <p className="text-sm font-semibold text-slate-200 mt-3 mb-1 group-hover:text-white transition-colors line-clamp-2">{rp.title}</p>
                                            <p className="text-xs text-slate-500 line-clamp-2">{rp.excerpt}</p>
                                            <span className="text-xs text-emerald-400 mt-3 inline-block">Read article →</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center mt-8">
                            <h3 className="text-xl font-bold mb-2">Try Our Free Image Tools</h3>
                            <p className="text-emerald-100 mb-4">30+ free online tools to compress, resize, convert and optimize your images.</p>
                            <Link href="/" className="bg-slate-950 text-emerald-400 font-bold px-6 py-3 rounded-xl hover:bg-slate-900 transition-colors inline-block">
                                Explore All Tools →
                            </Link>
                        </div>

                        <AdBanner slot="Blog Post Bottom" />
                    </div>

                    {/* ── Sticky Sidebar (1/3) ── */}
                    <aside className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <AdBanner slot="Blog Sidebar Top" />
                            <AdBanner slot="Blog Sidebar Bottom" />
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
