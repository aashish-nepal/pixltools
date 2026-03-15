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
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: tool.name,
                },
            ],
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
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.pixltools.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: tool.name,
                item: `https://www.pixltools.com/${tool.slug}`,
            },
        ],
    };

    // SoftwareApplication schema — unlocks App-style rich results in Google
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        operatingSystem: "Web",
        applicationCategory: "MultimediaApplication",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: tool.metaDesc,
        url: `https://www.pixltools.com/${tool.slug}`,
        publisher: {
            "@type": "Organization",
            name: "PixlTools",
            url: "https://www.pixltools.com",
        },
    };

    // FAQPage schema — per-tool FAQs for rich FAQ results in Google SERP
    const faqSchema = tool.faqs && tool.faqs.length > 0
        ? buildJsonLdFAQ(tool.faqs)
        : null;

    // HowTo schema — step-by-step rich results in Google SERP
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {howToSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            )}
            <ToolPageClient tool={tool} />
        </>
    );
}
