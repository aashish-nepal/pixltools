"use client";
import { useState, useRef, useCallback, DragEvent } from "react";
import { UploadCloud, X, Download, Loader2, Settings2 } from "lucide-react";

interface FileEntry {
    id: string;
    file: File;
    preview: string;
}

export default function CollageMakerClient() {
    const [files, setFiles] = useState<FileEntry[]>([]);
    const [cols, setCols] = useState(2);
    const [gap, setGap] = useState(10);
    const [bg, setBg] = useState("#000000");
    const [isDragOver, setIsDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = useCallback((newFiles: File[]) => {
        const accepted = newFiles.filter(f => ["image/jpeg", "image/png", "image/webp"].includes(f.type));
        if (accepted.length === 0) return;
        setFiles(prev => {
            const combined = [...prev, ...accepted.map(f => ({
                id: `${f.name}-${Date.now()}-${Math.random()}`,
                file: f,
                preview: URL.createObjectURL(f),
            }))].slice(0, 16);
            return combined;
        });
        setResult(null);
        setError(null);
    }, []);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        addFiles(Array.from(e.dataTransfer.files));
    };

    const removeFile = (id: string) => {
        setFiles(prev => {
            const removed = prev.find(f => f.id === id);
            if (removed) URL.revokeObjectURL(removed.preview);
            return prev.filter(f => f.id !== id);
        });
    };

    const handleProcess = async () => {
        if (files.length < 2) { setError("Please add at least 2 images"); return; }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const formData = new FormData();
            files.forEach(({ file }) => formData.append("files", file));
            formData.append("cols", String(cols));
            formData.append("gap", String(gap));
            formData.append("bg", bg);
            const res = await fetch("/api/collage", { method: "POST", body: formData });
            if (!res.ok) {
                const body = await res.json().catch(() => ({ error: "Processing failed" }));
                setError(body.error || "Processing failed");
                return;
            }
            const blob = await res.blob();
            setResult(URL.createObjectURL(blob));
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const rows = Math.ceil(files.length / cols);

    return (
        <main className="min-h-screen bg-[#0b0816]">
            {/* Hero */}
            <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-14 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-500/10 border border-violet-500/20 rounded-2xl mb-5 text-3xl">🖼️</div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-300 mb-3 tracking-tight">Photo Collage Maker</h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Combine up to 16 photos into a grid collage. Customize columns, spacing, and background color.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Upload + Controls */}
                    <div className="lg:col-span-1 space-y-5">
                        {/* Upload drop zone */}
                        <div
                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragOver ? "border-violet-500 bg-violet-500/10" : "border-violet-500/20 hover:border-violet-500/40 bg-[#16122a]"}`}
                            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                onChange={e => e.target.files && addFiles(Array.from(e.target.files))}
                            />
                            <UploadCloud size={36} className="text-violet-400 mx-auto mb-3" strokeWidth={1.5} />
                            <p className="text-sm font-semibold text-violet-200/70">Drag & drop images here</p>
                            <p className="text-xs text-gray-400 mt-1">or <span className="text-violet-400 underline">click to browse</span></p>
                            <p className="text-xs text-violet-300/30 mt-2">JPG, PNG, WEBP · Up to 16 images · 10MB each</p>
                        </div>

                        {/* Settings */}
                        <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-5 space-y-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Settings2 size={14} className="text-violet-400" />
                                <span className="text-sm font-bold text-violet-200/70">Collage Settings</span>
                            </div>
                            <div>
                                <label className="text-xs text-violet-400/50 font-semibold uppercase tracking-wider block mb-2">
                                    Columns: <span className="text-violet-400">{cols}</span>
                                </label>
                                <div className="flex gap-2">
                                    {[2, 3, 4].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCols(c)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${cols === c ? "bg-violet-600 text-white border-violet-500" : "border-violet-500/20 text-gray-400 hover:border-violet-500/40"}`}
                                        >
                                            {c} col{c > 1 ? "s" : ""}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-violet-400/50 font-semibold uppercase tracking-wider block mb-2">
                                    Gap spacing: <span className="text-violet-400">{gap}px</span>
                                </label>
                                <input type="range" min={0} max={20} value={gap} onChange={e => setGap(+e.target.value)} className="w-full accent-violet-500" />
                            </div>
                            <div>
                                <label className="text-xs text-violet-400/50 font-semibold uppercase tracking-wider block mb-2">Background color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded-lg border border-violet-500/20 cursor-pointer bg-transparent" />
                                    <span className="text-sm text-gray-400 font-mono">{bg.toUpperCase()}</span>
                                    <div className="flex gap-1 ml-auto">
                                        {["#000000", "#ffffff", "#1e293b", "#0f0d1f"].map(c => (
                                            <button key={c} onClick={() => setBg(c)} className="w-5 h-5 rounded-md border border-violet-500/20 hover:scale-110 transition-transform" style={{ background: c }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preview info */}
                        {files.length > 0 && (
                            <div className="bg-[#16122a] border border-violet-500/15 rounded-xl px-4 py-3 text-xs text-gray-400 flex items-center justify-between">
                                <span>{files.length} image{files.length !== 1 ? "s" : ""} · {cols} cols × {rows} rows</span>
                                <button onClick={() => setFiles([])} className="text-red-400 hover:text-red-300 font-semibold transition-colors">Clear all</button>
                            </div>
                        )}

                        {/* Process button */}
                        <button
                            onClick={handleProcess}
                            disabled={loading || files.length < 2}
                            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40"
                        >
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Composing…</> : "Create Collage"}
                        </button>

                        {error && (
                            <p className="text-sm text-red-400 text-center">{error}</p>
                        )}
                    </div>

                    {/* Right: Image grid + Result */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Uploaded image thumbnails */}
                        {files.length > 0 && (
                            <div className="bg-[#16122a] border border-violet-500/15 rounded-2xl p-4">
                                <p className="text-xs font-bold text-violet-400/50 uppercase tracking-wider mb-3">Selected images ({files.length}/16)</p>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                    {files.map(({ id, preview }, i) => (
                                        <div key={id} className="relative group aspect-square rounded-lg overflow-hidden border border-violet-500/15">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={preview} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button onClick={() => removeFile(id)} className="text-white hover:text-red-400 transition-colors">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <span className="absolute bottom-0.5 left-1 text-[9px] text-white/60 font-bold">{i + 1}</span>
                                        </div>
                                    ))}
                                    {/* Add more slot */}
                                    {files.length < 16 && (
                                        <button
                                            onClick={() => inputRef.current?.click()}
                                            className="aspect-square rounded-lg border border-dashed border-violet-500/20 hover:border-violet-500/50 flex items-center justify-center text-violet-400/40 hover:text-violet-400 transition-colors text-xl font-bold"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Result */}
                        {result && (
                            <div className="bg-[#16122a] border border-violet-500/30 rounded-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-3 border-b border-violet-500/15">
                                    <span className="text-sm font-semibold text-violet-400">✓ Collage ready</span>
                                    <a
                                        href={result}
                                        download="pixltools-collage.jpg"
                                        className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-1.5 rounded-lg text-sm transition-colors"
                                    >
                                        <Download size={13} /> Download
                                    </a>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={result} alt="Collage result" className="w-full" />
                            </div>
                        )}

                        {/* Empty state */}
                        {files.length === 0 && !result && (
                            <div className="border border-dashed border-violet-500/15 rounded-2xl h-64 flex flex-col items-center justify-center text-center p-8">
                                <div className="text-4xl mb-3">🖼️</div>
                                <p className="text-gray-400 font-semibold">Your collage preview will appear here</p>
                                <p className="text-xs text-violet-300/30 mt-1">Add at least 2 images to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
