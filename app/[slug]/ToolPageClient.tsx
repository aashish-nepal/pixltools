"use client";
import ToolLayout from "@/components/tools/ToolLayout";
import type { ToolData } from "@/lib/tools-data";
import { useState, useCallback, useRef } from "react";
import { Loader2, Lock, Unlock } from "lucide-react";

interface Props { tool: ToolData; }

function getToolContent(slug: string) {
    const defaults = {
        description: ["This tool processes your image quickly and securely.", "Upload your image, process it, and download the result instantly.", "No signup required. Your files are deleted immediately after processing."],
        howToUse: ["Click the upload area or drag and drop your image.", "Adjust any settings if available.", "Click the Process button.", "Download your result."],
        benefits: ["100% free with no limits", "No signup required", "Files deleted immediately", "Works on all devices", "Fast processing", "High quality output"],
        faqs: [
            { question: "Is this tool free?", answer: "Yes, completely free with no hidden fees or signup required." },
            { question: "Is my image stored?", answer: "No. Your image is processed and immediately deleted from our servers." },
            { question: "What formats are supported?", answer: "JPG, PNG, and WEBP are supported by most tools." },
        ],
    };

    const map: Record<string, typeof defaults> = {
        "compress-image": {
            description: ["Reduce your image file size by up to 80% without noticeable quality loss. Our compressor uses advanced algorithms to find the perfect balance between file size and visual quality.", "Whether you need to compress photos for emailing, uploading to websites, or saving storage space, our tool delivers professional results in seconds.", "Simply upload your image, and our Sharp-powered compressor will optimize it automatically. Download the compressed result with a single click."],
            howToUse: ["Upload your JPG, PNG, or WEBP image by dragging it into the upload area or clicking to browse.", "The tool automatically compresses your image using optimal settings.", "Preview the compressed result side-by-side with the original.", "Click Download to save your compressed image."],
            benefits: ["Reduce file size up to 80%", "Preserve visual quality", "Supports JPG, PNG, WEBP", "No quality loss perceptible", "Instant compression", "Perfect for web uploads"],
            faqs: [
                { question: "How much can I compress an image?", answer: "Most images can be compressed 40–80% without noticeable quality loss, depending on the original content." },
                { question: "Will compression affect image quality?", answer: "Our smart compression preserves visual quality while reducing file size. At recommended settings, the difference is imperceptible." },
                { question: "What formats can I compress?", answer: "We support JPEG, PNG, and WEBP compression." },
                { question: "Is there a file size limit?", answer: "The maximum upload size is 10MB per image." },
            ],
        },
        "compress-jpg": {
            description: ["Compress JPEG images online for free. Our JPG compressor uses intelligent lossy compression to dramatically reduce file size while maintaining excellent visual quality.", "JPEG compression works by reducing color detail that the human eye is least sensitive to. Our tool applies the optimal quality setting for the best size-to-quality ratio.", "Perfect for reducing photo sizes before emailing, posting on social media, or uploading to websites."],
            howToUse: ["Upload your JPEG/JPG image.", "The compressor automatically optimizes your image.", "Preview the before and after sizes.", "Download your compressed JPG file."],
            benefits: ["Reduces JPG size up to 80%", "Smart quality optimization", "Maintains color accuracy", "Instant processing", "No signup needed", "Batch-ready workflow"],
            faqs: [
                { question: "What quality level is used?", answer: "We use quality 80 by default — imperceptibly different from the original but significantly smaller." },
                { question: "Can I compress a JPG multiple times?", answer: "Each compression degrades quality slightly. Compress once from the original for best results." },
                { question: "Does compressed JPG support transparency?", answer: "No — JPEG does not support transparency. Use PNG if you need transparent backgrounds." },
                { question: "How small can a JPG be compressed?", answer: "Typically 40–75% smaller than the original, depending on image content and detail." },
            ],
        },
        "compress-png": {
            description: ["Compress PNG images online without losing transparency. PNG lossless compression reduces file size without removing any pixel data.", "Our tool uses advanced PNG optimization to eliminate redundant data and apply efficient encoding, typically reducing sizes by 20–50%.", "Ideal for screenshots, graphics, logos, and any image requiring transparency preservation."],
            howToUse: ["Upload your PNG image.", "Our tool applies lossless PNG optimization.", "Preview the size reduction.", "Download your optimized PNG."],
            benefits: ["Lossless — zero quality loss", "Preserves transparency/alpha", "Reduces PNG size 20–50%", "Perfect for logos & graphics", "Fast processing", "No signup required"],
            faqs: [
                { question: "Does PNG compression lose quality?", answer: "No. We use lossless compression that preserves every pixel exactly." },
                { question: "Will transparency be preserved?", answer: "Yes, all alpha channel transparency is fully preserved." },
                { question: "Why are PNG files larger than JPEG?", answer: "PNG uses lossless compression, while JPEG uses lossy compression. Convert to WEBP for the best of both worlds." },
                { question: "How much smaller will my PNG be?", answer: "Typically 20–50% smaller, depending on the image content and original compression." },
            ],
        },
        "compress-webp": {
            description: ["Compress WEBP images online for free. WEBP's modern compression algorithm supports both lossy and lossless modes, making it the most versatile web image format.", "Our compressor reduces WEBP file sizes while maintaining the excellent quality WEBP is known for — smaller than equivalent JPEG or PNG files.", "Ideal for web developers optimizing images for faster page loads and better Core Web Vitals scores."],
            howToUse: ["Upload your WEBP image.", "Compression is applied automatically.", "Compare original and compressed sizes.", "Download your compressed WEBP."],
            benefits: ["Best compression ratio available", "Supports transparency", "Modern web standard", "Smaller than JPEG/PNG", "Instant processing", "Free forever"],
            faqs: [
                { question: "Is WEBP better than JPEG for compression?", answer: "Yes — WEBP achieves 25–35% smaller file sizes than JPEG at equivalent visual quality." },
                { question: "Do all browsers support WEBP?", answer: "Yes, all modern browsers (Chrome, Firefox, Safari 14+, Edge) support WEBP." },
                { question: "Does WEBP support transparency?", answer: "Yes, WEBP supports full transparency including alpha channels." },
                { question: "Can I convert WEBP to JPEG after compression?", answer: "Yes, use our WEBP to JPG converter for that." },
            ],
        },
        "resize-image": {
            description: ["Resize images to any dimension you need. Set exact pixel dimensions, scale by percentage, or choose from preset sizes for social media, web, and print.", "Our resize tool uses high-quality Lanczos resampling to ensure sharp, clear results at any size — no blurry or pixelated output.", "Resize images for Instagram, Facebook, Twitter, YouTube thumbnails, blog posts, emails, and more."],
            howToUse: ["Upload your image.", "Enter the target width and/or height in pixels.", "Toggle 'Maintain Aspect Ratio' to avoid distortion.", "Click Resize and download your resized image."],
            benefits: ["Exact pixel dimensions", "Maintain aspect ratio option", "High-quality resampling", "Supports all major formats", "Fast and free", "Perfect for social media"],
            faqs: [
                { question: "Will resizing distort my image?", answer: "Enable 'Maintain Aspect Ratio' to resize proportionally without any distortion." },
                { question: "Can I make an image larger?", answer: "Yes, but upscaling beyond the original resolution may reduce sharpness." },
                { question: "What is the maximum output size?", answer: "You can resize to any dimensions up to 10,000×10,000 pixels." },
                { question: "What resampling method is used?", answer: "We use Lanczos resampling for maximum sharpness and quality." },
            ],
        },
        "crop-image": {
            description: ["Crop images to any dimensions or aspect ratio online. Remove unwanted areas from photos to highlight the important parts.", "Our crop tool lets you set exact crop coordinates or choose from preset ratios like 1:1 (square), 16:9 (widescreen), 4:3, and more.", "Perfect for creating product thumbnails, social media posts, profile pictures, and banner images."],
            howToUse: ["Upload your image.", "Enter crop coordinates: left, top, width, and height in pixels.", "Preview how the crop will look.", "Download your cropped image."],
            benefits: ["Precise pixel-level control", "Preset aspect ratios", "High quality output", "All formats supported", "Instant preview", "Free to use"],
            faqs: [
                { question: "Can I crop to a specific aspect ratio?", answer: "Yes, choose from 1:1, 16:9, 4:3, and other presets, or enter custom dimensions." },
                { question: "Will cropping reduce image quality?", answer: "No — cropping is lossless. Only the unwanted area is removed; the remaining pixels are unchanged." },
                { question: "What units are used for crop dimensions?", answer: "All dimensions are in pixels." },
                { question: "Can I crop PNG images with transparency?", answer: "Yes, transparency is fully preserved after cropping." },
            ],
        },
        "rotate-image": {
            description: ["Rotate images online to any angle. Fix portrait/landscape orientation issues, or apply creative rotations for artistic effect.", "Our rotate tool supports 90°, 180°, and 270° rotation as well as any custom angle from 0–360°. Rotations are applied losslessly wherever possible.", "Fix photos taken sideways on your phone, rotate scanned documents, or create angled photo effects in seconds."],
            howToUse: ["Upload your image.", "Select a rotation angle: 90°, 180°, 270°, or enter a custom angle.", "Click Rotate to process.", "Download your rotated image."],
            benefits: ["90°, 180°, 270° presets", "Custom angle support", "High quality output", "All formats supported", "Instant processing", "Free forever"],
            faqs: [
                { question: "Can I rotate to any angle?", answer: "Yes, enter any angle from 0–360 degrees for custom rotation." },
                { question: "What happens to empty corners after rotation?", answer: "For non-right-angle rotations, empty corners are filled with black or white background." },
                { question: "Does rotating a JPEG lose quality?", answer: "Right-angle rotations (90°, 180°, 270°) are lossless for JPEG. Custom angles re-encode the image." },
                { question: "Can I rotate PNG images?", answer: "Yes, all supported formats including PNG with transparency can be rotated." },
            ],
        },
        "flip-image": {
            description: ["Flip images horizontally or vertically online for free. Create mirror images of photos instantly without any software.", "Horizontal flipping (left-right mirror) and vertical flipping (upside-down) are both supported. The operation is lossless and preserves full image quality.", "Useful for creating symmetric compositions, fixing mirrored text in photos, and artistic image manipulation."],
            howToUse: ["Upload your image.", "Choose Flip Horizontal (mirror left-right) or Flip Vertical (upside-down).", "The flip is applied instantly.", "Download your flipped image."],
            benefits: ["Horizontal & vertical flip", "Lossless processing", "Instant result", "All formats supported", "No software needed", "Free to use"],
            faqs: [
                { question: "What is the difference between flip and rotate?", answer: "Flipping creates a mirror image. Rotating turns the image by an angle without mirroring." },
                { question: "Does flipping degrade image quality?", answer: "No — flipping is a lossless geometric transformation." },
                { question: "Can I flip a PNG with transparency?", answer: "Yes, transparency is fully preserved when flipping PNG images." },
                { question: "Can I flip just part of an image?", answer: "This tool flips the entire image. Use crop first if you need to flip a portion." },
            ],
        },
        "jpg-to-png": {
            description: ["Convert JPEG images to PNG format online for free. PNG output preserves every detail and adds transparency support not available in JPEG.", "Converting from JPG to PNG is ideal when you need to add a transparent layer, edit the image further without quality loss, or use it in a context requiring lossless quality.", "The conversion is instant and completely free — no watermarks, no limits."],
            howToUse: ["Upload your JPG or JPEG image.", "Conversion to PNG happens automatically.", "Preview the converted image.", "Download your PNG file."],
            benefits: ["Full lossless PNG output", "Transparency support added", "Perfect for further editing", "No quality reduction", "Instant conversion", "Free forever"],
            faqs: [
                { question: "Will converting JPG to PNG improve quality?", answer: "No — the PNG will be the same visual quality as the JPG. PNG prevents further quality loss in future edits." },
                { question: "Why is the PNG larger than the JPG?", answer: "PNG uses lossless compression, which is inherently larger for photographic content than lossy JPEG." },
                { question: "Does the PNG have a transparent background?", answer: "No, the original JPG content is preserved. JPG doesn't have transparency to transfer." },
                { question: "Can I convert multiple images at once?", answer: "Currently one image at a time is supported." },
            ],
        },
        "png-to-jpg": {
            description: ["Convert PNG images to JPEG format online. JPEG is universally compatible and produces much smaller file sizes for photographic content.", "Converting PNG to JPG is useful when you need to reduce file size for email, social media, or web use, and your image doesn't need transparency.", "Our converter produces high-quality JPEG output with an intelligent quality setting that balances size and visual fidelity."],
            howToUse: ["Upload your PNG image.", "Conversion to JPEG is applied automatically.", "Preview the JPEG output.", "Download your JPG file."],
            benefits: ["Much smaller file size", "Universal compatibility", "High quality JPEG output", "Fast conversion", "No watermarks", "Free forever"],
            faqs: [
                { question: "Will I lose the transparent background?", answer: "Yes — JPEG doesn't support transparency. Transparent areas are replaced with white." },
                { question: "How much smaller will the JPG be?", answer: "Typically 40–80% smaller than the PNG, depending on image content." },
                { question: "Is PNG to JPG conversion lossy?", answer: "Yes — JPEG uses lossy compression. Keep the original PNG if you need lossless quality." },
                { question: "What quality level is the output JPEG?", answer: "We use quality 85, providing excellent visual quality with significant size reduction." },
            ],
        },
        "jpg-to-webp": {
            description: ["Convert JPEG images to WEBP format for superior web performance. WEBP achieves 25–35% smaller file sizes than JPEG at equivalent quality.", "WEBP is supported by all modern browsers and is recommended by Google as the ideal web image format for faster page loads and better SEO.", "Converting your JPG library to WEBP is one of the most impactful optimizations for website performance."],
            howToUse: ["Upload your JPG image.", "Conversion to WEBP is processed automatically.", "Compare the file sizes.", "Download your WEBP file."],
            benefits: ["25–35% smaller than JPEG", "Better quality retention", "All modern browsers supported", "Boost page speed scores", "Instant conversion", "Free forever"],
            faqs: [
                { question: "Is WEBP better than JPEG?", answer: "Yes — WEBP offers better compression and quality than JPEG in most scenarios." },
                { question: "Do all browsers support WEBP?", answer: "All modern browsers support WEBP. For older browsers, keep JPG fallbacks." },
                { question: "Will WEBP improve my Lighthouse score?", answer: "Yes — Google PageSpeed strongly recommends serving images in WEBP format." },
                { question: "Can I convert back from WEBP to JPG?", answer: "Yes — use our WEBP to JPG converter." },
            ],
        },
        "webp-to-jpg": {
            description: ["Convert WEBP images to JPEG for maximum compatibility. While WEBP is excellent for web use, some apps, email clients, and devices don't yet support it.", "Our WEBP to JPG converter produces high-quality JPEG output that works on every device, email client, and app.", "Quickly convert WEBP files for use in Word documents, email attachments, older image editors, or any system that doesn't support WEBP."],
            howToUse: ["Upload your WEBP image.", "Conversion to JPEG is processed automatically.", "Preview the JPEG output.", "Download your JPG file."],
            benefits: ["Universal JPEG compatibility", "High quality output", "Works everywhere", "Instant conversion", "No signup needed", "Free forever"],
            faqs: [
                { question: "Why convert WEBP to JPG?", answer: "For compatibility with apps, email clients, and older systems that don't support WEBP." },
                { question: "Will the JPG be larger than the WEBP?", answer: "Usually yes — JPEG is less efficient than WEBP in terms of compression." },
                { question: "Is quality preserved in the conversion?", answer: "We use quality 90 for JPEG output to preserve as much visual quality as possible." },
                { question: "Does WEBP support transparency?", answer: "Yes, but JPEG doesn't — transparent areas will be filled with white." },
            ],
        },
        "png-to-webp": {
            description: ["Convert PNG to WEBP for smaller file sizes with transparency support. WEBP lossless is typically 26% smaller than PNG while preserving every pixel.", "This conversion is ideal for web graphics, logos, and UI elements that need transparency but also need to be as small as possible.", "WEBP supports both transparency and animation, making it the future-proof replacement for PNG on the web."],
            howToUse: ["Upload your PNG image.", "Converted to WEBP with lossless compression automatically.", "Preview the size reduction.", "Download your WEBP file."],
            benefits: ["26% smaller than PNG lossless", "Transparency preserved", "Better for web performance", "Lossless quality option", "Fast conversion", "Free to use"],
            faqs: [
                { question: "Will PNG transparency be preserved in WEBP?", answer: "Yes — WEBP supports full alpha channel transparency." },
                { question: "Is the WEBP output lossless?", answer: "We use lossless WEBP compression for PNG inputs to preserve pixel-perfect quality." },
                { question: "Is WEBP supported on all browsers?", answer: "All modern browsers support WEBP. Safari has supported it since version 14." },
                { question: "How much smaller will the WEBP be?", answer: "Typically 25–35% smaller than the equivalent PNG." },
            ],
        },
        "webp-to-png": {
            description: ["Convert WEBP images to PNG format for lossless compatibility. PNG is universally supported on all devices and software.", "WEBP to PNG conversion is useful when you need to use images in applications that don't support WEBP, like older design tools, Microsoft Office, or certain CMS platforms.", "The output PNG preserves full quality including transparency if present in the original WEBP."],
            howToUse: ["Upload your WEBP image.", "Converted to PNG automatically.", "Preview the converted image.", "Download your PNG file."],
            benefits: ["Universal PNG compatibility", "Lossless quality preserved", "Transparency retained", "Works in all apps", "Instant conversion", "Free forever"],
            faqs: [
                { question: "Why convert WEBP to PNG?", answer: "For use in apps and systems that don't support WEBP, including older software and some design tools." },
                { question: "Will transparency be preserved?", answer: "Yes — if the WEBP has transparency, it will be preserved in the PNG output." },
                { question: "Will the PNG be larger?", answer: "Yes — PNG uses lossless compression, which is inherently larger for complex images." },
                { question: "Is quality preserved perfectly?", answer: "Yes — if the WEBP was lossless, the PNG output is pixel-perfect." },
            ],
        },
        "image-to-pdf": {
            description: ["Convert images to PDF documents online for free. Turn any JPG, PNG, or WEBP image into a professional PDF file in seconds.", "Image to PDF conversion is essential for creating document archives, sending images via email as PDFs, or assembling visual portfolios.", "Our converter produces a clean PDF with your image perfectly sized to the page — no extra white space, no distortion."],
            howToUse: ["Upload your image (JPG, PNG, or WEBP).", "The image is automatically embedded into a PDF document.", "Preview the PDF thumbnail.", "Download your PDF file."],
            benefits: ["JPG, PNG, WEBP to PDF", "Clean professional output", "Perfect for documents", "No watermarks", "Instant conversion", "Free forever"],
            faqs: [
                { question: "What size is the output PDF?", answer: "The PDF is sized to A4 (210×297mm) by default with your image scaled to fit." },
                { question: "Can I convert multiple images to one PDF?", answer: "Currently one image per PDF is supported." },
                { question: "Is the output PDF searchable?", answer: "No — the PDF contains the image only, not searchable text." },
                { question: "What quality is the image in the PDF?", answer: "The original image quality is preserved in the PDF." },
            ],
        },
        "pdf-to-image": {
            description: ["Convert PDF pages to images online for free. Extract any page from a PDF and save it as a high-quality JPEG or PNG image.", "PDF to image conversion is useful for creating thumbnails of PDF documents, extracting diagrams or charts, and sharing PDF content on image-only platforms.", "Upload your PDF and instantly download the first page as an image."],
            howToUse: ["Upload your PDF file.", "The first page is automatically converted to an image.", "Preview the image output.", "Download your JPEG image."],
            benefits: ["High quality output", "Fast PDF rendering", "No software required", "Works with any PDF", "Instant processing", "Free to use"],
            faqs: [
                { question: "Which page of the PDF is converted?", answer: "Currently the first page is converted. Multi-page support coming soon." },
                { question: "What resolution is the output image?", answer: "The output is rendered at 150 DPI by default, producing a clear, high-quality image." },
                { question: "Can I convert password-protected PDFs?", answer: "No — only unprotected PDFs are supported." },
                { question: "What format is the output?", answer: "The output is a JPEG image. PNG output is available in the settings." },
            ],
        },
        "watermark-image": {
            description: ["Add text watermarks to your images online for free. Protect your photos and graphics from unauthorized use with custom text overlays.", "Our watermark tool lets you position text anywhere on your image, set opacity, and choose font size to create professional watermarks.", "Perfect for photographers, content creators, and businesses protecting their visual content."],
            howToUse: ["Upload your image.", "Enter your watermark text.", "Adjust opacity and position if needed.", "Download your watermarked image."],
            benefits: ["Custom text watermarks", "Adjustable opacity", "Protect your content", "All formats supported", "Instant processing", "Free forever"],
            faqs: [
                { question: "Can I add a logo watermark?", answer: "Currently text watermarks are supported. Image watermark support is coming soon." },
                { question: "Can I change the watermark position?", answer: "Yes, choose from bottom-right, center, and other preset positions." },
                { question: "Will the watermark be permanent?", answer: "Yes — the watermark is baked into the output image." },
                { question: "What font is used?", answer: "We use a clean sans-serif font for maximum readability." },
            ],
        },
        "blur-image": {
            description: ["Apply Gaussian blur effects to images online for free. Blur photos to hide sensitive information, create artistic depth-of-field effects, or build overlays.", "Our blur tool uses Sharp's Gaussian blur algorithm, which produces natural-looking, smooth blur without artifacts.", "Adjust the blur strength from subtle softening to extreme blur — perfect for backgrounds, privacy protection, and creative photography."],
            howToUse: ["Upload your image.", "Set the blur strength (sigma value).", "Click Blur to apply.", "Download your blurred image."],
            benefits: ["Natural Gaussian blur", "Adjustable blur strength", "Great for privacy", "Artistic background blur", "Instant processing", "Free to use"],
            faqs: [
                { question: "What is sigma in blur settings?", answer: "Sigma controls the blur radius. Higher values = more blur. Sigma 3 is subtle, sigma 10 is very blurry." },
                { question: "Can I blur only part of an image?", answer: "This tool blurs the entire image. Use crop + blur separately for partial effects." },
                { question: "What does Gaussian blur mean?", answer: "Gaussian blur applies a mathematical filter that softens edges and details in a natural way." },
                { question: "Can blurred images be un-blurred?", answer: "No — blurring is a destructive operation. Always keep the original." },
            ],
        },
        "image-color-picker": {
            description: ["Extract dominant colors and color palettes from any image online. Get hex codes, RGB values, and percentage coverage for the most prominent colors in your image.", "Our color picker analyzes your image and identifies the top 10 most dominant colors, making it perfect for brand color extraction, design inspiration, and creative projects.", "Upload any photo and instantly see its color DNA displayed as beautiful swatches with hex codes ready to copy."],
            howToUse: ["Upload your image.", "Our tool analyzes the pixel data automatically.", "View the extracted color palette with hex codes.", "Copy any color code to use in your projects."],
            benefits: ["Extract dominant colors", "Hex and RGB values", "Design inspiration tool", "Brand color extraction", "Instant analysis", "Free forever"],
            faqs: [
                { question: "How many colors are extracted?", answer: "We display the top 10 most dominant colors in your image." },
                { question: "Can I get exact hex codes?", answer: "Yes — each color swatch shows the exact hex code for easy copying." },
                { question: "What image formats are supported?", answer: "JPG, PNG, and WEBP images are all supported." },
                { question: "Is this useful for brand guidelines?", answer: "Yes — it's perfect for extracting brand colors from existing logos or photos." },
            ],
        },
        "image-metadata-viewer": {
            description: ["View hidden metadata stored inside your images. EXIF data can contain camera settings, GPS location, date/time, and much more.", "Our metadata viewer extracts all available EXIF, IPTC, and XMP data from your images, displaying it in a clear, organized format.", "Essential for photographers who want to review camera settings, privacy-conscious users wanting to check what info their photos contain, and developers working with image data."],
            howToUse: ["Upload your image.", "All available metadata is extracted automatically.", "Browse camera settings, GPS, dates, and technical details.", "Download or copy the metadata as needed."],
            benefits: ["Full EXIF data display", "GPS location info", "Camera settings revealed", "Copyright info", "Date/time metadata", "Privacy check tool"],
            faqs: [
                { question: "What is EXIF data?", answer: "EXIF (Exchangeable Image File Format) is metadata embedded by cameras and phones containing settings like aperture, shutter speed, GPS, and date." },
                { question: "Do all images have EXIF data?", answer: "No — some images have metadata stripped. This is common for images downloaded from social media." },
                { question: "Can photos contain GPS location in metadata?", answer: "Yes — phone photos often contain precise GPS coordinates in EXIF data unless location is disabled." },
                { question: "Can I remove metadata from my images?", answer: "Our metadata stripper tool coming soon. For now, use our compress tool which strips metadata." },
            ],
        },
        "remove-image-background": {
            description: ["Remove image backgrounds automatically online for free. Our tool detects and removes solid or near-solid color backgrounds, producing a transparent PNG output.", "Background removal is essential for product photography, creating stickers, compositing images, and professional presentations.", "Upload your image and download a clean transparent PNG ready for any background."],
            howToUse: ["Upload your JPG or PNG image.", "Background detection runs automatically.", "Preview the transparent result.", "Download your PNG with transparent background."],
            benefits: ["Automatic background removal", "Transparent PNG output", "Great for products", "No manual selection", "Instant processing", "Free to use"],
            faqs: [
                { question: "What backgrounds work best?", answer: "Solid colored backgrounds (white, black, green screen) produce the best results with this tool." },
                { question: "Why is the result a PNG?", answer: "PNG supports transparency. JPEG cannot store transparent pixels." },
                { question: "Does it work on complex backgrounds?", answer: "Best results are with solid or near-solid backgrounds. Complex backgrounds may require edge refinement." },
                { question: "Is AI used for background removal?", answer: "We use Sharp's masking algorithms optimized for common background colors. AI-based removal coming soon." },
            ],
        },
        "image-upscaler": {
            description: ["Increase image resolution online for free. Upscale small or low-resolution images to larger dimensions using Lanczos resampling for sharp, clean results.", "Our upscaler can increase image dimensions up to 4x the original size, making small images usable for print, presentations, and high-resolution displays.", "Ideal for upscaling old photos, small graphics, thumbnails, and low-res images for print use."],
            howToUse: ["Upload your image.", "Select upscale factor: 2x, 3x, or 4x.", "Processing produces a sharper enlarged image.", "Download your upscaled image."],
            benefits: ["2x, 3x, 4x upscaling", "Lanczos resampling", "Sharper than browser scaling", "All formats supported", "Fast processing", "Free forever"],
            faqs: [
                { question: "Will upscaling add real detail?", answer: "No — upscaling enlarges pixels but cannot add detail that wasn't in the original image. AI upscaling (coming soon) can synthesize detail." },
                { question: "What resampling is used?", answer: "Lanczos resampling provides the sharpest results among interpolation methods." },
                { question: "How much can I upscale?", answer: "Up to 4x the original dimensions (16x the original pixel count)." },
                { question: "Is upscaling free?", answer: "Yes — completely free with no file limits." },
            ],
        },
        "image-grayscale": {
            description: ["Convert color images to grayscale (black and white) online for free. Remove all color information while preserving the full range of tones and details in your image.", "Grayscale conversion is used in artistic photography, document scanning, reducing file sizes, and preparing images for certain printing processes.", "Our tool uses perceptual grayscale conversion that preserves natural brightness levels, producing professional black and white results."],
            howToUse: ["Upload your image.", "Grayscale conversion is applied automatically.", "Preview the black and white result.", "Download your grayscale image."],
            benefits: ["Perceptual grayscale", "Full tonal range", "Artistic photography", "Reduces file size", "All formats supported", "Free forever"],
            faqs: [
                { question: "What is perceptual grayscale?", answer: "It weights RGB channels based on human perception (R: 21%, G: 72%, B: 7%) for natural-looking black and white." },
                { question: "Can I convert back to color?", answer: "No — color information is permanently removed when converting to grayscale." },
                { question: "Does grayscale reduce file size?", answer: "Yes — grayscale images are typically 20–30% smaller than equivalent color images." },
                { question: "What formats are supported?", answer: "JPG, PNG, and WEBP images are all supported." },
            ],
        },
        "image-brightness": {
            description: ["Adjust image brightness online for free. Lighten dark photos or darken overexposed images with a precise brightness control.", "Our brightness adjustment uses Sharp's modulate function for natural-looking results that preserve color accuracy and tonal balance.", "Perfect for fixing poorly lit photos, adjusting images for print vs screen display, and enhancing visual appeal."],
            howToUse: ["Upload your image.", "Set brightness level (0.5 to 2.0, where 1.0 is unchanged).", "Click Adjust to process.", "Download your brightness-adjusted image."],
            benefits: ["Precise brightness control", "Natural-looking results", "Fix dark or overexposed photos", "Color accuracy maintained", "Instant processing", "Free to use"],
            faqs: [
                { question: "What does a brightness value of 1.0 mean?", answer: "1.0 is unchanged. Values above 1.0 increase brightness, below 1.0 decrease it." },
                { question: "Can I brighten a very dark photo?", answer: "Yes, but very dark photos may show noise or color banding when brightened significantly." },
                { question: "Does brightness adjustment affect colors?", answer: "Slightly — our tool preserves hue and saturation as much as possible." },
                { question: "What formats are supported?", answer: "JPG, PNG, and WEBP are all supported." },
            ],
        },
        "image-contrast": {
            description: ["Adjust image contrast online for free. Increase contrast to make images pop with deeper shadows and brighter highlights, or reduce it for a softer, flatter look.", "Our contrast tool uses linear contrast adjustment for precise control — perfect for improving dull or flat photos.", "Ideal for improving weather-affected outdoor photos, product images that look washed out, and preparing images for print."],
            howToUse: ["Upload your image.", "Set contrast level (values > 1 increase contrast, < 1 decrease it).", "Click Adjust to apply.", "Download your contrast-adjusted image."],
            benefits: ["Precise contrast control", "Improve dull photos", "Natural-looking results", "All formats supported", "Instant processing", "Free forever"],
            faqs: [
                { question: "How do I increase contrast?", answer: "Set the contrast multiplier above 1.0 (e.g., 1.5 for moderate increase, 2.0 for high contrast)." },
                { question: "What does reducing contrast do?", answer: "Reducing contrast creates a flat, matte look — often used in cinematic and vintage aesthetics." },
                { question: "Can contrast adjustment fix a blown-out photo?", answer: "Partially — you can recover some detail, but severely overexposed areas cannot be recovered." },
                { question: "Does this change colors?", answer: "Contrast adjustment affects luminance primarily. Colors are largely preserved." },
            ],
        },
        "image-sharpen": {
            description: ["Sharpen soft or blurry images online for free. Enhance edge definition and fine detail to make photos look crisper and more professional.", "Our sharpening tool uses Sharp's advanced unsharp mask algorithm for natural-looking sharpening that enhances details without introducing harsh halos or artifacts.", "Perfect for sharpening slightly out-of-focus photos, improving product images, and enhancing fine texture details."],
            howToUse: ["Upload your image.", "Sharpening is applied automatically at optimal settings.", "Preview the sharpened result.", "Download your sharp image."],
            benefits: ["Professional sharpening", "No halo artifacts", "Enhance photo detail", "All formats supported", "Instant processing", "Free to use"],
            faqs: [
                { question: "Can sharpening fix a very blurry photo?", answer: "Sharpening helps with slightly soft images but cannot recover severely out-of-focus photos." },
                { question: "Will sharpening increase noise?", answer: "Moderate sharpening enhances fine detail including any noise. Apply carefully to noisy images." },
                { question: "What algorithm is used?", answer: "We use Sharp's unsharp masking — the industry standard for professional image sharpening." },
                { question: "How many times can I sharpen an image?", answer: "Multiple applications increase sharpness but also increase artifacts. One pass is usually optimal." },
            ],
        },
        "image-thumbnail": {
            description: ["Generate perfectly sized thumbnails for YouTube, blog posts, social media, and website listings. Resize images to standard thumbnail dimensions instantly.", "Our thumbnail generator crops and resizes images to the exact pixel dimensions required by major platforms — no guesswork needed.", "Choose from YouTube (1280×720), Instagram (1080×1080), blog (400×300), or enter custom dimensions."],
            howToUse: ["Upload your image.", "Select a thumbnail preset or enter custom dimensions.", "Image is cropped and resized to fit.", "Download your thumbnail."],
            benefits: ["Platform-specific presets", "YouTube, Instagram, blog sizes", "Smart cropping", "Exact pixel output", "Instant generation", "Free forever"],
            faqs: [
                { question: "What YouTube thumbnail size should I use?", answer: "1280×720 pixels (16:9 aspect ratio) is the YouTube recommended thumbnail size." },
                { question: "What is the best blog thumbnail size?", answer: "400×300 or 800×450 pixels works well for most blog platforms." },
                { question: "Will the thumbnail be cropped?", answer: "Yes — to fit exact dimensions the image is center-cropped. Ensure important content is centered." },
                { question: "What format is the thumbnail?", answer: "JPEG for photos (smallest size) and PNG for graphics. Choose based on your content." },
            ],
        },
        "image-border": {
            description: ["Add custom borders and frames to images online for free. Choose border width, color, and style to frame your photos professionally.", "Our border tool uses Sharp's extend function to add precise pixel borders around any image without distorting the original content.", "Perfect for framing product images, creating social media posts with consistent spacing, and adding artistic frames to photos."],
            howToUse: ["Upload your image.", "Set border width in pixels.", "Choose border color (hex code or color picker).", "Download your bordered image."],
            benefits: ["Custom border width", "Any color border", "Pixel-precise control", "All formats supported", "Instant processing", "Free to use"],
            faqs: [
                { question: "What is the maximum border width?", answer: "You can add borders up to 500 pixels wide." },
                { question: "Can I add different-sized borders?", answer: "Currently uniform borders are applied. Custom per-side borders coming soon." },
                { question: "Will a border increase the image dimensions?", answer: "Yes — the output image will be wider and taller by the border width on each side." },
                { question: "What colors can I use?", answer: "Any color specified as hex code (e.g., #FFFFFF for white, #000000 for black)." },
            ],
        },
        "image-aspect-ratio": {
            description: ["Change image aspect ratio to standard ratios like 16:9, 4:3, 1:1, and more. Resize and pad or crop images to fit the target ratio perfectly.", "Our aspect ratio tool is essential for preparing images for different platforms — videos need 16:9, Instagram squares need 1:1, and portrait shots need 9:16.", "Choose smart cropping or letterbox padding to fit your image into any aspect ratio without distortion."],
            howToUse: ["Upload your image.", "Select your target aspect ratio (16:9, 4:3, 1:1, etc.).", "Choose crop or pad to fit.", "Download the aspect-ratio-corrected image."],
            benefits: ["Standard aspect ratio presets", "Smart center cropping", "Letterbox padding option", "Platform-ready output", "Instant processing", "Free forever"],
            faqs: [
                { question: "What aspect ratios are available?", answer: "16:9, 4:3, 3:2, 1:1, 9:16, and 21:9 presets are available, plus custom ratios." },
                { question: "Will my image be cropped or stretched?", answer: "We use smart center cropping or letterbox padding — never stretching." },
                { question: "What size is the output image?", answer: "The image is resized to a standard resolution fitting the target ratio (e.g., 1920×1080 for 16:9)." },
                { question: "What is letterbox padding?", answer: "Letterbox adds colored bars (usually black or white) to fill the target ratio without cropping." },
            ],
        },
        "reduce-image-file-size": {
            description: ["Reduce image file size to meet upload limits for email, social media, websites, and apps. Our reducer combines lossless and lossy compression for maximum size reduction.", "Whether you need to fit an image under 1MB for email, under 200KB for a website, or under 5MB for an app upload, our tool gets it done automatically.", "Upload any JPG, PNG, or WEBP image and download a dramatically smaller version ready for any platform."],
            howToUse: ["Upload your image.", "Our tool automatically applies optimal compression.", "See the before/after file sizes.", "Download the reduced image."],
            benefits: ["Reduce size for email", "Meet upload size limits", "Optimize for web", "Auto optimal settings", "Instant processing", "Free forever"],
            faqs: [
                { question: "Can I set a target file size?", answer: "Enter a target size in KB and our tool will match it as closely as possible." },
                { question: "How small can images be reduced?", answer: "Most images can be reduced 40–80% while remaining visually acceptable." },
                { question: "What is the minimum quality?", answer: "We maintain a minimum quality threshold to ensure your image remains usable." },
                { question: "Which format should I use for smallest size?", answer: "WEBP produces the smallest file sizes. If compatibility is needed, use JPEG." },
            ],
        },
    };

    return map[slug] || defaults;
}

