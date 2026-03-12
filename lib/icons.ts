/**
 * Maps every tool slug to a Phosphor Icon component name.
 * Uses duotone weight for premium look on dark backgrounds.
 */
export const TOOL_ICON_MAP: Record<string, string> = {
    // Compression
    "compress-image": "FileZip",
    "compress-jpg": "FileJpg",
    "compress-png": "FilePng",
    "compress-webp": "ImageSquare",
    // Resize & transform
    "resize-image": "CornersOut",
    "crop-image": "Crop",
    "rotate-image": "ArrowsClockwise",
    "flip-image": "FlipHorizontal",
    "image-aspect-ratio": "ArrowsOutSimple",
    // Conversion
    "jpg-to-png": "ArrowsLeftRight",
    "png-to-jpg": "ArrowsLeftRight",
    "jpg-to-webp": "ArrowsLeftRight",
    "webp-to-jpg": "ArrowsLeftRight",
    "png-to-webp": "ArrowsLeftRight",
    "webp-to-png": "ArrowsLeftRight",
    "image-to-pdf": "FilePdf",
    "pdf-to-image": "Images",
    // Utilities
    "watermark-image": "Stamp",
    "blur-image": "Drop",
    "image-color-picker": "Eyedropper",
    "image-metadata-viewer": "Info",
    "remove-image-background": "Eraser",
    "reduce-image-file-size": "Gauge",
    // Advanced
    "image-upscaler": "ArrowsOut",
    "image-grayscale": "Aperture",
    "image-brightness": "Sun",
    "image-contrast": "Sliders",
    "image-sharpen": "Sparkle",
    "image-thumbnail": "GridFour",
    "image-border": "FrameCorners",
    "image-to-base64": "Code",
    "svg-to-png": "FileCode",
    "heic-to-jpg": "FileJpg",
    "photo-collage-maker": "SquaresFour",
};

// Gradient per category — used for category header dots
export const CATEGORY_ACCENT: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    compression: {
        bg: "bg-violet-500/10",
        text: "text-violet-400",
        border: "border-violet-500/20",
        gradient: "from-violet-600 to-purple-700",
    },
    resize: {
        bg: "bg-sky-500/10",
        text: "text-sky-400",
        border: "border-sky-500/20",
        gradient: "from-sky-500 to-cyan-600",
    },
    conversion: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500 to-teal-600",
    },
    utilities: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-500 to-orange-600",
    },
    advanced: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-500 to-pink-600",
    },
};
