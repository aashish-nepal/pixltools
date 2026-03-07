"use client";
import { useState, useRef, useEffect } from "react";
import UploadArea from "@/components/tools/UploadArea";
import AdBanner from "@/components/ui/AdBanner";
import FAQSection from "@/components/ui/FAQSection";
import { buildJsonLdWebApp, buildJsonLdFAQ, buildJsonLdBreadcrumb, buildJsonLdHowTo } from "@/lib/utils";
import {
    AlertCircle, Download, RotateCcw, Loader2,
    ShieldCheck, Zap, Infinity, UserX, CheckCircle2,
} from "lucide-react";

interface FAQ { question: string; answer: string; }

interface ToolLayoutProps {
    toolName: string;
    toolIcon: string;
    toolDesc: string;
    apiEndpoint: string;
    acceptedFormats: string[];
    outputFormat?: string;
    extraParams?: Record<string, string | number>;
    description: string[];
    howToUse: string[];
    benefits: string[];
    faqs: FAQ[];
    renderControls?: (onProcess: () => void, loading: boolean) => React.ReactNode;
    jsonMode?: boolean;
    renderJsonResult?: (data: Record<string, unknown>) => React.ReactNode;
    onImageLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const TRUST_PILLS = [
    { icon: ShieldCheck, label: "100% Private" },
    { icon: Zap, label: "Instant Processing" },
    { icon: Infinity, label: "Free Forever" },
    { icon: UserX, label: "No Signup" },
];

export default function ToolLayout({
    toolName, toolIcon, toolDesc, apiEndpoint, acceptedFormats,
    outputFormat, extraParams, description, howToUse, benefits, faqs,
    renderControls, jsonMode, renderJsonResult, onImageLoad,
}: ToolLayoutProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [jsonResult, setJsonResult] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"upload" | "process">("upload");
    const [error, setError] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [resultSize, setResultSize] = useState(0);
    const extraParamsRef = useRef(extraParams);
    extraParamsRef.current = extraParams;
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const handleFileSelect = (f: File) => {
        if (preview) URL.revokeObjectURL(preview);
        if (result) URL.revokeObjectURL(result);
        setFile(f);
        setResult(null);
        setJsonResult(null);
        setError(null);
        setProgress(0);
        setOriginalSize(f.size);
        setPreview(URL.createObjectURL(f));
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
            if (result) URL.revokeObjectURL(result);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleProcess = () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        setProgress(0);
        setPhase("upload");

        const formData = new FormData();
        formData.append("file", file);
        if (extraParamsRef.current) {
            Object.entries(extraParamsRef.current).forEach(([k, v]) => formData.append(k, String(v)));
        }

        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const pct = Math.round((e.loaded / e.total) * 70);
                setProgress(pct);
                if (pct >= 70) setPhase("process");
            }
        });

        xhr.onload = () => {
            setProgress(100);
            if (xhr.status === 429) {
                setError(`Rate limit reached. Please wait ${xhr.getResponseHeader("Retry-After") ?? 60}s before trying again.`);
                setLoading(false);
                return;
            }
            if (xhr.status !== 200) {
                const body = (() => { try { return JSON.parse(xhr.responseText); } catch { return { error: xhr.responseText }; } })();
                setError(body.error || "Processing failed. Please try again.");
                setLoading(false);
                return;
            }

            if (jsonMode) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    setJsonResult(data);
                } catch {
                    setError("Failed to parse result");
                }
            } else {
                const blob = xhr.response as Blob;
                setResultSize(blob.size);
                setResult(URL.createObjectURL(blob));
            }
            setLoading(false);
        };

        xhr.onerror = () => {
            setError("Network error. Please check your connection and try again.");
            setLoading(false);
        };

        xhr.responseType = jsonMode ? "text" : "blob";
        xhr.open("POST", apiEndpoint);
        xhr.send(formData);
    };

    const handleCancel = () => {
        xhrRef.current?.abort();
        setLoading(false);
        setProgress(0);
    };

    const handleReset = () => {
        if (preview) URL.revokeObjectURL(preview);
        if (result) URL.revokeObjectURL(result);
        setFile(null);
        setPreview(null);
        setResult(null);
        setJsonResult(null);
        setError(null);
        setProgress(0);
    };

    const getFilename = () => {
        if (!file) return "download";
        const base = file.name.replace(/\.[^.]+$/, "");
        const ext = outputFormat === "pdf" ? "pdf" : outputFormat || file.name.split(".").pop() || "jpg";
        return `${base}-pixltools.${ext}`;
    };

    const toolSlug = toolName.toLowerCase().replace(/\s+/g, "-");
    const webAppSchema = buildJsonLdWebApp(toolName, toolDesc, `https://pixltools.com/${toolSlug}`);
    const faqSchema = buildJsonLdFAQ(faqs);
    const breadcrumbSchema = buildJsonLdBreadcrumb(toolName, toolSlug);
    const howToSchema = buildJsonLdHowTo(toolName, howToUse);

    const savings = originalSize > 0 && resultSize > 0
        ? Math.round((1 - resultSize / originalSize) * 100)
        : null;

    return (
        <main className="min-h-screen bg-slate-950">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* ── Hero ────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/60">
                {/* dot-grid pattern */}
                <div className="tool-hero-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
                {/* emerald glow */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 text-center">
                    {/* icon badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-5 text-3xl shadow-lg shadow-emerald-900/30 ring-4 ring-emerald-500/5">
                        {toolIcon}
                    </div>

                    {/* title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white tracking-tight">
                        {toolName}
                    </h1>

                    {/* description */}
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                        {toolDesc}
                    </p>

                    {/* trust pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {TRUST_PILLS.map(({ icon: Icon, label }) => (
                            <span
                                key={label}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5"
                            >
                                <Icon size={12} className="text-emerald-400" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <AdBanner slot="Top Banner" />

                {/* ── Tool interface card ──────────────────────────────── */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-8">
                    {/* card header strip */}
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800 bg-slate-900/80">
                        <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                            Tool
                        </span>
                        <span className="text-sm font-semibold text-slate-300">{toolName}</span>
                        <span className="ml-auto text-xs text-slate-600">pixltools.com</span>
                    </div>

                    <div className="p-6">
                        {!file ? (
                            <UploadArea onFileSelect={handleFileSelect} acceptedFormats={acceptedFormats} />
                        ) : (
                            <div className="space-y-5">
                                {/* Image preview grid */}
                                <div className={`grid gap-4 ${result && !jsonMode ? "grid-cols-2" : "grid-cols-1"}`}>
                                    <div className="border border-slate-700/60 rounded-xl overflow-hidden bg-slate-800/30">
                                        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700/50">
                                            <span className="w-2 h-2 rounded-full bg-slate-600" />
                                            <p className="text-xs text-slate-500 font-medium">
                                                Original &middot; {(originalSize / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={preview!} alt="Original" className="w-full max-h-72 object-contain p-3" onLoad={onImageLoad} />
                                    </div>
                                    {result && !jsonMode && (
                                        <div className="border border-emerald-500/30 rounded-xl overflow-hidden bg-emerald-500/5">
                                            <div className="flex items-center gap-2 px-3 py-2 border-b border-emerald-500/20">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <p className="text-xs text-emerald-400 font-medium">
                                                    Result &middot; {(resultSize / 1024).toFixed(1)} KB
                                                    {savings !== null && savings > 0 && (
                                                        <span className="ml-2 bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                                                            ↓ {savings}% smaller
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={result} alt="Result" className="w-full max-h-72 object-contain p-3" />
                                        </div>
                                    )}
                                </div>

                                {/* JSON result panel */}
                                {jsonMode && jsonResult && renderJsonResult && (
                                    <div className="border border-slate-700 bg-slate-800/50 rounded-xl p-4">
                                        {renderJsonResult(jsonResult)}
                                    </div>
                                )}

                                {/* Progress bar */}
                                {loading && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <Loader2 size={12} className="animate-spin text-emerald-400" />
                                                {phase === "upload" ? `Uploading… ${progress}%` : "Processing…"}
                                            </span>
                                            <button onClick={handleCancel} className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors">
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Controls */}
                                {renderControls ? (
                                    renderControls(handleProcess, loading)
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            id={`process-${toolName.toLowerCase().replace(/\s+/g, "-")}`}
                                            onClick={handleProcess}
                                            disabled={loading}
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                                        >
                                            {loading ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : `Process with ${toolName}`}
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="px-5 py-3 border border-slate-700 text-slate-400 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-1.5"
                                        >
                                            <RotateCcw size={14} /> Reset
                                        </button>
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                        {error}
                                    </div>
                                )}

                                {/* Download */}
                                {result && !jsonMode && (
                                    <a
                                        href={result}
                                        download={getFilename()}
                                        className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-900/30"
                                    >
                                        <Download size={16} />
                                        Download {outputFormat?.toUpperCase() || "Result"}
                                        {savings !== null && savings > 0 && (
                                            <span className="text-xs bg-emerald-700/60 text-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                                                {savings}% smaller
                                            </span>
                                        )}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <AdBanner slot="Below Tool" />

                {/* ── About ───────────────────────────────────────────── */}
                <div className="mb-6 pl-4 border-l-2 border-emerald-500/40">
                    <h2 className="text-xl font-bold text-slate-100 mb-1">About {toolName}</h2>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-4">What it does</p>
                    <div className="space-y-3">
                        {description.map((p, i) => (
                            <p key={i} className={`leading-relaxed ${i === 0 ? "text-slate-300 text-base" : "text-slate-400 text-sm"}`}>
                                {p}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ── How to Use ──────────────────────────────────────── */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-100 mb-1">How to Use</h2>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-4">Step by step</p>
                    <div className={`grid gap-3 ${howToUse.length <= 4 ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
                        {howToUse.map((step, i) => (
                            <div
                                key={i}
                                className="step-card flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all duration-200"
                            >
                                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center text-sm font-bold">
                                    {i + 1}
                                </span>
                                <span className="text-slate-400 text-sm leading-relaxed pt-1">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <AdBanner slot="Content" />

                {/* ── Key Benefits ─────────────────────────────────────── */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-100 mb-1">Key Benefits</h2>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-4">Why use this tool</p>
                    <div className="flex flex-wrap gap-2">
                        {benefits.map((b, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 text-slate-300 text-sm font-medium rounded-xl px-4 py-2.5 transition-all duration-200"
                            >
                                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                                {b}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Stats strip ─────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-px mb-8 rounded-2xl overflow-hidden border border-slate-800">
                    {[
                        { value: "25+", label: "Free Tools" },
                        { value: "100%", label: "Free Forever" },
                        { value: "0s", label: "Sign-up Time" },
                    ].map(({ value, label }) => (
                        <div key={label} className="bg-slate-900 py-5 text-center">
                            <p className="text-2xl font-extrabold gradient-text">{value}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* ── FAQ ─────────────────────────────────────────────── */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-100 mb-1">Frequently Asked Questions</h2>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-4">Common questions</p>
                    <FAQSection faqs={faqs} />
                </div>

                <AdBanner slot="Footer" />
            </div>
        </main>
    );
}