export default function ToolPageClient({ tool }: Props) {
    const content = getToolContent(tool.slug);
    const [brightness, setBrightness] = useState(1.0);
    const [contrast, setContrast] = useState(1.0);
    const [blurSigma, setBlurSigma] = useState(3);
    const [rotateAngle, setRotateAngle] = useState(0);
    const [straightenAngle, setStraightenAngle] = useState(0);
    const [flipDir, setFlipDir] = useState<"horizontal" | "vertical" | "both">("horizontal");
    const [resizeW, setResizeW] = useState(800);
    const [resizeH, setResizeH] = useState(600);
    const [aspectLocked, setAspectLocked] = useState(true);
    const [scaleMode, setScaleMode] = useState<"pixels" | "percent">("pixels");
    const [scalePercent, setScalePercent] = useState(100);
    const [fitMode, setFitMode] = useState<"fit" | "fill" | "stretch">("fit");
    const originalAspect = useRef<number | null>(null);
    const originalNaturalW = useRef<number | null>(null);
    const originalNaturalH = useRef<number | null>(null);
    const [quality, setQuality] = useState(80);
    const [originalSizeKB, setOriginalSizeKB] = useState<number | null>(null);
    const [watermarkText, setWatermarkText] = useState("© PixlTools");
    const [borderWidth, setBorderWidth] = useState(20);
    const [borderColor, setBorderColor] = useState("#ffffff");
    const [upscale, setUpscale] = useState(2);
    const [cropLeft, setCropLeft] = useState(0);
    const [cropTop, setCropTop] = useState(0);
    const [cropWidth, setCropWidth] = useState(400);
    const [cropHeight, setCropHeight] = useState(300);
    const [cropAspectPreset, setCropAspectPreset] = useState<string | null>(null);
    const [thumbPreset, setThumbPreset] = useState("youtube");
    const [aspectRatio, setAspectRatio] = useState("16:9");
    const [customAspW, setCustomAspW] = useState(16);
    const [customAspH, setCustomAspH] = useState(9);
    const [detectedRatio, setDetectedRatio] = useState<string | null>(null);

    // Aspect ratio presets: label → target pixel dimensions
    const aspectPresets: Record<string, { w: number; h: number }> = {
        "16:9": { w: 1920, h: 1080 },
        "4:3": { w: 1600, h: 1200 },
        "1:1": { w: 1080, h: 1080 },
        "3:2": { w: 1500, h: 1000 },
        "9:16": { w: 1080, h: 1920 },
        "21:9": { w: 2520, h: 1080 },
    };

    const thumbPresets: Record<string, { w: number; h: number }> = {
        youtube: { w: 1280, h: 720 },
        instagram: { w: 1080, h: 1080 },
        blog: { w: 800, h: 450 },
        twitter: { w: 1600, h: 900 },
    };

    // Social media quick presets for resize
    const SOCIAL_PRESETS = [
        { name: "Instagram", icon: "📸", w: 1080, h: 1080 },
        { name: "HD Video", icon: "🖥", w: 1920, h: 1080 },
        { name: "YT Thumb", icon: "▶", w: 1280, h: 720 },
        { name: "Twitter", icon: "🐦", w: 1600, h: 900 },
        { name: "Story", icon: "📱", w: 1080, h: 1920 },
        { name: "Banner", icon: "🖌", w: 1500, h: 500 },
    ];

    // Aspect ratio visual shapes (CSS-drawable proportional box)
    const ASPECT_SHAPES: Record<string, { label: string; w: number; h: number; icon: string }> = {
        "16:9": { label: "16:9", w: 16, h: 9, icon: "🖥" },
        "4:3": { label: "4:3", w: 4, h: 3, icon: "📷" },
        "1:1": { label: "1:1", w: 1, h: 1, icon: "⬜" },
        "3:2": { label: "3:2", w: 3, h: 2, icon: "🖼" },
        "9:16": { label: "9:16", w: 9, h: 16, icon: "📱" },
        "21:9": { label: "21:9", w: 21, h: 9, icon: "🎬" },
    };


    const isCompressTool = ["compress-image", "compress-jpg", "compress-png", "compress-webp", "reduce-image-file-size"].includes(tool.slug);

    // Detect human-friendly ratio string from W×H
    const detectRatio = (w: number, h: number): string => {
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const g = gcd(w, h);
        return `${w / g}:${h / g}`;
    };

    // Update defaults when image loads
    const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const w = img.naturalWidth || 800;
        const h = img.naturalHeight || 600;
        originalNaturalW.current = w;
        originalNaturalH.current = h;
        originalAspect.current = w / h;

        setDetectedRatio(detectRatio(w, h));

        if (tool.slug === "crop-image") {
            setCropWidth(w);
            setCropHeight(h);
            setCropLeft(0);
            setCropTop(0);
        }
        if (tool.slug === "resize-image") {
            setResizeW(w);
            setResizeH(h);
            setScalePercent(100);
        }
        setOriginalSizeKB(w * h * 3 / 1024);
    }, [tool.slug]);

    // Compute live preview transform for rotate/flip
    const getPreviewTransform = (): string | undefined => {
        const s = tool.slug;
        if (s === "rotate-image") {
            const total = rotateAngle + straightenAngle;
            if (total === 0) return undefined;

            let scale = 1;
            if (originalNaturalW.current && originalNaturalH.current) {
                const rad = (total * Math.PI) / 180;
                const w = originalNaturalW.current;
                const h = originalNaturalH.current;
                const rotatedW = Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad));
                const rotatedH = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
                scale = Math.min(w / rotatedW, h / rotatedH);
            }
            return `rotate(${total}deg) scale(${scale.toFixed(4)})`;
        }
        if (s === "flip-image") {
            if (flipDir === "horizontal") return "scaleX(-1)";
            if (flipDir === "vertical") return "scaleY(-1)";
            if (flipDir === "both") return "scale(-1, -1)";
        }
        return undefined;
    };

    const getExtraParams = (): Record<string, string | number> => {
        const s = tool.slug;
        if (s === "image-brightness") return { brightness };
        if (s === "image-contrast") return { contrast };
        if (s === "blur-image") return { sigma: blurSigma };
        if (s === "rotate-image") return { angle: rotateAngle + straightenAngle };
        if (s === "flip-image") return { direction: flipDir };
        if (isCompressTool) return { quality, ...(tool.params ?? {}) };
        if (s === "image-aspect-ratio") {
            if (aspectRatio === "custom") {
                const g = (a: number, b: number): number => b === 0 ? a : g(b, a % b);
                const dim = customAspW > customAspH ? { w: 1920, h: Math.round(1920 * customAspH / customAspW) } : { w: Math.round(1920 * customAspW / customAspH), h: 1920 };
                return { width: dim.w, height: dim.h };
            }
            return { width: aspectPresets[aspectRatio]?.w ?? 1920, height: aspectPresets[aspectRatio]?.h ?? 1080 };
        }
        if (s === "resize-image" || s === "reduce-image-file-size") {
            const params: Record<string, string | number> = { width: resizeW, height: resizeH };
            if (s === "resize-image") params.fit = fitMode;
            return params;
        }
        if (s === "watermark-image") return { text: watermarkText };
        if (s === "image-border") return { width: borderWidth, color: borderColor };
        if (s === "image-upscaler") return { scale: upscale };
        if (s === "crop-image") return { left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight };
        if (s === "image-thumbnail") return { width: thumbPresets[thumbPreset].w, height: thumbPresets[thumbPreset].h };
        if (tool.params) return tool.params;
        return {};
    };

    const renderControls = (onProcess: () => void, loading: boolean) => {
        const s = tool.slug;
        return (
            <div className="space-y-4">
                {/* Compress quality slider */}
                {isCompressTool ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-3">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">⚙ Compression Settings</p>
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-400">Quality: <span className="text-violet-300 font-bold">{quality}%</span></label>
                            {originalSizeKB !== null && (
                                <span className="text-xs text-gray-500">
                                    Est. size: <span className="text-violet-300 font-semibold">{Math.round(originalSizeKB * quality / 100)} KB</span>
                                </span>
                            )}
                        </div>
                        <input type="range" min={10} max={100} step={1} value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-violet-500" />
                        <div className="flex justify-between text-xs text-gray-600">
                            <span>Smaller file</span>
                            <span>Higher quality</span>
                        </div>
                    </div>
                ) : null}

                {/* Per-tool controls */}
                {/* Resize image */}
                {s === "resize-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-4">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">📐 Resize Settings</p>

                        {/* Mode toggle: Pixels / Percent */}
                        <div className="flex gap-1 bg-[#16122a] p-1 rounded-lg border border-violet-500/10">
                            {(["pixels", "percent"] as const).map(m => (
                                <button key={m} onClick={() => setScaleMode(m)}
                                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all ${scaleMode === m ? "bg-violet-600 text-white" : "text-gray-500 hover:text-violet-300"}`}>
                                    {m === "pixels" ? "📏 Pixels" : "% Scale"}
                                </button>
                            ))}
                        </div>

                        {scaleMode === "pixels" ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-400 mb-1 block">Width (px)</label>
                                        <input type="number" value={resizeW} onChange={e => {
                                            const v = +e.target.value;
                                            setResizeW(v);
                                            if (aspectLocked && originalAspect.current) setResizeH(Math.round(v / originalAspect.current));
                                        }} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                    </div>
                                    <button onClick={() => setAspectLocked(v => !v)} title={aspectLocked ? "Locked" : "Unlocked"}
                                        className={`mt-5 p-2.5 rounded-lg border transition-all ${aspectLocked ? "bg-violet-500/10 border-violet-500/30 text-violet-400" : "border-violet-500/15 text-gray-500 hover:border-violet-500/30"}`}>
                                        {aspectLocked ? <Lock size={15} /> : <Unlock size={15} />}
                                    </button>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-400 mb-1 block">Height (px)</label>
                                        <input type="number" value={resizeH} onChange={e => {
                                            const v = +e.target.value;
                                            setResizeH(v);
                                            if (aspectLocked && originalAspect.current) setResizeW(Math.round(v * originalAspect.current));
                                        }} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                    </div>
                                </div>
                                {aspectLocked && <p className="text-xs text-violet-400/60 flex items-center gap-1"><Lock size={10} /> Aspect ratio locked</p>}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm text-gray-400">Scale: <span className="text-violet-300 font-bold">{scalePercent}%</span></label>
                                    {originalNaturalW.current && (
                                        <span className="text-xs text-gray-500">
                                            {Math.round(originalNaturalW.current * scalePercent / 100)} × {Math.round((originalNaturalH.current ?? 0) * scalePercent / 100)} px
                                        </span>
                                    )}
                                </div>
                                <input type="range" min={5} max={200} step={1} value={scalePercent} onChange={e => {
                                    const pct = +e.target.value;
                                    setScalePercent(pct);
                                    if (originalNaturalW.current && originalNaturalH.current) {
                                        setResizeW(Math.round(originalNaturalW.current * pct / 100));
                                        setResizeH(Math.round(originalNaturalH.current * pct / 100));
                                    }
                                }} className="w-full accent-violet-500" />
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>5%</span><span>100%</span><span>200%</span>
                                </div>
                            </div>
                        )}

                        {/* Social media presets */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2 font-medium">Quick presets</p>
                            <div className="grid grid-cols-3 gap-1.5">
                                {SOCIAL_PRESETS.map(({ name, icon, w, h }) => (
                                    <button key={name} onClick={() => { setResizeW(w); setResizeH(h); setScaleMode("pixels"); setScalePercent(100); }}
                                        className="flex flex-col items-center gap-0.5 text-[10px] bg-[#16122a] border border-violet-500/15 hover:border-violet-500/35 hover:bg-violet-500/10 text-gray-400 hover:text-violet-300 rounded-lg px-2 py-2 transition-all">
                                        <span className="text-base">{icon}</span>
                                        <span className="font-semibold">{name}</span>
                                        <span className="text-gray-600">{w}×{h}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resize mode */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2 font-medium">Resize mode</p>
                            <div className="flex gap-1.5">
                                {(["fit", "fill", "stretch"] as const).map(m => (
                                    <button key={m} onClick={() => setFitMode(m)}
                                        className={`flex-1 text-xs py-2 rounded-lg border font-semibold transition-all ${fitMode === m ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40 hover:text-violet-300"}`}>
                                        {m === "fit" ? "◻ Fit" : m === "fill" ? "✂ Fill" : "⬜ Stretch"}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-600 mt-1.5">
                                {fitMode === "fit" ? "Letterbox — preserves full image with padding" : fitMode === "fill" ? "Crops to fill exact dimensions" : "Stretches to exact dimensions (may distort)"}
                            </p>
                        </div>

                        {/* Live output chip */}
                        <div className="bg-violet-500/5 border border-violet-500/10 rounded-lg px-3 py-2 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Output</span>
                            <span className="text-xs text-violet-300 font-bold">{resizeW} × {resizeH} px</span>
                        </div>
                    </div>
                ) : null}

                {s === "reduce-image-file-size" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-2">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3">📐 Output Dimensions</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Width (px)</label>
                                <input type="number" value={resizeW} onChange={e => setResizeW(+e.target.value)} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Height (px)</label>
                                <input type="number" value={resizeH} onChange={e => setResizeH(+e.target.value)} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Aspect ratio */}
                {s === "image-aspect-ratio" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-violet-400 uppercase tracking-wider">📺 Target Aspect Ratio</label>
                            {detectedRatio && (
                                <span className="text-[10px] text-gray-500 bg-[#16122a] border border-violet-500/15 px-2 py-0.5 rounded-full">
                                    Current: <span className="text-violet-400 font-semibold">{detectedRatio}</span>
                                </span>
                            )}
                        </div>

                        {/* Visual ratio tiles */}
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(ASPECT_SHAPES).map(([ratio, { icon, w, h }]) => {
                                const maxDim = 32;
                                const tileW = w >= h ? maxDim : Math.round(maxDim * w / h);
                                const tileH = h >= w ? maxDim : Math.round(maxDim * h / w);
                                const active = aspectRatio === ratio;
                                return (
                                    <button key={ratio} onClick={() => setAspectRatio(ratio)}
                                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${active ? "bg-violet-600/20 border-violet-500 text-violet-300" : "border-violet-500/15 text-gray-400 hover:border-violet-500/30 hover:text-violet-300"}`}>
                                        {/* Proportional shape */}
                                        <div className={`border-2 rounded-sm ${active ? "border-violet-400" : "border-gray-600"}`}
                                            style={{ width: tileW, height: tileH }} />
                                        <span className="text-[10px] font-bold">{ratio}</span>
                                        <span className="text-[9px] text-gray-600">{icon}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Custom ratio */}
                        <div>
                            <button onClick={() => setAspectRatio("custom")}
                                className={`w-full text-xs py-2 rounded-lg border font-semibold transition-all ${aspectRatio === "custom" ? "bg-violet-600/20 border-violet-500 text-violet-300" : "border-violet-500/15 text-gray-500 hover:border-violet-500/30"}`}>
                                ✏ Custom ratio
                            </button>
                            {aspectRatio === "custom" && (
                                <div className="flex items-center gap-2 mt-2">
                                    <input type="number" value={customAspW} min={1} max={100} onChange={e => setCustomAspW(+e.target.value)}
                                        className="flex-1 border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                    <span className="text-gray-500 font-bold">:</span>
                                    <input type="number" value={customAspH} min={1} max={100} onChange={e => setCustomAspH(+e.target.value)}
                                        className="flex-1 border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}

                {/* Crop image */}
                {s === "crop-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-3">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">✂ Crop Settings</p>

                        {/* Aspect-locked crop presets */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1.5 font-medium">Crop ratio</p>
                            <div className="flex gap-1.5 flex-wrap">
                                {(["Free", "1:1", "16:9", "4:3", "9:16"] as const).map(preset => {
                                    const active = cropAspectPreset === preset;
                                    return (
                                        <button key={preset} onClick={() => {
                                            setCropAspectPreset(active ? null : preset);
                                            if (!active && preset !== "Free" && originalNaturalW.current && originalNaturalH.current) {
                                                const [pw, ph] = preset.split(":").map(Number);
                                                const nat = originalNaturalW.current;
                                                const h = Math.round(nat * ph / pw);
                                                setCropWidth(nat); setCropHeight(Math.min(h, originalNaturalH.current || h));
                                                setCropLeft(0); setCropTop(0);
                                            }
                                        }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${active ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40 hover:text-violet-300"}`}>
                                            {preset}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Coordinate grid */}
                        <div className="grid grid-cols-2 gap-2">
                            {([["Left", cropLeft, setCropLeft], ["Top", cropTop, setCropTop], ["Width", cropWidth, setCropWidth], ["Height", cropHeight, setCropHeight]] as const).map(([label, val, setter]) => (
                                <div key={String(label)}>
                                    <label className="text-xs text-gray-400 mb-1 block">{String(label)} (px)</label>
                                    <input type="number" value={val as number}
                                        onChange={e => {
                                            (setter as (v: number) => void)(+e.target.value);
                                            if (cropAspectPreset && cropAspectPreset !== "Free") {
                                                const [pw, ph] = cropAspectPreset.split(":").map(Number);
                                                if (String(label) === "Width") setCropHeight(Math.round(+e.target.value * ph / pw));
                                                if (String(label) === "Height") setCropWidth(Math.round(+e.target.value * pw / ph));
                                            }
                                        }}
                                        className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                </div>
                            ))}
                        </div>

                        {/* Mini crop diagram */}
                        {originalNaturalW.current && originalNaturalH.current ? (() => {
                            const natW = originalNaturalW.current!;
                            const natH = originalNaturalH.current!;
                            const boxW = 100; const boxH = Math.round(100 * natH / natW);
                            const cx = Math.round((cropLeft / natW) * boxW);
                            const cy = Math.round((cropTop / natH) * boxH);
                            const cw = Math.max(4, Math.round((cropWidth / natW) * boxW));
                            const ch = Math.max(4, Math.round((cropHeight / natH) * boxH));
                            return (
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-600 font-medium">Crop preview diagram</p>
                                    <div className="relative inline-flex" style={{ width: boxW, height: boxH }}>
                                        <div className="absolute inset-0 rounded border border-violet-500/20 bg-violet-500/5" />
                                        <div className="absolute rounded border-2 border-violet-400 bg-violet-400/15"
                                            style={{ left: cx, top: cy, width: Math.min(cw, boxW - cx), height: Math.min(ch, boxH - cy) }} />
                                    </div>
                                    <p className="text-[10px] text-gray-600">
                                        Cropping {cropWidth}×{cropHeight}px from a {natW}×{natH}px image
                                        {" ·"} {Math.round((cropWidth * cropHeight) / (natW * natH) * 100)}% of original
                                    </p>
                                </div>
                            );
                        })() : null}

                        {/* Select All shortcut */}
                        <button onClick={() => {
                            setCropLeft(0); setCropTop(0);
                            setCropWidth(originalNaturalW.current ?? cropWidth);
                            setCropHeight(originalNaturalH.current ?? cropHeight);
                        }} className="text-xs text-gray-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                            ⬛ Select entire image
                        </button>
                    </div>
                ) : null}

                {/* Rotate image */}
                {s === "rotate-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-4">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">🔄 Rotation</p>

                        {/* Custom angle */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-400 shrink-0">Custom</label>
                            <input type="number" value={rotateAngle} onChange={e => setRotateAngle(+e.target.value)}
                                className="flex-1 border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                            <span className="text-xs text-gray-500">deg</span>
                        </div>

                        {/* Straighten micro-slider */}
                        <div className="border-t border-violet-500/10 pt-3">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs text-gray-400 font-medium">Fine-tune / Straighten</label>
                                <span className="text-xs text-violet-300 font-bold tabular-nums">{straightenAngle > 0 ? "+" : ""}{straightenAngle}°</span>
                            </div>
                            <input type="range" min={-15} max={15} step={0.5} value={straightenAngle}
                                onChange={e => setStraightenAngle(+e.target.value)} className="w-full accent-violet-500" />
                            <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
                                <span>−15°</span><span className="text-center">0° (center)</span><span>+15°</span>
                            </div>
                            {straightenAngle !== 0 && (
                                <button onClick={() => setStraightenAngle(0)} className="mt-1 text-[10px] text-violet-400 hover:text-violet-300 transition-colors">↺ Reset straighten</button>
                            )}
                        </div>

                        {/* Live preview note */}
                        <p className="text-[10px] text-gray-600 flex items-center gap-1">
                            👁 Preview updates live in the image above
                        </p>
                    </div>
                ) : null}

                {/* Flip image */}
                {s === "flip-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-3">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">🪞 Flip Direction</p>
                        <div className="grid grid-cols-3 gap-2">
                            {(["horizontal", "vertical", "both"] as const).map(d => (
                                <button key={d} onClick={() => setFlipDir(d)}
                                    className={`py-3 rounded-lg text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${flipDir === d ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40 hover:text-violet-300"}`}>
                                    <span className="text-base">{d === "horizontal" ? "↔" : d === "vertical" ? "↕" : "↔↕"}</span>
                                    <span>{d === "horizontal" ? "Horizontal" : d === "vertical" ? "Vertical" : "Both"}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-600">👁 Preview updates live in the image above</p>
                    </div>
                ) : null}

                {s === "blur-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">💧 Blur Strength: <span className="text-violet-300">{blurSigma}</span></label>
                        <input type="range" min={1} max={20} value={blurSigma} onChange={e => setBlurSigma(+e.target.value)} className="w-full accent-violet-500" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>Subtle</span>
                            <span>Extreme</span>
                        </div>
                    </div>
                ) : null}

                {s === "image-brightness" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">☀️ Brightness: <span className="text-violet-300">{brightness.toFixed(1)}</span></label>
                        <input type="range" min={0.1} max={3} step={0.1} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-full accent-violet-500" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>Darker</span>
                            <span>Brighter</span>
                        </div>
                    </div>
                ) : null}

                {s === "image-contrast" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">🔲 Contrast: <span className="text-violet-300">{contrast.toFixed(1)}</span></label>
                        <input type="range" min={0.1} max={3} step={0.1} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-full accent-violet-500" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                            <span>Flat / Matte</span>
                            <span>High Contrast</span>
                        </div>
                    </div>
                ) : null}

                {s === "watermark-image" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">🖊 Watermark Text</label>
                        <input type="text" value={watermarkText} onChange={e => setWatermarkText(e.target.value)} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50 placeholder-violet-900/50" placeholder="© Your Name" />
                    </div>
                ) : null}

                {s === "image-border" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3">🖼 Border Settings</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Width (px): <span className="text-violet-300 font-medium">{borderWidth}</span></label>
                                <input type="range" min={1} max={100} value={borderWidth} onChange={e => setBorderWidth(+e.target.value)} className="w-full accent-violet-500" />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Border Color</label>
                                <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-full h-10 rounded-lg border border-violet-500/20 cursor-pointer bg-[#16122a]" />
                            </div>
                        </div>
                    </div>
                ) : null}

                {s === "image-upscaler" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">🔍 Upscale Factor</label>
                        <div className="flex gap-2">
                            {[2, 3, 4].map(x => (
                                <button key={x} onClick={() => setUpscale(x)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${upscale === x ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40 hover:text-violet-300"}`}>{x}×</button>
                            ))}
                        </div>
                    </div>
                ) : null}

                {s === "image-thumbnail" ? (
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">🖼 Thumbnail Preset</label>
                        <div className="flex gap-2 flex-wrap">
                            {Object.entries(thumbPresets).map(([key, dims]) => (
                                <button key={key} onClick={() => setThumbPreset(key)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${thumbPreset === key ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40 hover:text-violet-300"}`}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)} ({dims.w}×{dims.h})
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onProcess}
                        disabled={loading}
                        className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40"
                    >
                        {loading ? (
                            <><Loader2 size={16} className="animate-spin" /> Processing…</>
                        ) : `${tool.name} →`}
                    </button>
                </div>
            </div>
        );
    };

    const [copiedHex, setCopiedHex] = useState<string | null>(null);

    const handleCopyHex = useCallback((hex: string) => {
        navigator.clipboard.writeText(hex).then(() => {
            setCopiedHex(hex);
            setTimeout(() => setCopiedHex(null), 1500);
        }).catch(() => {
            // Clipboard access denied — show the hex for manual copy
            setCopiedHex(null);
        });
    }, []);

    const isJsonTool = tool.slug === "image-color-picker" || tool.slug === "image-metadata-viewer" || tool.slug === "image-to-base64";

    const renderJsonResult = (data: Record<string, unknown>) => {
        if (tool.slug === "image-to-base64") {
            const dataUrl = data.base64 as string || "";
            const rawBase64 = data.rawBase64 as string || "";
            const sizeKB = data.sizeKB as string || "";
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-violet-100 text-sm">Base64 Output</h3>
                        <span className="text-xs text-gray-500">{sizeKB} KB</span>
                    </div>
                    <div className="bg-[#0f0d1f] border border-violet-500/15 rounded-xl p-4">
                        <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">Data URL (HTML src attribute)</p>
                        <textarea
                            readOnly
                            value={dataUrl}
                            rows={4}
                            className="w-full bg-transparent text-xs text-violet-300 font-mono resize-none focus:outline-none"
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(dataUrl)}
                            className="mt-2 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        >
                            Copy Data URL
                        </button>
                    </div>
                    <div className="bg-[#0f0d1f] border border-violet-500/15 rounded-xl p-4">
                        <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">Raw Base64 (without prefix)</p>
                        <textarea
                            readOnly
                            value={rawBase64}
                            rows={3}
                            className="w-full bg-transparent text-xs text-gray-500 font-mono resize-none focus:outline-none"
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(rawBase64)}
                            className="mt-2 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        >
                            Copy Raw Base64
                        </button>
                    </div>
                    <p className="text-xs text-gray-600">Paste the data URL into an img src attribute or CSS background-image to embed the image without hosting.</p>
                </div>
            );
        }
        if (tool.slug === "image-color-picker") {
            const palette = data.palette as Array<{ hex: string; r: number; g: number; b: number; count: number }> || [];
            const channels = data.channels as Array<{ channel: string; mean: number; min: number; max: number }> || [];
            return (
                <div>
                    <h3 className="font-bold text-violet-100 mb-3 text-sm">Dominant Color Palette</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {palette.map((c, i) => (
                            <div key={i} className="text-center">
                                <div
                                    className="w-12 h-12 rounded-xl border border-violet-500/20 shadow-sm cursor-pointer hover:scale-110 transition-transform relative"
                                    style={{ background: c.hex }}
                                    onClick={() => handleCopyHex(c.hex)}
                                    title={`Click to copy ${c.hex}`}
                                >
                                    {copiedHex === c.hex && (
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#16122a] text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap border border-violet-500/20">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mt-1 font-mono">{c.hex}</p>
                            </div>
                        ))}
                    </div>
                    <h3 className="font-bold text-violet-100 mb-2 text-sm">Channel Statistics</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {channels.map((ch, i) => (
                            <div key={i} className="bg-[#0f0d1f] border border-violet-500/10 rounded-lg p-2 text-xs">
                                <span className="font-semibold text-violet-300">{ch.channel}</span>
                                <span className="text-gray-500 ml-2">Mean: {ch.mean} · Min: {ch.min} · Max: {ch.max}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (tool.slug === "image-metadata-viewer") {
            const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== "");
            return (
                <div>
                    <h3 className="font-bold text-violet-100 mb-3 text-sm">Image Metadata</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <tbody>
                                {entries.map(([k, v]) => (
                                    <tr key={k} className="border-b border-violet-500/10 last:border-none hover:bg-violet-500/5 transition-colors">
                                        <td className="py-1.5 pr-4 font-mono font-semibold text-violet-400 w-1/3">{k}</td>
                                        <td className="py-1.5 text-gray-400 break-all">{String(v)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <ToolLayout
            toolName={tool.name}
            toolIcon={tool.icon}
            toolDesc={tool.shortDesc}
            apiEndpoint={tool.apiEndpoint}
            acceptedFormats={tool.acceptedFormats}
            outputFormat={tool.outputFormat}
            extraParams={getExtraParams()}
            description={content.description}
            howToUse={content.howToUse}
            benefits={content.benefits}
            faqs={content.faqs}
            renderControls={renderControls}
            jsonMode={isJsonTool}
            renderJsonResult={renderJsonResult}
            onImageLoad={handleImageLoad}
            category={tool.category}
            slug={tool.slug}
            previewTransform={getPreviewTransform()}
            interactiveCrop={tool.slug === "crop-image" ? {
                left: cropLeft,
                top: cropTop,
                width: cropWidth,
                height: cropHeight,
                aspectPreset: cropAspectPreset,
                onChange: ({ left, top, width, height }) => {
                    setCropLeft(left);
                    setCropTop(top);
                    setCropWidth(width);
                    setCropHeight(height);
                },
            } : undefined}
            renderPreviewActions={tool.slug === "rotate-image" ? (
                <div className="flex items-stretch">
                    {([0, -90, 90, 180] as const).map((deg) => {
                        const isActive = rotateAngle === deg && straightenAngle === 0;
                        const icons: Record<number, string> = { 0: "⋙", [-90]: "↺", 90: "↻", 180: "↕" };
                        const labels: Record<number, string> = { 0: "0°", [-90]: "−90°", 90: "90°", 180: "180°" };
                        return (
                            <button
                                key={deg}
                                onClick={() => { setRotateAngle(deg); setStraightenAngle(0); }}
                                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold border-r border-violet-500/10 last:border-r-0 transition-all ${isActive
                                    ? "bg-violet-600/20 text-violet-300"
                                    : "text-gray-500 hover:bg-violet-500/8 hover:text-violet-300"
                                    }`}
                            >
                                <span className="text-lg leading-none">{icons[deg]}</span>
                                <span className="tracking-wide">{labels[deg]}</span>
                            </button>
                        );
                    })}
                </div>
            ) : undefined}
            minPreviewHeight={tool.slug === "rotate-image" ? "420px" : undefined}
        />
    );
}

