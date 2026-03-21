"use client";
import React, { useCallback, useState } from "react";
import { Loader2, Lock, Unlock } from "lucide-react";

export interface ToolControlsProps {
    slug: string;
    toolName: string;
    isCompressTool: boolean;
    // compress
    quality: number; setQuality: (v: number) => void;
    originalSizeKB: number | null;
    // resize
    scaleMode: "pixels" | "percent"; setScaleMode: (v: "pixels" | "percent") => void;
    resizeW: number; setResizeW: (v: number) => void;
    resizeH: number; setResizeH: (v: number) => void;
    scalePercent: number; setScalePercent: (v: number) => void;
    aspectLocked: boolean; setAspectLocked: React.Dispatch<React.SetStateAction<boolean>>;
    fitMode: "fit" | "fill" | "stretch"; setFitMode: (v: "fit" | "fill" | "stretch") => void;
    originalAspectRef: React.MutableRefObject<number | null>;
    originalNaturalWRef: React.MutableRefObject<number | null>;
    originalNaturalHRef: React.MutableRefObject<number | null>;
    // aspect ratio
    aspectRatio: string; setAspectRatio: (v: string) => void;
    customAspW: number; setCustomAspW: (v: number) => void;
    customAspH: number; setCustomAspH: (v: number) => void;
    detectedRatio: string | null;
    // crop
    cropLeft: number; setCropLeft: (v: number) => void;
    cropTop: number; setCropTop: (v: number) => void;
    cropWidth: number; setCropWidth: (v: number) => void;
    cropHeight: number; setCropHeight: (v: number) => void;
    cropAspectPreset: string | null; setCropAspectPreset: (v: string | null) => void;
    // rotate
    rotateAngle: number; setRotateAngle: (v: number) => void;
    straightenAngle: number; setStraightenAngle: (v: number) => void;
    // flip
    flipDir: "horizontal" | "vertical" | "both"; setFlipDir: (v: "horizontal" | "vertical" | "both") => void;
    // individual sliders
    brightness: number; setBrightness: (v: number) => void;
    contrast: number; setContrast: (v: number) => void;
    blurSigma: number; setBlurSigma: (v: number) => void;
    // misc
    watermarkText: string; setWatermarkText: (v: string) => void;
    borderWidth: number; setBorderWidth: (v: number) => void;
    borderColor: string; setBorderColor: (v: string) => void;
    upscale: number; setUpscale: (v: number) => void;
    thumbPreset: string; setThumbPreset: (v: string) => void;
    // process button
    onProcess: () => void;
    loading: boolean;
}

const SOCIAL_PRESETS = [
    { name: "Instagram", icon: "📸", w: 1080, h: 1080 },
    { name: "HD Video", icon: "🖥", w: 1920, h: 1080 },
    { name: "YT Thumb", icon: "▶", w: 1280, h: 720 },
    { name: "Twitter", icon: "🐦", w: 1600, h: 900 },
    { name: "Story", icon: "📱", w: 1080, h: 1920 },
    { name: "Banner", icon: "🖌", w: 1500, h: 500 },
];

const ASPECT_SHAPES: Record<string, { label: string; w: number; h: number; icon: string }> = {
    "16:9": { label: "16:9", w: 16, h: 9, icon: "🖥" },
    "4:3": { label: "4:3", w: 4, h: 3, icon: "📷" },
    "1:1": { label: "1:1", w: 1, h: 1, icon: "⬜" },
    "3:2": { label: "3:2", w: 3, h: 2, icon: "🖼" },
    "9:16": { label: "9:16", w: 9, h: 16, icon: "📱" },
    "21:9": { label: "21:9", w: 21, h: 9, icon: "🎬" },
};

const thumbPresets: Record<string, { w: number; h: number }> = {
    youtube: { w: 1280, h: 720 },
    instagram: { w: 1080, h: 1080 },
    blog: { w: 800, h: 450 },
    twitter: { w: 1600, h: 900 },
};

