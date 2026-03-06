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

/** @deprecated Use validateFileSizeClient for clarity — this conflicts with the server-side validateFileSize */
export function validateFileSize(bytes: number): boolean {
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
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description: desc,
        url,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
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
