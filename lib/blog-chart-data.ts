// Data for in-article chart/table images, rendered on-demand via
// app/blog/[slug]/image/[key]/route.tsx (next/og ImageResponse — same
// pattern as the opengraph-image.tsx routes, themed to match article content
// instead of the social-share cards).
//
// Numbers here are pulled directly from the matching post's own content —
// keep them in sync if the article copy changes.

export interface ChartBar {
    label: string;
    value: number;
    displayValue: string;
    highlight?: boolean;
}

export interface BarChartConfig {
    type: "bar";
    title: string;
    subtitle?: string;
    bars: ChartBar[];
}

export interface TableRow {
    label: string;
    cols: string[];
}

export interface TableChartConfig {
    type: "table";
    title: string;
    subtitle?: string;
    /** Header label for the row-label column (first column). */
    rowHeader: string;
    columns: string[];
    rows: TableRow[];
}

export interface StepsChartConfig {
    type: "steps";
    title: string;
    subtitle?: string;
    steps: string[];
}

export type ChartConfig = BarChartConfig | TableChartConfig | StepsChartConfig;

export const BLOG_CHART_DATA: Record<string, Record<string, ChartConfig>> = {
    "webp-vs-jpg-vs-png-which-format-is-best": {
        "format-comparison": {
            type: "bar",
            title: "File Size — Same 1200×628px Photo",
            subtitle: "Real-world export at equivalent visual quality",
            bars: [
                { label: "PNG", value: 1100, displayValue: "1.1 MB" },
                { label: "JPEG", value: 280, displayValue: "280 KB" },
                { label: "WebP", value: 195, displayValue: "195 KB", highlight: true },
            ],
        },
    },
    "best-free-online-image-compressor-2026": {
        "compressor-comparison": {
            type: "bar",
            title: "Compressed Output — 1.2 MB Test Photo",
            subtitle: "Same source image, each tool's default settings",
            bars: [
                { label: "iLoveIMG", value: 420, displayValue: "420 KB · −65%" },
                { label: "TinyPNG", value: 390, displayValue: "390 KB · −68%" },
                { label: "Squoosh", value: 280, displayValue: "280 KB · −77%" },
                { label: "PixlTools", value: 280, displayValue: "280 KB · −77%", highlight: true },
            ],
        },
    },
    "compress-image-for-passport-visa-application": {
        "size-by-dimension": {
            type: "bar",
            title: "Typical JPEG Size at Quality 80",
            subtitle: "Midpoint of the observed range per dimension",
            bars: [
                { label: "200×200px", value: 17, displayValue: "10–25 KB" },
                { label: "400×400px", value: 52, displayValue: "35–70 KB" },
                { label: "600×800px", value: 90, displayValue: "60–120 KB" },
            ],
        },
    },
    "how-to-resize-images-for-social-media-2026": {
        "instagram-sizes": {
            type: "table",
            title: "Instagram Image Sizes 2026",
            rowHeader: "Format",
            columns: ["Dimensions", "Ratio"],
            rows: [
                { label: "Square post", cols: ["1080×1080px", "1:1"] },
                { label: "Portrait post", cols: ["1080×1350px", "4:5"] },
                { label: "Landscape post", cols: ["1080×566px", "1.91:1"] },
                { label: "Story / Reel", cols: ["1080×1920px", "9:16"] },
                { label: "Profile picture", cols: ["320×320px", "1:1"] },
            ],
        },
    },
    "compress-image-for-linkedin": {
        "linkedin-sizes": {
            type: "table",
            title: "LinkedIn Image Sizes 2026",
            rowHeader: "Image Type",
            columns: ["Recommended Size", "Max File"],
            rows: [
                { label: "Profile photo", cols: ["400×400px", "8 MB"] },
                { label: "Background banner", cols: ["1584×396px", "8 MB"] },
                { label: "Post image", cols: ["1200×627px", "5 MB"] },
                { label: "Post image (square)", cols: ["1080×1080px", "5 MB"] },
                { label: "Article cover", cols: ["744×400px", "10 MB"] },
            ],
        },
    },
    "best-image-formats-for-websites": {
        "format-comparison": {
            type: "table",
            title: "Image Format Comparison",
            rowHeader: "Format",
            columns: ["Compression", "Transparency", "Best Use Case"],
            rows: [
                { label: "JPEG", cols: ["Lossy", "No", "Photos"] },
                { label: "PNG", cols: ["Lossless", "Yes", "Graphics/UI"] },
                { label: "WebP", cols: ["Both", "Yes", "All web images"] },
                { label: "SVG", cols: ["Vector", "Yes", "Icons/logos"] },
            ],
        },
    },
    "how-to-upscale-images-without-losing-quality": {
        "upscaling-scenarios": {
            type: "table",
            title: "When to Use Upscaling",
            rowHeader: "Scenario",
            columns: ["Best Approach"],
            rows: [
                { label: "Enlarging a photo for print", cols: ["AI upscaling (2–4×)"] },
                { label: "Making a small logo pixel-sharp", cols: ["SVG conversion"] },
                { label: "Improving a blurry old photo", cols: ["AI upscaling"] },
                { label: "Web display at 2× for Retina", cols: ["Traditional 2× resize"] },
            ],
        },
    },
    "how-to-convert-pdf-to-jpg-online-free": {
        "use-cases": {
            type: "table",
            title: "Common PDF ↔ Image Use Cases",
            rowHeader: "Scenario",
            columns: ["Tool"],
            rows: [
                { label: "Share a PDF slide as an image", cols: ["PDF to JPG"] },
                { label: "Submit a photo as a PDF application", cols: ["Image to PDF"] },
                { label: "Extract a chart from a report", cols: ["PDF to PNG"] },
                { label: "Combine scanned images into one file", cols: ["Image to PDF"] },
            ],
        },
    },
    "how-to-reduce-photo-size-in-kb": {
        "format-comparison": {
            type: "table",
            title: "Format Comparison for a 1080×1080 Photo",
            rowHeader: "Format",
            columns: ["Best For", "Typical Size", "Transparency"],
            rows: [
                { label: "JPEG quality 80", cols: ["Photos", "150–300 KB", "No"] },
                { label: "PNG", cols: ["Graphics, logos", "500 KB–2 MB", "Yes"] },
                { label: "WebP quality 80", cols: ["Any web image", "90–180 KB", "Yes"] },
            ],
        },
    },
    "how-to-convert-jpg-to-pdf-free": {
        "tool-comparison": {
            type: "table",
            title: "JPG to PDF: Tool Comparison",
            rowHeader: "Feature",
            columns: ["PixlTools", "Desktop Software", "Mobile Apps"],
            rows: [
                { label: "Price", cols: ["Free", "$20–$200/yr", "Often freemium"] },
                { label: "No signup", cols: ["Yes", "No", "No"] },
                { label: "No watermarks", cols: ["Yes", "Yes", "Often watermarked"] },
                { label: "Works on mobile", cols: ["Yes", "No", "Yes"] },
                { label: "Batch convert", cols: ["One at a time", "Yes", "Yes"] },
            ],
        },
    },
    "how-to-crop-an-image-online-free": {
        "crop-dimensions": {
            type: "table",
            title: "Common Crop Dimensions",
            rowHeader: "Platform",
            columns: ["Dimensions", "Aspect Ratio"],
            rows: [
                { label: "Instagram square", cols: ["1080×1080px", "1:1"] },
                { label: "Instagram portrait", cols: ["1080×1350px", "4:5"] },
                { label: "YouTube thumbnail", cols: ["1280×720px", "16:9"] },
                { label: "Facebook post", cols: ["1200×630px", "1.91:1"] },
                { label: "Twitter header", cols: ["1500×500px", "3:1"] },
            ],
        },
    },
    "image-file-formats-explained": {
        "format-comparison": {
            type: "table",
            title: "Image Format Comparison",
            rowHeader: "Format",
            columns: ["Compression", "Transparency", "Animation", "Best For"],
            rows: [
                { label: "JPEG", cols: ["Lossy", "No", "No", "Photos"] },
                { label: "PNG", cols: ["Lossless", "Yes", "No", "Graphics"] },
                { label: "WebP", cols: ["Both", "Yes", "Yes", "Everything"] },
                { label: "SVG", cols: ["Vector", "Yes", "Yes", "Icons/logos"] },
                { label: "AVIF", cols: ["Lossy", "Yes", "No", "Next-gen photos"] },
                { label: "GIF", cols: ["Lossy", "Partial", "Yes", "Avoid"] },
            ],
        },
    },
    "how-to-convert-png-to-jpg-free": {
        "quality-settings": {
            type: "table",
            title: "Quality Settings Explained",
            rowHeader: "Quality",
            columns: ["File Size Reduction", "Visual Quality"],
            rows: [
                { label: "100", cols: ["~10%", "Identical to PNG"] },
                { label: "90", cols: ["~40%", "Excellent"] },
                { label: "80", cols: ["~65%", "Very good (recommended)"] },
                { label: "70", cols: ["~75%", "Good, slight artifacts"] },
                { label: "60", cols: ["~80%", "Noticeable compression"] },
            ],
        },
    },
    "avif-vs-webp-which-is-better": {
        "format-comparison": {
            type: "table",
            title: "AVIF vs WebP vs JPEG vs PNG",
            rowHeader: "Feature",
            columns: ["AVIF", "WebP", "JPEG", "PNG"],
            rows: [
                { label: "Compression efficiency", cols: ["Best", "Very good", "Good", "Poor for photos"] },
                { label: "Browser support", cols: ["90%", "95%", "100%", "100%"] },
                { label: "Transparency", cols: ["Yes", "Yes", "No", "Yes"] },
                { label: "Animation", cols: ["Yes", "Yes", "No", "No"] },
                { label: "Encoding speed", cols: ["Slow", "Fast", "Fast", "Fast"] },
                { label: "HDR support", cols: ["Yes", "Limited", "No", "No"] },
            ],
        },
    },
    "how-to-reduce-image-file-size-on-iphone": {
        "target-sizes": {
            type: "table",
            title: "Target File Sizes by Use Case",
            rowHeader: "Use Case",
            columns: ["Target Size", "Method"],
            rows: [
                { label: "Email attachment", cols: ["Under 1 MB", "Compress at quality 80"] },
                { label: "Government form", cols: ["Under 200 KB", "Resize + compress"] },
                { label: "WhatsApp photo", cols: ["Under 300 KB", "Resize to 1600px wide"] },
                { label: "Instagram post", cols: ["Under 1 MB", "Resize to 1080px"] },
                { label: "Website upload", cols: ["Under 500 KB", "WebP format"] },
            ],
        },
    },
    "how-to-batch-process-images-without-photoshop": {
        "method-comparison": {
            type: "table",
            title: "Choosing the Right Batch Method",
            rowHeader: "Method",
            columns: ["Platform", "Skill Level"],
            rows: [
                { label: "PixlTools online", cols: ["Any browser", "Beginner"] },
                { label: "IrfanView", cols: ["Windows only", "Beginner"] },
                { label: "GIMP Script-Fu", cols: ["Win/Mac/Linux", "Intermediate"] },
                { label: "ImageMagick", cols: ["Win/Mac/Linux", "Advanced"] },
                { label: "Sharp CLI", cols: ["Win/Mac/Linux", "Developer"] },
                { label: "XnConvert", cols: ["Win/Mac/Linux", "Beginner"] },
            ],
        },
    },
    "how-to-compress-images-for-email": {
        "quality-settings": {
            type: "table",
            title: "Quality Setting for a 3MP Email Photo",
            rowHeader: "Quality",
            columns: ["Typical Output Size", "Verdict"],
            rows: [
                { label: "90", cols: ["1.2–2.5 MB", "Too large for multiple attachments"] },
                { label: "80", cols: ["600 KB–1.2 MB", "Good for single photos"] },
                { label: "75", cols: ["400–800 KB", "Ideal for 2–4 attachments"] },
                { label: "65", cols: ["200–450 KB", "Best for 5+ photos"] },
                { label: "50", cols: ["150–300 KB", "Noticeable quality drop"] },
            ],
        },
    },
    "how-to-compress-image-to-100kb": {
        "size-reference": {
            type: "table",
            title: "Target Size Reference Table",
            rowHeader: "Dimensions",
            columns: ["Quality 80", "Quality 70", "Quality 60"],
            rows: [
                { label: "600×600px", cols: ["120–200 KB", "80–130 KB", "55–90 KB"] },
                { label: "400×400px", cols: ["60–100 KB", "40–70 KB", "28–50 KB"] },
                { label: "300×300px", cols: ["35–60 KB", "22–40 KB", "15–28 KB"] },
                { label: "200×200px", cols: ["15–28 KB", "10–18 KB", "7–13 KB"] },
            ],
        },
    },
    "compress-image-below-50kb": {
        "size-by-dimension": {
            type: "bar",
            title: "Expected JPEG Size at Quality 80",
            subtitle: "50 KB target line — smaller dimensions stay safely under it",
            bars: [
                { label: "200×200px", value: 14, displayValue: "8–20 KB" },
                { label: "300×300px", value: 25, displayValue: "15–35 KB" },
                { label: "413×531px", value: 37, displayValue: "25–50 KB" },
                { label: "600×800px", value: 75, displayValue: "50–100 KB" },
                { label: "800×1000px", value: 115, displayValue: "80–150 KB" },
            ],
        },
    },
    "heic-to-jpg-converter-windows-11": {
        "method-comparison": {
            type: "table",
            title: "HEIC to JPG: Method Comparison",
            rowHeader: "Method",
            columns: ["Speed", "Batch?"],
            rows: [
                { label: "Online converter", cols: ["Fast", "Up to 5 at once"] },
                { label: "Microsoft HEIC Codec", cols: ["Medium", "One at a time"] },
                { label: "iCloud for Windows", cols: ["Automatic", "Unlimited"] },
                { label: "iPhone USB “Automatic”", cols: ["Automatic", "All photos"] },
            ],
        },
    },
    "webp-to-jpg-free-online": {
        "jpg-vs-png": {
            type: "table",
            title: "WebP → JPG or WebP → PNG?",
            rowHeader: "Content Type",
            columns: ["Use JPG", "Use PNG"],
            rows: [
                { label: "Photographs", cols: ["Best choice", "File size too large"] },
                { label: "Screenshots with text", cols: ["May blur text", "Sharp and lossless"] },
                { label: "Graphics / logos", cols: ["Artefacts on edges", "Better quality"] },
                { label: "Transparent background", cols: ["Loses transparency", "Preserves transparency"] },
                { label: "Email / WhatsApp sharing", cols: ["Best compatibility", "Also works"] },
            ],
        },
    },
    "compress-image-for-email-attachment": {
        "platform-limits": {
            type: "table",
            title: "Size Guidelines by Email Platform",
            rowHeader: "Provider",
            columns: ["Attachment Limit", "Safe Per-Image Target"],
            rows: [
                { label: "Gmail", cols: ["25 MB total", "Under 500 KB"] },
                { label: "Outlook / Hotmail", cols: ["20 MB total", "Under 400 KB"] },
                { label: "Yahoo Mail", cols: ["25 MB total", "Under 500 KB"] },
                { label: "iCloud Mail", cols: ["20 MB total", "Under 400 KB"] },
                { label: "Corporate / work email", cols: ["Often 10–15 MB", "Under 300 KB"] },
            ],
        },
    },
    "how-to-remove-image-background-for-free": {
        "steps": {
            type: "steps",
            title: "Remove a Background in 4 Steps",
            steps: [
                "Open the free Background Remover tool",
                "Upload your image (up to 10MB)",
                "AI automatically detects and removes the background",
                "Download as a transparent PNG",
            ],
        },
    },
    "how-to-add-watermark-to-images-online": {
        "steps": {
            type: "steps",
            title: "Add a Watermark in 4 Steps",
            steps: [
                "Upload your image",
                "Type your watermark text",
                "Choose position, size, and opacity",
                "Download your watermarked image",
            ],
        },
    },
    "how-to-make-image-smaller": {
        "steps": {
            type: "steps",
            title: "Make an Image Smaller in 4 Steps",
            steps: [
                "Open the Compress Image tool",
                "Upload your image",
                "Adjust quality to balance size vs. detail",
                "Download the smaller file",
            ],
        },
    },
    "core-web-vitals-image-optimization": {
        "steps": {
            type: "steps",
            title: "Measure Your Core Web Vitals Score",
            steps: [
                "Open pagespeed.web.dev",
                "Enter your page URL",
                "Check the Opportunities section for image-related fixes",
            ],
        },
    },
    "how-to-flip-an-image-online": {
        "steps": {
            type: "steps",
            title: "Flip an Image in 4 Steps",
            steps: [
                "Open the Flip Image tool",
                "Upload your image",
                "Choose horizontal or vertical flip",
                "Download your flipped image",
            ],
        },
    },
    "what-is-image-dpi-and-how-to-change-it": {
        "steps": {
            type: "steps",
            title: "Check an Image's DPI in 3 Steps",
            steps: [
                "Open the Image Metadata Viewer",
                "Upload your image",
                "Check Resolution / DPI in the EXIF data",
            ],
        },
    },
    "how-to-convert-image-to-black-and-white": {
        "steps": {
            type: "steps",
            title: "Convert to Black & White in 4 Steps",
            steps: [
                "Open the Grayscale Converter",
                "Upload your color image",
                "Click Process",
                "Download the black & white image",
            ],
        },
    },
    "how-to-compress-images-on-iphone-and-android": {
        "steps": {
            type: "steps",
            title: "Compress a Photo on Your Phone",
            subtitle: "Works in any mobile browser — Safari or Chrome",
            steps: [
                "Open Safari (iPhone) or Chrome (Android)",
                "Visit pixltools.com/compress-image",
                "Tap Upload and pick a photo",
                "Wait a few seconds for compression",
                "Tap Download to save it back",
            ],
        },
    },
    "how-to-resize-image-without-photoshop": {
        "steps": {
            type: "steps",
            title: "Resize an Image in 5 Steps",
            steps: [
                "Open the Image Resizer",
                "Upload your image",
                "Enter target width & height",
                "Lock aspect ratio to avoid distortion",
                "Click Resize and download",
            ],
        },
    },
    "how-to-convert-heic-to-jpg-on-iphone-and-mac": {
        "steps": {
            type: "steps",
            title: "Convert HEIC to JPG in 4 Steps",
            steps: [
                "Transfer the HEIC photo to your computer",
                "Open the HEIC to JPG converter",
                "Drag and drop your HEIC file",
                "Download your JPG instantly",
            ],
        },
    },
    "how-to-compress-image-for-whatsapp": {
        "steps": {
            type: "steps",
            title: "Compress a Photo for WhatsApp",
            steps: [
                "Open the Image Compressor",
                "Upload your photo",
                "Set quality to 85",
                "Download the compressed image",
                "Send it via WhatsApp as a Photo",
            ],
        },
    },
    "how-to-make-a-photo-collage-online-free": {
        "steps": {
            type: "steps",
            title: "Make a Photo Collage in 4 Steps",
            steps: [
                "Open the Photo Collage Maker",
                "Upload 2–16 photos",
                "Auto-arranged into a clean grid",
                "Download — no watermarks added",
            ],
        },
    },
    "how-to-compress-images-without-losing-quality": {
        "format-settings": {
            type: "table",
            title: "Best Compression Settings by Format",
            rowHeader: "Format",
            columns: ["Recommended Quality", "Note"],
            rows: [
                { label: "JPEG", cols: ["75–85", "Enable progressive JPEG for faster loading"] },
                { label: "PNG", cols: ["PNG-8 / PNG-24", "PNG-8 under 256 colors, PNG-24 only for transparency"] },
                { label: "WebP", cols: ["75–80", "25–35% smaller than JPEG at equal quality"] },
            ],
        },
    },
    "how-to-reduce-image-size-for-faster-websites": {
        "steps": {
            type: "steps",
            title: "6 Steps to a Faster Website",
            steps: [
                "Choose the right format (WebP / SVG)",
                "Resize to display dimensions",
                "Compress aggressively",
                "Enable lazy loading",
                "Use a CDN",
                "Implement caching",
            ],
        },
    },
    "best-image-size-for-blogs-and-social-media": {
        "blog-sizes": {
            type: "table",
            title: "Blog Image Sizes",
            rowHeader: "Type",
            columns: ["Dimensions"],
            rows: [
                { label: "Featured image", cols: ["1200×630px (16:9)"] },
                { label: "In-post images", cols: ["800px wide max"] },
                { label: "Thumbnails", cols: ["300×200px or 400×300px"] },
            ],
        },
    },
    "how-to-resize-images-for-web-complete-guide": {
        "resizing-methods": {
            type: "table",
            title: "Resizing Methods",
            rowHeader: "Method",
            columns: ["What It Does"],
            rows: [
                { label: "Fixed width", cols: ["Set width, height scales proportionally"] },
                { label: "Fixed height", cols: ["Set height, width scales proportionally"] },
                { label: "Custom dimensions", cols: ["Exact W×H — may crop or letterbox"] },
                { label: "Percentage scaling", cols: ["Scale by % of original size"] },
            ],
        },
    },
    "how-to-compress-image-below-20kb": {
        "steps": {
            type: "steps",
            title: "Compress an Image Below 20KB",
            steps: [
                "Resize to the required dimensions first",
                "Apply compression (quality 60–70)",
                "Check the file size",
            ],
        },
    },
    "best-image-size-for-wordpress": {
        "wp-sizes": {
            type: "table",
            title: "WordPress Image Size Recommendations",
            rowHeader: "Image Type",
            columns: ["Recommended Size", "File Size Target"],
            rows: [
                { label: "Featured image", cols: ["1200×628px", "Under 150 KB"] },
                { label: "In-post image", cols: ["800–1024px wide", "Under 100–200 KB"] },
                { label: "Header / hero", cols: ["1920×600–1080px", "Under 300 KB"] },
            ],
        },
    },
};

export function getChartConfig(slug: string, key: string): ChartConfig | undefined {
    return BLOG_CHART_DATA[slug]?.[key];
}

/** Fixed 1200-wide canvas; height depends on chart type/row count — keep in sync with the route's height calc. */
export function getChartDimensions(config: ChartConfig): { width: number; height: number } {
    const width = 1200;
    if (config.type === "bar") {
        return { width, height: 400 + config.bars.length * 90 };
    }
    if (config.type === "steps") {
        return { width, height: 320 + config.steps.length * 100 };
    }
    return { width, height: 260 + config.rows.length * 90 };
}
