import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
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
    const url = `https://www.pixltools.com/blog/${slug}`;
    const ogImageUrl = `/blog/${slug}/opengraph-image`;
    return {
        title: `${post.title} | PixlTools Blog`,
        description: post.excerpt,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-video-preview": -1,
            },
        },
        alternates: {
            canonical: url,
            languages: {
                "en": url,
                "x-default": url,
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url,
            locale: "en_US",
            siteName: "PixlTools",
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.updatedDate ?? post.date).toISOString(),
            authors: ["https://www.pixltools.com/about"],
            section: post.category,
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
    };
}

function renderInline(text: string) {
    const nodes: ReactNode[] = [];
    const pattern = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
        const token = match[0];

        if (token.startsWith("**") && token.endsWith("**")) {
            nodes.push(<strong key={`strong-${keyIndex++}`}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("[")) {
            const parts = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
            if (parts) {
                const [, label, href] = parts;
                if (href.startsWith("/")) {
                    nodes.push(<Link key={`link-${keyIndex++}`} href={href}>{label}</Link>);
                } else {
                    nodes.push(<a key={`link-${keyIndex++}`} href={href} target="_blank" rel="noreferrer">{label}</a>);
                }
            } else {
                nodes.push(token);
            }
        }

        lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
}

function renderContent(content: string) {
    const lines = content.split("\n");
    const nodes: ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith("## ")) {
            nodes.push(<h2 key={`h2-${i}`}>{renderInline(line.slice(3))}</h2>);
            i += 1;
            continue;
        }
        if (line.startsWith("### ")) {
            nodes.push(<h3 key={`h3-${i}`}>{renderInline(line.slice(4))}</h3>);
            i += 1;
            continue;
        }
        if (line.startsWith("- ")) {
            const items: React.ReactNode[] = [];
            let j = i;
            while (j < lines.length && lines[j].startsWith("- ")) {
                items.push(<li key={`ul-${j}`}>{renderInline(lines[j].slice(2))}</li>);
                j += 1;
            }
            nodes.push(<ul key={`ul-${i}`}>{items}</ul>);
            i = j;
            continue;
        }
        if (/^\d+\.\s/.test(line)) {
            const items: React.ReactNode[] = [];
            let j = i;
            while (j < lines.length && /^\d+\.\s/.test(lines[j])) {
                items.push(<li key={`ol-${j}`}>{renderInline(lines[j].replace(/^\d+\.\s/, ""))}</li>);
                j += 1;
            }
            nodes.push(<ol key={`ol-${i}`} className="list-decimal ml-6 my-4">{items}</ol>);
            i = j;
            continue;
        }
        if (line.trim().startsWith("|")) {
            const rows: string[] = [];
            let j = i;
            while (j < lines.length && lines[j].trim().startsWith("|")) {
                rows.push(lines[j]);
                j += 1;
            }

            const parseRow = (row: string) =>
                row
                    .trim()
                    .replace(/^\|/, "")
                    .replace(/\|$/, "")
                    .split("|")
                    .map((cell) => cell.trim());

            const isSeparator = (row: string) =>
                /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(row);

            const headerCells = rows.length ? parseRow(rows[0]) : [];
            const bodyRows = rows.slice(1).filter((row) => !isSeparator(row)).map(parseRow);

            nodes.push(
                <div key={`table-${i}`} className="overflow-x-auto">
                    <table className="w-full text-sm border border-violet-500/15 rounded-xl overflow-hidden bg-[#120f23]">
                        {headerCells.length > 0 && (
                            <thead className="bg-violet-500/10">
                                <tr>
                                    {headerCells.map((cell, idx) => (
                                        <th key={`th-${i}-${idx}`} className="text-left text-violet-100 font-semibold px-4 py-3 border-b border-violet-500/15">
                                            {renderInline(cell)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {bodyRows.map((cells, rowIndex) => (
                                <tr key={`tr-${i}-${rowIndex}`} className="odd:bg-[#15112a] even:bg-[#120f23]">
                                    {cells.map((cell, cellIndex) => (
                                        <td key={`td-${i}-${rowIndex}-${cellIndex}`} className="px-4 py-3 text-gray-300 border-b border-violet-500/10">
                                            {renderInline(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            i = j;
            continue;
        }
        if (line.trim() === "") {
            nodes.push(<div key={`spacer-${i}`} className="h-3" />);
            i += 1;
            continue;
        }

        nodes.push(<p key={`p-${i}`}>{renderInline(line)}</p>);
        i += 1;
    }

    return nodes;
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
        "@type": "BlogPosting",
        headline: post!.title,
        description: post!.excerpt,
        datePublished: new Date(post!.date).toISOString(),
        dateModified: new Date(post!.updatedDate ?? post!.date).toISOString(),
        author: {
            "@type": "Organization",
            name: "PixlTools",
            url: "https://www.pixltools.com",
        },
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
        image: `https://www.pixltools.com/blog/${slug}/opengraph-image`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.pixltools.com/blog/${slug}` },
        inLanguage: "en-US",
        isPartOf: {
            "@type": "Blog",
            "@id": "https://www.pixltools.com/blog",
            name: "PixlTools Blog",
            publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
        },
    };

    const faqSchema = buildJsonLdFAQ(blogFaqs);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.pixltools.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.pixltools.com/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post!.title,
                item: `https://www.pixltools.com/blog/${slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-[#0b0816]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Header */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10 text-white py-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">
                    <Link href="/blog" className="text-violet-400 text-sm hover:text-violet-300 mb-4 inline-block">← Back to Blog</Link>
                    <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">{post!.category}</span>
                    <h1 className="font-display text-gray-200 leading-[1.1] text-3xl md:text-4xl mt-4 mb-4 text-center">{post!.title}</h1>
                    <p className="text-gray-400 max-w-3xl text-center mx-auto">{post!.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 py-4 text-sm text-gray-400 justify-center">
                        <span>📅 {new Date(post!.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span>⏱ {post!.readTime} min read</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
                <AdBanner slot="Blog Post Top" />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* ── Main content column (2/3) ── */}
                    <div className="lg:col-span-2">
                        {(() => {
                            const lines = post!.content.split("\n");
                            const mid = Math.floor(lines.length / 2);
                            return (
                                <>
                                    <article className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#141026] shadow-[0_20px_60px_rgba(17,10,40,0.65)]">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
                                        <div className="relative z-10 p-8 md:p-10">
                                            <div className="prose max-w-[720px]">
                                                {renderContent(lines.slice(0, mid).join("\n"))}
                                            </div>
                                        </div>
                                    </article>
                                    <AdBanner slot="Blog Post Middle" />
                                    <article className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#141026] shadow-[0_20px_60px_rgba(17,10,40,0.65)] mt-6">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
                                        <div className="relative z-10 p-8 md:p-10">
                                            <div className="prose max-w-[720px]">
                                                {renderContent(lines.slice(mid).join("\n"))}
                                            </div>
                                        </div>
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
                                <h2 className="font-display text-gray-200 leading-[1.1] text-3xl md:text-4xl mt-4 mb-4 py-6 text-center">Related Articles</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedPosts.map((rp) => (
                                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-[#16122a] hover:bg-[#1c1738] border border-violet-500/15 hover:border-violet-500/35 rounded-xl p-5 transition-all">
                                            <span className="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">{rp.category}</span>
                                            <p className="text-sm font-semibold text-violet-100 mt-3 mb-1 group-hover:text-white transition-colors line-clamp-2">{rp.title}</p>
                                            <p className="text-xs text-gray-400 line-clamp-2">{rp.excerpt}</p>
                                            <span className="text-xs text-violet-400 mt-3 inline-block">Read article →</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#130f28] p-8 text-white text-center mt-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.22),transparent_55%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.18),transparent_60%)]" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-600/60 to-transparent" />
                            <div className="relative z-10">
                                <h3 className="font-display text-gray-200 leading-[1.1] text-3xl md:text-4xl mt-4 mb-4 text-center">Try Our Free Image Tools</h3>
                                <p className="text-violet-100/80 mb-4">30+ free online tools to compress, resize, convert and optimize your images.</p>
                                <Link href="/" className="bg-violet-500/15 border border-violet-400/30 text-violet-100 font-bold px-6 py-3 rounded-xl hover:bg-violet-500/25 transition-colors inline-block">
                                    Explore All Tools →
                                </Link>
                            </div>
                        </div>

                        <AdBanner slot="Blog Post Bottom" />
                    </div>

                    {/* ── Sticky Sidebar (1/3) ── */}
                    <aside className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            {/* Popular Tools widget */}
                            <div className="rounded-2xl border border-violet-500/20 bg-[#141026] overflow-hidden">
                                <div className="bg-violet-500/10 border-b border-violet-500/15 px-5 py-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-violet-400">🛠 Popular Free Tools</p>
                                </div>
                                <div className="divide-y divide-violet-500/10">
                                    {[
                                        { href: "/compress-image", icon: "🗜️", name: "Compress Image", desc: "Reduce file size up to 80%" },
                                        { href: "/resize-image", icon: "📐", name: "Resize Image", desc: "Pixels, % or social presets" },
                                        { href: "/remove-image-background", icon: "🪄", name: "Remove Background", desc: "AI-powered, transparent PNG" },
                                        { href: "/jpg-to-webp", icon: "🔃", name: "JPG to WebP", desc: "Shrink photos 25–35%" },
                                        { href: "/image-upscaler", icon: "🔭", name: "Image Upscaler", desc: "Enlarge up to 4× without blur" },
                                        { href: "/image-color-picker", icon: "🎨", name: "Color Picker", desc: "Extract palette & HEX codes" },
                                        { href: "/image-sharpen", icon: "💎", name: "Sharpen Image", desc: "Crisp details in one click" },
                                        { href: "/image-contrast", icon: "🌗", name: "Adjust Contrast", desc: "Bold or soft — your style" },
                                        { href: "/image-border", icon: "🖼️", name: "Add Border", desc: "Custom color & pixel frame" },
                                        { href: "/svg-to-png", icon: "🎨", name: "SVG to PNG", desc: "High-quality vector to raster" },
                                        { href: "/image-to-pdf", icon: "📄", name: "Image to PDF", desc: "Instant, no watermarks" },
                                        { href: "/image-to-base64", icon: "💻", name: "Image to Base64", desc: "Embed in HTML, CSS & JSON" },
                                        { href: "/image-metadata-viewer", icon: "🔍", name: "EXIF Viewer", desc: "Camera & GPS metadata" },
                                        { href: "/photo-collage-maker", icon: "🖼️", name: "Collage Maker", desc: "Combine up to 16 photos" },
                                    ].map(({ href, icon, name, desc }) => (
                                        <Link key={href} href={href} className="flex items-center gap-3 px-5 py-3.5 hover:bg-violet-500/5 transition-colors group">
                                            <span className="text-xl flex-shrink-0">{icon}</span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-violet-100 group-hover:text-white transition-colors">{name}</p>
                                                <p className="text-xs text-gray-500 truncate">{desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="px-5 py-3 border-t border-violet-500/10">
                                    <Link href="/" className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                                        View all 30+ tools →
                                    </Link>
                                </div>
                            </div>
                            <AdBanner slot="Blog Sidebar Bottom" />
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
