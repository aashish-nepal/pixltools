"use client";
import ToolLayout from "@/components/tools/ToolLayout";
import type { ToolData } from "@/lib/tools-data";
import { useState, useCallback, useRef } from "react";
import { Loader2, Lock, Unlock } from "lucide-react";

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

