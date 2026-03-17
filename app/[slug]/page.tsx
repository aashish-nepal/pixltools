import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getToolBySlug } from "@/lib/tools-data";
import ToolPageClient from "./ToolPageClient";
import { buildJsonLdFAQ } from "@/lib/utils";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) return {};
    const url = `https://www.pixltools.com/${tool.slug}`;
    const ogImage = `/opengraph-image`;
    return {
        title: tool.metaTitle,
        description: tool.metaDesc,
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
            title: tool.metaTitle,
            description: tool.metaDesc,
            url,
            type: "website",
            locale: "en_US",
            siteName: "PixlTools",
            images: [{ url: ogImage, width: 1200, height: 630, alt: tool.name }],
        },
        twitter: {
            card: "summary_large_image",
            title: tool.metaTitle,
            description: tool.metaDesc,
            images: [ogImage],
        },
    };
}

export default async function ToolPage({ params }: Props) {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) notFound();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixltools.com" },
            { "@type": "ListItem", position: 2, name: tool.name, item: `https://www.pixltools.com/${tool.slug}` },
        ],
    };

    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        operatingSystem: "Web",
        applicationCategory: "MultimediaApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: tool.metaDesc,
        url: `https://www.pixltools.com/${tool.slug}`,
        publisher: { "@type": "Organization", name: "PixlTools", url: "https://www.pixltools.com" },
    };

    const faqSchema = tool.faqs && tool.faqs.length > 0 ? buildJsonLdFAQ(tool.faqs) : null;

    const howToSchema = tool.howToSteps && tool.howToSteps.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Use ${tool.name} Online Free`,
            description: tool.metaDesc,
            step: tool.howToSteps.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
            })),
        }
        : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
            {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}

            <ToolPageClient tool={tool} />

            {/* Trust signals — visible, unique content not shown by ToolPageClient */}
            <div className="bg-[#0b0816] pb-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "🔒", title: "100% Private", desc: "Your images are deleted immediately after processing. We never store or share your files." },
                            { icon: "⚡", title: "Powered by Sharp", desc: "Industry-leading image processing library used by Netflix, Vercel, and thousands of companies worldwide." },
                            { icon: "🆓", title: "Always Free", desc: "No account, no watermarks, no limits. PixlTools is free to use for everyone, forever." },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="bg-[#14102a] border border-violet-500/15 rounded-xl p-5 flex gap-4">
                                <span className="text-2xl flex-shrink-0">{icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-violet-200 mb-1">{title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*
                Visually hidden server-rendered text for Google's crawler.
                Invisible to users (position absolute, 1x1px, clipped).
                No visual duplication — Google reads this as plain HTML without JS.
            */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    whiteSpace: "nowrap",
                }}
            >
                <h2>About {tool.name}</h2>
                <p>{tool.metaDesc}</p>
                <p>{tool.shortDesc}</p>
                {tool.extendedDesc && <p>{tool.extendedDesc}</p>}

                {tool.howToSteps && tool.howToSteps.length > 0 && (
                    <>
                        <h2>How to Use {tool.name}</h2>
                        <ol>
                            {tool.howToSteps.map((step, i) => (
                                <li key={i}><strong>{step.name}</strong>: {step.text}</li>
                            ))}
                        </ol>
                    </>
                )}

                {tool.faqs && tool.faqs.length > 0 && (
                    <>
                        <h2>Frequently Asked Questions about {tool.name}</h2>
                        <dl>
                            {tool.faqs.map((faq, i) => (
                                <div key={i}>
                                    <dt>{faq.question}</dt>
                                    <dd>{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </>
                )}
            </div>
        </>
    );
}
