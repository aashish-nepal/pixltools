import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getToolBySlug } from "@/lib/tools-data";
import ToolPageClient from "./ToolPageClient";
import { Gauge, Lock, Gift, Resize, ArrowsClockwise, Lightning, Robot, Target, Wrench, DeviceMobile } from "@phosphor-icons/react/dist/ssr";

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
    const ogImage = `https://www.pixltools.com/${tool.slug}/opengraph-image`;
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

    const faqItems = tool.faqs && tool.faqs.length > 0
        ? tool.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        }))
        : null;

    const howToSteps = tool.howToSteps && tool.howToSteps.length > 0
        ? tool.howToSteps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
        }))
        : null;

    // Single consolidated @graph block — prevents Google from seeing duplicate FAQPage schemas
    const graphItems: object[] = [breadcrumbSchema, softwareAppSchema];
    if (faqItems) {
        graphItems.push({ "@type": "FAQPage", mainEntity: faqItems });
    }

    let howToSchema = null;
    if (howToSteps) {
        howToSchema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Use ${tool.name} Online Free`,
            description: tool.metaDesc,
            image: `https://www.pixltools.com/${tool.slug}/opengraph-image`,
            totalTime: "PT1M",
            step: howToSteps,
        };
    }

    const consolidatedSchema = { "@context": "https://schema.org", "@graph": graphItems };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedSchema) }} />
            {howToSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            )}

            <ToolPageClient tool={tool} />

            {/* extendedDesc: fully visible "About This Tool" section — same content for users and Googlebot */}
            {tool.extendedDesc && (
                <div className="bg-[#0b0816] pb-6">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                        <div className="bg-[#110e24] border border-violet-500/15 rounded-2xl p-6 sm:p-8">
                            <h2 className="text-base font-semibold text-violet-300 mb-3">About This Tool</h2>
                            <p className="text-sm text-gray-300 leading-relaxed">{tool.extendedDesc}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Trust signals — category-specific so each tool page has unique content */}
            <div className="bg-[#0b0816] pb-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {((): { Icon: React.ElementType; iconClass: string; title: string; desc: string }[] => {
                            if (tool.category === "compression") return [
                                { Icon: Gauge, iconClass: "text-violet-400", title: "Up to 90% Smaller", desc: `${tool.name} uses Smart compression targeting the best quality-to-size ratio — not a blanket quality cut.` },
                                { Icon: Lock, iconClass: "text-violet-400", title: "Files Never Stored", desc: "Your image is processed and deleted immediately. Nothing is saved on our servers after you download." },
                                { Icon: Gift, iconClass: "text-violet-400", title: "No Limits, No Cost", desc: "Compress as many images as you need. No account, no daily cap, no watermarks — free forever." },
                            ];
                            if (tool.category === "resize-crop") return [
                                { Icon: Resize, iconClass: "text-violet-400", title: "Pixel-Perfect Output", desc: `${tool.name} outputs at your exact target dimensions — no rounding, no unwanted padding.` },
                                { Icon: Lock, iconClass: "text-violet-400", title: "Private by Design", desc: "Uploaded images are deleted from our servers the moment processing finishes. We never keep your files." },
                                { Icon: DeviceMobile, iconClass: "text-violet-400", title: "Works on Any Device", desc: "Fully optimized for iPhone and Android browsers — no app download or desktop required." },
                            ];
                            if (tool.category === "conversion") return [
                                { Icon: ArrowsClockwise, iconClass: "text-violet-400", title: "Lossless Conversion", desc: `${tool.name} preserves all image data through the format change — no unexpected quality loss.` },
                                { Icon: Lock, iconClass: "text-violet-400", title: "Zero Data Retention", desc: "Converted files are deleted from our servers immediately after download. Your files stay yours." },
                                { Icon: Lightning, iconClass: "text-violet-400", title: "Instant Results", desc: "Conversion typically completes in under 3 seconds for files up to 10 MB." },
                            ];
                            if (tool.category === "advanced") return [
                                { Icon: Robot, iconClass: "text-violet-400", title: "AI-Powered Processing", desc: `${tool.name} uses machine learning models to deliver results that rule-based tools cannot match.` },
                                { Icon: Lock, iconClass: "text-violet-400", title: "No Data Ever Stored", desc: "Images are processed ephemerally and deleted immediately. We have no access to your files after processing." },
                                { Icon: Target, iconClass: "text-violet-400", title: "Professional Quality", desc: "Outputs match the quality of desktop apps like Photoshop — without the price tag or the installation." },
                            ];
                            // utilities
                            return [
                                { Icon: Wrench, iconClass: "text-violet-400", title: "Browser-Based", desc: `${tool.name} runs entirely in your browser — no software to install, no extensions, no plugins.` },
                                { Icon: Lock, iconClass: "text-violet-400", title: "Fully Private", desc: "Your images are deleted from our servers immediately after processing. Nothing is logged or shared." },
                                { Icon: Gift, iconClass: "text-violet-400", title: "Always Free", desc: "No account required. No watermarks. No usage limits. PixlTools is free for everyone, forever." },
                            ];
                        })().map(({ Icon, iconClass, title, desc }) => (
                            <div key={title} className="bg-[#14102a] border border-violet-500/15 rounded-xl p-5 flex gap-4">
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                    <Icon size={18} weight="duotone" className={iconClass} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-violet-200 mb-1">{title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}
