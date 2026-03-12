import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getToolBySlug } from "@/lib/tools-data";
import ToolPageClient from "./ToolPageClient";

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
    const ogImage = "/opengraph-image";
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ToolPageClient tool={tool} />
        </>
    );
}
