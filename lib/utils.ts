// File validation utilities shared across server and client
export const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/tiff",
    "application/pdf",
];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ─── Client-side file validation helpers (return boolean) ────────────────────
// NOTE: The server-side equivalents in api-utils.ts return string|null (error msg).
// These are intentionally different signatures for use in the browser UI.
export function validateFileType(mime: string): boolean {
    return ALLOWED_MIME_TYPES.includes(mime);
}

export function validateFileSizeClient(bytes: number): boolean {
    return bytes <= MAX_FILE_SIZE_BYTES;
}



export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getFileExtension(mime: string): string {
    const map: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/tiff": "tiff",
        "application/pdf": "pdf",
    };
    return map[mime] || "bin";
}

export function buildJsonLdWebApp(name: string, desc: string, url: string) {
    // Ensure url always uses www subdomain for consistency with canonical
    const canonicalUrl = url.replace("https://pixltools.com", "https://www.pixltools.com");
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description: desc,
        url: canonicalUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

export function buildJsonLdBreadcrumb(toolName: string, toolSlug: string) {
    return {
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
                name: toolName,
                item: `https://www.pixltools.com/${toolSlug}`,
            },
        ],
    };
}

export function buildJsonLdHowTo(toolName: string, steps: string[]) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${toolName}`,
        step: steps.map((text, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text,
        })),
    };
}

export function buildJsonLdFAQ(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}
