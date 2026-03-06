/**
 * Maps every tool slug to a Lucide React icon component name.
 * Used by ToolCard, Navbar, and ToolLayout hero.
 */
export const TOOL_ICON_MAP: Record<string, string> = {
    "compress-image": "Minimize2",
    "compress-jpg": "FileImage",
    "compress-png": "FileImage",
    "compress-webp": "FileImage",
    "resize-image": "Maximize2",
    "crop-image": "Crop",
    "rotate-image": "RotateCcw",
    "flip-image": "FlipHorizontal2",
    "jpg-to-png": "ArrowLeftRight",
    "png-to-jpg": "ArrowLeftRight",
    "jpg-to-webp": "ArrowLeftRight",
    "webp-to-jpg": "ArrowLeftRight",
    "png-to-webp": "ArrowLeftRight",
    "webp-to-png": "ArrowLeftRight",
    "image-to-pdf": "FileText",
    "pdf-to-image": "FileImage",
    "watermark-image": "Stamp",
    "blur-image": "Layers",
    "image-color-picker": "Pipette",
    "image-metadata-viewer": "ScanSearch",
    "remove-image-background": "Scissors",
    "image-upscaler": "ZoomIn",
    "image-grayscale": "Eclipse",
    "image-brightness": "Sun",
    "image-contrast": "SunMedium",
    "image-sharpen": "focus",
    "image-thumbnail": "Image",
    "image-border": "Frame",
    "image-aspect-ratio": "Move",
    "reduce-image-file-size": "ArrowDownToLine",
};

// Color accent per category (Tailwind classes)
export const CATEGORY_ACCENT: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    compression: {
        bg: "bg-violet-50",
        text: "text-violet-600",
        border: "border-violet-100",
        gradient: "from-violet-500 to-purple-600",
    },
    resize: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        gradient: "from-blue-500 to-cyan-500",
    },
    conversion: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100",
        gradient: "from-emerald-500 to-teal-500",
    },
    utilities: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-100",
        gradient: "from-amber-500 to-orange-500",
    },
    advanced: {
        bg: "bg-rose-50",
        text: "text-rose-600",
        border: "border-rose-100",
        gradient: "from-rose-500 to-pink-600",
    },
};