export function ToolControls(props: ToolControlsProps) {
    const {
        slug: s, toolName, isCompressTool,
        quality, setQuality, originalSizeKB,
        scaleMode, setScaleMode, resizeW, setResizeW, resizeH, setResizeH,
        scalePercent, setScalePercent, aspectLocked, setAspectLocked, fitMode, setFitMode,
        originalAspectRef, originalNaturalWRef, originalNaturalHRef,
        aspectRatio, setAspectRatio, customAspW, setCustomAspW, customAspH, setCustomAspH, detectedRatio,
        cropLeft, setCropLeft, cropTop, setCropTop, cropWidth, setCropWidth, cropHeight, setCropHeight,
        cropAspectPreset, setCropAspectPreset,
        rotateAngle, setRotateAngle, straightenAngle, setStraightenAngle,
        flipDir, setFlipDir,
        brightness, setBrightness, contrast, setContrast, blurSigma, setBlurSigma,
        watermarkText, setWatermarkText, borderWidth, setBorderWidth, borderColor, setBorderColor,
        upscale, setUpscale, thumbPreset, setThumbPreset,
        onProcess, loading,
    } = props;

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

            {/* Resize image */}
            {s === "resize-image" ? (
                <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-4">
                    <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">📐 Resize Settings</p>
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
                                        if (aspectLocked && originalAspectRef.current) setResizeH(Math.round(v / originalAspectRef.current));
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
                                        if (aspectLocked && originalAspectRef.current) setResizeW(Math.round(v * originalAspectRef.current));
                                    }} className="w-full border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                                </div>
                            </div>
                            {aspectLocked && <p className="text-xs text-violet-400/60 flex items-center gap-1"><Lock size={10} /> Aspect ratio locked</p>}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-400">Scale: <span className="text-violet-300 font-bold">{scalePercent}%</span></label>
                                {originalNaturalWRef.current && (
                                    <span className="text-xs text-gray-500">
                                        {Math.round(originalNaturalWRef.current * scalePercent / 100)} × {Math.round((originalNaturalHRef.current ?? 0) * scalePercent / 100)} px
                                    </span>
                                )}
                            </div>
                            <input type="range" min={5} max={200} step={1} value={scalePercent} onChange={e => {
                                const pct = +e.target.value;
                                setScalePercent(pct);
                                if (originalNaturalWRef.current && originalNaturalHRef.current) {
                                    setResizeW(Math.round(originalNaturalWRef.current * pct / 100));
                                    setResizeH(Math.round(originalNaturalHRef.current * pct / 100));
                                }
                            }} className="w-full accent-violet-500" />
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>5%</span><span>100%</span><span>200%</span>
                            </div>
                        </div>
                    )}
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
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(ASPECT_SHAPES).map(([ratio, { icon, w, h }]) => {
                            const maxDim = 32;
                            const tileW = w >= h ? maxDim : Math.round(maxDim * w / h);
                            const tileH = h >= w ? maxDim : Math.round(maxDim * h / w);
                            const active = aspectRatio === ratio;
                            return (
                                <button key={ratio} onClick={() => setAspectRatio(ratio)}
                                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${active ? "bg-violet-600/20 border-violet-500 text-violet-300" : "border-violet-500/15 text-gray-400 hover:border-violet-500/30 hover:text-violet-300"}`}>
                                    <div className={`border-2 rounded-sm ${active ? "border-violet-400" : "border-gray-600"}`}
                                        style={{ width: tileW, height: tileH }} />
                                    <span className="text-[10px] font-bold">{ratio}</span>
                                    <span className="text-[9px] text-gray-600">{icon}</span>
                                </button>
                            );
                        })}
                    </div>
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
                    <div>
                        <p className="text-xs text-gray-500 mb-1.5 font-medium">Crop ratio</p>
                        <div className="flex gap-1.5 flex-wrap">
                            {(["Free", "1:1", "16:9", "4:3", "9:16"] as const).map(preset => {
                                const active = cropAspectPreset === preset;
                                return (
                                    <button key={preset} onClick={() => {
                                        setCropAspectPreset(active ? null : preset);
                                        if (!active && preset !== "Free" && originalNaturalWRef.current && originalNaturalHRef.current) {
                                            const [pw, ph] = preset.split(":").map(Number);
                                            const nat = originalNaturalWRef.current;
                                            const h = Math.round(nat * ph / pw);
                                            setCropWidth(nat); setCropHeight(Math.min(h, originalNaturalHRef.current || h));
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
                    <div className="grid grid-cols-2 gap-2">
                        {([[`Left`, cropLeft, setCropLeft], [`Top`, cropTop, setCropTop], [`Width`, cropWidth, setCropWidth], [`Height`, cropHeight, setCropHeight]] as const).map(([label, val, setter]) => (
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
                    {originalNaturalWRef.current && originalNaturalHRef.current ? (() => {
                        const natW = originalNaturalWRef.current!;
                        const natH = originalNaturalHRef.current!;
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
                    <button onClick={() => {
                        setCropLeft(0); setCropTop(0);
                        setCropWidth(originalNaturalWRef.current ?? cropWidth);
                        setCropHeight(originalNaturalHRef.current ?? cropHeight);
                    }} className="text-xs text-gray-600 hover:text-violet-400 transition-colors flex items-center gap-1">
                        ⬛ Select entire image
                    </button>
                </div>
            ) : null}

            {/* Rotate image */}
            {s === "rotate-image" ? (
                <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4 space-y-4">
                    <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">🔄 Rotation</p>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-400 shrink-0">Custom</label>
                        <input type="number" value={rotateAngle} onChange={e => setRotateAngle(+e.target.value)}
                            className="flex-1 border border-violet-500/20 bg-[#16122a] text-violet-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500/50" />
                        <span className="text-xs text-gray-500">deg</span>
                    </div>
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
                    <p className="text-[10px] text-gray-600 flex items-center gap-1">👁 Preview updates live in the image above</p>
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
                        <span>Subtle</span><span>Extreme</span>
                    </div>
                </div>
            ) : null}

            {s === "image-brightness" ? (
                <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                    <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">☀️ Brightness: <span className="text-violet-300">{brightness.toFixed(1)}</span></label>
                    <input type="range" min={0.1} max={3} step={0.1} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-full accent-violet-500" />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Darker</span><span>Brighter</span>
                    </div>
                </div>
            ) : null}

            {s === "image-contrast" ? (
                <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                    <label className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3 block">🔲 Contrast: <span className="text-violet-300">{contrast.toFixed(1)}</span></label>
                    <input type="range" min={0.1} max={3} step={0.1} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-full accent-violet-500" />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Flat / Matte</span><span>High Contrast</span>
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
                    ) : `${toolName} →`}
                </button>
            </div>
        </div>
    );
}

// ─── JSON Result Renderers ────────────────────────────────────────────────────

interface JsonResultProps {
    slug: string;
    data: Record<string, unknown>;
}

export function ToolJsonResult({ slug, data }: JsonResultProps) {
    const [copiedHex, setCopiedHex] = useState<string | null>(null);

    const handleCopyHex = useCallback((hex: string) => {
        navigator.clipboard.writeText(hex).then(() => {
            setCopiedHex(hex);
            setTimeout(() => setCopiedHex(null), 1500);
        }).catch(() => setCopiedHex(null));
    }, []);

    if (slug === "image-to-base64") {
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
                    <textarea readOnly value={dataUrl} rows={4} className="w-full bg-transparent text-xs text-violet-300 font-mono resize-none focus:outline-none" />
                    <button onClick={() => navigator.clipboard.writeText(dataUrl)}
                        className="mt-2 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        Copy Data URL
                    </button>
                </div>
                <div className="bg-[#0f0d1f] border border-violet-500/15 rounded-xl p-4">
                    <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">Raw Base64 (without prefix)</p>
                    <textarea readOnly value={rawBase64} rows={3} className="w-full bg-transparent text-xs text-gray-500 font-mono resize-none focus:outline-none" />
                    <button onClick={() => navigator.clipboard.writeText(rawBase64)}
                        className="mt-2 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        Copy Raw Base64
                    </button>
                </div>
                <p className="text-xs text-gray-600">Paste the data URL into an img src attribute or CSS background-image to embed the image without hosting.</p>
            </div>
        );
    }

    if (slug === "image-color-picker") {
        const palette = data.palette as Array<{ hex: string; r: number; g: number; b: number; count: number }> || [];
        const channels = data.channels as Array<{ channel: string; mean: number; min: number; max: number }> || [];
        return (
            <div>
                <h3 className="font-bold text-violet-100 mb-3 text-sm">Dominant Color Palette</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {palette.map((c, i) => (
                        <div key={i} className="text-center">
                            <div className="w-12 h-12 rounded-xl border border-violet-500/20 shadow-sm cursor-pointer hover:scale-110 transition-transform relative"
                                style={{ background: c.hex }}
                                onClick={() => handleCopyHex(c.hex)}
                                title={`Click to copy ${c.hex}`}>
                                {copiedHex === c.hex && (
                                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#16122a] text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap border border-violet-500/20">Copied!</span>
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

    if (slug === "image-metadata-viewer") {
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
}
