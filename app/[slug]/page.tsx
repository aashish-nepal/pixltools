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
    // #17 fix: use root-level OG image — per-slug opengraph-image.tsx doesn't exist
    const ogImage = "/opengraph-image";
    return {
        title: tool.metaTitle,
        description: tool.metaDesc,
        alternates: { canonical: url },
        openGraph: {
            title: tool.metaTitle,
            description: tool.metaDesc,
            url,
            type: "website",
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
    return <ToolPageClient tool={tool} />;
}
