"use client";
import { useState, useRef, useCallback, DragEvent, useEffect } from "react";
import { UploadCloud, Link2, X, Loader2, Lock, Zap, Trash2 } from "lucide-react";

interface UploadAreaProps {
    onFileSelect: (file: File) => void;
    acceptedFormats: string[];
    maxSizeMB?: number;
}

const FORMAT_ICONS: Record<string, string> = {
    jpeg: "JPG",
    jpg: "JPG",
    png: "PNG",
    webp: "WEBP",
    gif: "GIF",
    pdf: "PDF",
    svg: "SVG",
    tiff: "TIFF",
    bmp: "BMP",
    avif: "AVIF",
};

export default function UploadArea({ onFileSelect, acceptedFormats, maxSizeMB = 25 }: UploadAreaProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [urlMode, setUrlMode] = useState(false);
    const [urlValue, setUrlValue] = useState("");
    const [urlLoading, setUrlLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateAndSelect = useCallback((file: File) => {
        setError(null);
        if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
            setError("HEIC files detected. Please use our HEIC → JPG converter (coming soon) or convert it first.");
            return;
        }
        if (!acceptedFormats.includes(file.type)) {
            setError(`Unsupported format. Accepted: ${acceptedFormats.map(f => f.split("/")[1].toUpperCase()).join(", ")}`);
            return;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File too large. Maximum size is ${maxSizeMB}MB.`);
            return;
        }
        onFileSelect(file);
    }, [acceptedFormats, maxSizeMB, onFileSelect]);

    // Clipboard paste support (Ctrl+V anywhere on the page)
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of Array.from(items)) {
                if (item.kind === "file" && item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if (file) {
                        validateAndSelect(file);
                        break;
                    }
                }
            }
        };
        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, [validateAndSelect]);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) validateAndSelect(file);
    }, [validateAndSelect]);

    const handleUrlLoad = async () => {
        if (!urlValue.trim()) return;
        setUrlLoading(true);
        setError(null);
        try {
            const res = await fetch(urlValue.trim());
            if (!res.ok) throw new Error("Failed to fetch image from URL");
            const blob = await res.blob();
            if (!blob.type.startsWith("image/")) throw new Error("URL does not point to an image");
            const filename = urlValue.split("/").pop()?.split("?")[0] || "image.jpg";
            const file = new File([blob], filename, { type: blob.type });
            setUrlMode(false);
            setUrlValue("");
            validateAndSelect(file);
        } catch {
            setError("Could not load image from that URL. Make sure it's a direct image link.");
        } finally {
            setUrlLoading(false);
        }
    };

    const formatLabels = acceptedFormats.map(f => {
        const ext = f.split("/")[1].toLowerCase();
        return { ext: ext.toUpperCase() };
    });

    return (
        <div>
            {!urlMode ? (
                <div
                    className={`drop-zone rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-300 ${isDragOver ? "drag-over" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={acceptedFormats.join(",")}
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && validateAndSelect(e.target.files[0])}
                    />
                    <div className="flex flex-col items-center gap-4">
                        {/* Animated cloud icon */}
                        <div className={`upload-icon-wrap w-18 h-18 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragOver ? "scale-110" : ""}`}>
                            <UploadCloud
                                size={40}
                                className={`transition-all duration-300 ${isDragOver ? "text-violet-300 translate-y-[-4px]" : "text-violet-400"}`}
                                strokeWidth={1.5}
                            />
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-violet-100">
                                {isDragOver ? "Release to spin up the pipeline" : "Drag & drop an image to get started"}
                            </p>
                            <p className="text-sm text-violet-300/50 mt-1">or <span className="text-violet-400 font-medium underline underline-offset-2">select from disk</span></p>
                        </div>

                        {/* Format badges with icons */}
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {formatLabels.map(({ ext }) => (
                                <span key={ext} className="inline-flex items-center gap-1 text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2.5 py-1 rounded-lg font-semibold tracking-wide">
                                    {ext}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="text-xs text-gray-500">· up to {maxSizeMB}MB each</span>
                        </div>

                        {/* Extra input methods */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <kbd className="bg-violet-500/10 border border-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded text-[10px] font-mono">Ctrl+V</kbd>
                                <span>paste from clipboard</span>
                            </span>
                            <span>·</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); setUrlMode(true); setError(null); }}
                                className="flex items-center gap-1 text-gray-500 hover:text-violet-400 transition-colors"
                            >
                                <Link2 size={12} />
                                <span>pull from URL</span>
                            </button>
                        </div>

                        {/* Trust line */}
                        <p className="flex items-center justify-center gap-3 text-xs text-gray-600 font-medium">
                            <span className="flex items-center gap-1"><Lock size={11} className="text-violet-500" /> Encrypted transfer</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Zap size={11} className="text-violet-500" /> Real-time processing</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Trash2 size={11} className="text-violet-500" /> Auto-delete after processing</span>
                        </p>
                    </div>
                </div>
            ) : (
                /* URL import panel — dark themed */
                <div className="rounded-2xl border border-violet-500/20 bg-[#16122a] p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-violet-100 flex items-center gap-2">
                            <Link2 size={14} className="text-violet-400" />
                            Load image from URL
                        </p>
                        <button onClick={() => { setUrlMode(false); setError(null); }} className="text-gray-500 hover:text-violet-300 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            value={urlValue}
                            onChange={(e) => setUrlValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleUrlLoad()}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 bg-[#0f0d1f] border border-violet-500/20 text-violet-100 placeholder-violet-900/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
                            autoFocus
                        />
                        <button
                            onClick={handleUrlLoad}
                            disabled={urlLoading}
                            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-violet-900/40"
                        >
                            {urlLoading ? <Loader2 size={14} className="animate-spin" /> : null}
                            Load
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Paste a direct link to any JPG, PNG, or WEBP image</p>
                </div>
            )}

            {error && (
                <p className="mt-3 text-sm text-red-400 text-center font-medium">{error}</p>
            )}
        </div>
    );
}
