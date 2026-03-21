"use client";
import dynamic from "next/dynamic";
import ToolLayout from "@/components/tools/ToolLayout";
import type { ToolData } from "@/lib/tools-data";
import { useState, useCallback, useRef } from "react";
import type { ToolControlsProps } from "@/components/tools/ToolControls";

// Lazy-load all tool control panels + JSON renderers in one separate chunk
const ToolControls = dynamic<ToolControlsProps>(
    () => import("@/components/tools/ToolControls").then(m => ({ default: m.ToolControls })),
    { ssr: false }
);
const ToolJsonResult = dynamic(
    () => import("@/components/tools/ToolControls").then(m => ({ default: m.ToolJsonResult })),
    { ssr: false }
);

interface Props { tool: ToolData; }

export default function ToolPageClient({ tool }: Props) {
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

    const isCompressTool = ["compress-image", "compress-jpg", "compress-png", "compress-webp", "reduce-image-file-size"].includes(tool.slug);

    const detectRatio = (w: number, h: number): string => {
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const g = gcd(w, h);
        return `${w / g}:${h / g}`;
    };

    const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const w = img.naturalWidth || 800;
        const h = img.naturalHeight || 600;
        originalNaturalW.current = w;
        originalNaturalH.current = h;
        originalAspect.current = w / h;
        setDetectedRatio(detectRatio(w, h));
        if (tool.slug === "crop-image") { setCropWidth(w); setCropHeight(h); setCropLeft(0); setCropTop(0); }
        if (tool.slug === "resize-image") { setResizeW(w); setResizeH(h); setScalePercent(100); }
        setOriginalSizeKB(w * h * 3 / 1024);
    }, [tool.slug]);

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

    // Passed as render prop to ToolLayout — lazy component renders inside
    const renderControls = (onProcess: () => void, loading: boolean) => (
        <ToolControls
            slug={tool.slug}
            toolName={tool.name}
            isCompressTool={isCompressTool}
            quality={quality} setQuality={setQuality}
            originalSizeKB={originalSizeKB}
            scaleMode={scaleMode} setScaleMode={setScaleMode}
            resizeW={resizeW} setResizeW={setResizeW}
            resizeH={resizeH} setResizeH={setResizeH}
            scalePercent={scalePercent} setScalePercent={setScalePercent}
            aspectLocked={aspectLocked} setAspectLocked={setAspectLocked}
            fitMode={fitMode} setFitMode={setFitMode}
            originalAspectRef={originalAspect}
            originalNaturalWRef={originalNaturalW}
            originalNaturalHRef={originalNaturalH}
            aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
            customAspW={customAspW} setCustomAspW={setCustomAspW}
            customAspH={customAspH} setCustomAspH={setCustomAspH}
            detectedRatio={detectedRatio}
            cropLeft={cropLeft} setCropLeft={setCropLeft}
            cropTop={cropTop} setCropTop={setCropTop}
            cropWidth={cropWidth} setCropWidth={setCropWidth}
            cropHeight={cropHeight} setCropHeight={setCropHeight}
            cropAspectPreset={cropAspectPreset} setCropAspectPreset={setCropAspectPreset}
            rotateAngle={rotateAngle} setRotateAngle={setRotateAngle}
            straightenAngle={straightenAngle} setStraightenAngle={setStraightenAngle}
            flipDir={flipDir} setFlipDir={setFlipDir}
            brightness={brightness} setBrightness={setBrightness}
            contrast={contrast} setContrast={setContrast}
            blurSigma={blurSigma} setBlurSigma={setBlurSigma}
            watermarkText={watermarkText} setWatermarkText={setWatermarkText}
            borderWidth={borderWidth} setBorderWidth={setBorderWidth}
            borderColor={borderColor} setBorderColor={setBorderColor}
            upscale={upscale} setUpscale={setUpscale}
            thumbPreset={thumbPreset} setThumbPreset={setThumbPreset}
            onProcess={onProcess}
            loading={loading}
        />
    );

    const isJsonTool = tool.slug === "image-color-picker" || tool.slug === "image-metadata-viewer" || tool.slug === "image-to-base64";

    const renderJsonResult = (data: Record<string, unknown>) => (
        <ToolJsonResult slug={tool.slug} data={data} />
    );

    return (
        <ToolLayout
            toolName={tool.name}
            toolIcon={tool.icon}
            toolDesc={tool.shortDesc}
            apiEndpoint={tool.apiEndpoint}
            acceptedFormats={tool.acceptedFormats}
            outputFormat={tool.outputFormat}
            extraParams={getExtraParams()}
            description={tool.description ?? []}
            howToUse={tool.howToSteps?.map(s => s.text) ?? []}
            benefits={tool.benefits ?? []}
            faqs={tool.faqs ?? []}
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
