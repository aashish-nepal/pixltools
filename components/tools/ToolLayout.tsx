"use client";
import { useState, useRef, useEffect, useCallback, DragEvent } from "react";
import Link from "next/link";
import UploadArea from "@/components/tools/UploadArea";
import ToolIcon from "@/components/ui/ToolIcon";
import AdBanner from "@/components/ui/AdBanner";
import FAQSection from "@/components/ui/FAQSection";
import { TOOLS } from "@/lib/tools-data";
import { TOOL_ICON_MAP } from "@/lib/icons";
import {
  Warning,
  DownloadSimple,
  ArrowCounterClockwise,
  SpinnerGap,
  ShieldCheck,
  Lightning,
  Infinity,
  UserMinus,
  CheckCircle,
  ShareNetwork,
  XLogo,
  ArrowRight,
  Lock,
  Clock,
  House,
  CaretRight,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MagnifyingGlassPlus,
  X,
  ArrowsClockwise,
} from "@phosphor-icons/react";

interface FAQ {
  question: string;
  answer: string;
}

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
  category?: string;
  slug?: string;
  previewTransform?: string;
  interactiveCrop?: {
    left: number;
    top: number;
    width: number;
    height: number;
    aspectPreset: string | null;
    onChange: (c: {
      left: number;
      top: number;
      width: number;
      height: number;
    }) => void;
  };
  renderPreviewActions?: React.ReactNode;
  minPreviewHeight?: string;
}

type ProcessPhase = "idle" | "upload" | "process" | "done";

// Format → display color
const FORMAT_COLORS: Record<string, string> = {
  jpeg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  jpg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  png: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  webp: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  gif: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  pdf: "bg-red-500/20 text-red-300 border-red-500/30",
  svg: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

// Before/After Slider Component
function BeforeAfterSlider({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Clamp to 0.1 minimum to avoid division by zero when computing overlay width
    const pct = Math.max(
      0.1,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    setPosition(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove as EventListener);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl border border-violet-500/15 cursor-col-resize checker-bg"
      style={{ userSelect: "none" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt="Result"
        className="w-full max-h-72 object-contain"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Original"
          className="w-full max-h-72 object-contain"
          style={{ width: `${10000 / position}%` }}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-black/50"
        style={{ left: `${position}%` }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize"
          onMouseDown={(e) => {
            e.preventDefault();
            dragging.current = true;
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            dragging.current = true;
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 4L2 8L5 12"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 4L14 8L11 12"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-2 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
        BEFORE
      </div>
      <div className="absolute top-2 right-3 bg-violet-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
        AFTER
      </div>
    </div>
  );
}

// File size comparison bar
function SizeBars({ original, result }: { original: number; result: number }) {
  const origKb = (original / 1024).toFixed(1);
  const resKb = (result / 1024).toFixed(1);
  const savings = Math.round((1 - result / original) * 100);
  return (
    <div className="space-y-2 bg-[#0f0d1f] rounded-xl p-4 border border-violet-500/10">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
        File Size Comparison
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-16 text-right shrink-0">
            Original
          </span>
          <div className="flex-1 h-4 bg-violet-500/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500/40 rounded-full"
              style={{ width: "100%" }}
            />
          </div>
          <span className="text-xs text-gray-400 w-14 shrink-0">
            {origKb} KB
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 w-16 text-right shrink-0">
            Result
          </span>
          <div className="flex-1 h-4 bg-violet-500/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{
                width: `${Math.round((result / original) * 100)}%`,
                maxWidth: "100%",
              }}
            />
          </div>
          <span className="text-xs text-emerald-400 w-14 shrink-0">
            {resKb} KB
          </span>
        </div>
      </div>
      {savings > 0 && (
        <p className="text-center text-sm font-bold text-emerald-400 mt-2">
          ↓ {savings}% reduction in file size
        </p>
      )}
    </div>
  );
}

// Lightbox
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="lightbox-backdrop fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Full size preview"
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-4 text-white/40 text-xs">
        Press ESC or click outside to close
      </p>
    </div>
  );
}

// ─── Interactive Crop Overlay ────────────────────────────────────────────────
type HandleId = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

function CropOverlay({
  imgRef,
  crop,
  naturalW,
  naturalH,
  aspectPreset,
  onChange,
}: {
  imgRef: React.RefObject<HTMLImageElement | null>;
  crop: { left: number; top: number; width: number; height: number };
  naturalW: number;
  naturalH: number;
  aspectPreset: string | null;
  onChange: (c: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{
    type: "draw" | "move" | "resize";
    handle: HandleId | null;
    startClientX: number;
    startClientY: number;
    startCrop: typeof crop;
  } | null>(null);

  const computeBounds = useCallback(() => {
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!img || !overlay) return null;
    const ir = img.getBoundingClientRect();
    const or = overlay.getBoundingClientRect();
    const pad = 12; // p-3 = 12px
    const ex = ir.left - or.left + pad;
    const ey = ir.top - or.top + pad;
    const cW = ir.width - pad * 2;
    const cH = ir.height - pad * 2;
    const nr = naturalW / naturalH;
    const cr = cW / cH;
    const [iW, iH] = nr > cr ? [cW, cW / nr] : [cH * nr, cH];
    return { left: ex + (cW - iW) / 2, top: ey + (cH - iH) / 2, w: iW, h: iH };
  }, [imgRef, naturalW, naturalH]);

  const applyAspect = useCallback(
    (c: typeof crop): typeof crop => {
      if (!aspectPreset || aspectPreset === "Free") return c;
      const [pw, ph] = aspectPreset.split(":").map(Number);
      const h = Math.min(Math.round(c.width / (pw / ph)), naturalH - c.top);
      return { ...c, height: Math.max(1, h) };
    },
    [aspectPreset, naturalH]
  );

  const toNat = useCallback(
    (
      sx: number,
      sy: number,
      b: { left: number; top: number; w: number; h: number }
    ) => ({
      x: Math.max(
        0,
        Math.min(naturalW, Math.round(((sx - b.left) / b.w) * naturalW))
      ),
      y: Math.max(
        0,
        Math.min(naturalH, Math.round(((sy - b.top) / b.h) * naturalH))
      ),
    }),
    [naturalW, naturalH]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current) return;
      const b = computeBounds();
      if (!b) return;
      const or = overlayRef.current!.getBoundingClientRect();
      const mx = e.clientX - or.left;
      const my = e.clientY - or.top;
      const sx0 = drag.current.startClientX - or.left;
      const sy0 = drag.current.startClientY - or.top;
      const sc = drag.current.startCrop;
      const dxNat = Math.round(((mx - sx0) / b.w) * naturalW);
      const dyNat = Math.round(((my - sy0) / b.h) * naturalH);

      if (drag.current.type === "draw") {
        const a = toNat(sx0, sy0, b);
        const c = toNat(mx, my, b);
        const l = Math.min(a.x, c.x),
          t = Math.min(a.y, c.y);
        const w = Math.max(4, Math.abs(c.x - a.x)),
          h = Math.max(4, Math.abs(c.y - a.y));
        onChange(applyAspect({ left: l, top: t, width: w, height: h }));
        return;
      }
      if (drag.current.type === "move") {
        onChange({
          ...sc,
          left: Math.max(0, Math.min(naturalW - sc.width, sc.left + dxNat)),
          top: Math.max(0, Math.min(naturalH - sc.height, sc.top + dyNat)),
        });
        return;
      }
      if (drag.current.type === "resize") {
        let { left: l, top: t, width: w, height: h } = sc;
        const hd = drag.current.handle;
        if (hd?.includes("e")) w = Math.max(8, w + dxNat);
        if (hd?.includes("s")) h = Math.max(8, h + dyNat);
        if (hd?.includes("w")) {
          const nl = Math.min(sc.left + sc.width - 8, sc.left + dxNat);
          w = sc.width - (nl - sc.left);
          l = nl;
        }
        if (hd?.includes("n")) {
          const nt = Math.min(sc.top + sc.height - 8, sc.top + dyNat);
          h = sc.height - (nt - sc.top);
          t = nt;
        }
        l = Math.max(0, l);
        t = Math.max(0, t);
        w = Math.min(naturalW - l, w);
        h = Math.min(naturalH - t, h);
        onChange(applyAspect({ left: l, top: t, width: w, height: h }));
      }
    };
    const onUp = () => {
      drag.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [computeBounds, toNat, applyAspect, naturalW, naturalH, onChange]);

  const b = computeBounds();
  const cursors: Record<HandleId, string> = {
    nw: "nw-resize",
    n: "n-resize",
    ne: "ne-resize",
    e: "e-resize",
    se: "se-resize",
    s: "s-resize",
    sw: "sw-resize",
    w: "w-resize",
  };

  // Always render so overlayRef mounts; early-return (without ref) only if no bounds
  const sx = b ? b.left + (crop.left / naturalW) * b.w : 0;
  const sy = b ? b.top + (crop.top / naturalH) * b.h : 0;
  const sw = b ? (crop.width / naturalW) * b.w : 0;
  const sh = b ? (crop.height / naturalH) * b.h : 0;

  const handles: { id: HandleId; cx: number; cy: number }[] = b
    ? [
      { id: "nw", cx: sx, cy: sy },
      { id: "n", cx: sx + sw / 2, cy: sy },
      { id: "ne", cx: sx + sw, cy: sy },
      { id: "w", cx: sx, cy: sy + sh / 2 },
      { id: "e", cx: sx + sw, cy: sy + sh / 2 },
      { id: "sw", cx: sx, cy: sy + sh },
      { id: "s", cx: sx + sw / 2, cy: sy + sh },
      { id: "se", cx: sx + sw, cy: sy + sh },
    ]
    : [];

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 select-none"
      style={{ cursor: "crosshair", zIndex: 10 }}
      onMouseDown={(e) => {
        e.preventDefault();
        drag.current = {
          type: "draw",
          handle: null,
          startClientX: e.clientX,
          startClientY: e.clientY,
          startCrop: crop,
        };
      }}
    >
      {b && (
        <>
          {/* Dim regions outside crop */}
          <div
            className="absolute bg-black/55 pointer-events-none"
            style={{ left: 0, top: 0, right: 0, height: sy }}
          />
          <div
            className="absolute bg-black/55 pointer-events-none"
            style={{ left: 0, top: sy + sh, right: 0, bottom: 0 }}
          />
          <div
            className="absolute bg-black/55 pointer-events-none"
            style={{ left: 0, top: sy, width: sx, height: sh }}
          />
          <div
            className="absolute bg-black/55 pointer-events-none"
            style={{ left: sx + sw, top: sy, right: 0, height: sh }}
          />

          {/* Crop selection */}
          <div
            className="absolute"
            style={{
              left: sx,
              top: sy,
              width: sw,
              height: sh,
              cursor: "move",
              boxShadow:
                "0 0 0 2px rgba(255,255,255,0.9), 0 0 0 3.5px rgba(139,92,246,0.7)",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              drag.current = {
                type: "move",
                handle: null,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startCrop: crop,
              };
            }}
          >
            {/* Rule of thirds */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)",
                backgroundSize: "33.33% 33.33%",
              }}
            />
            {/* Dimensions badge */}
            <div className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded pointer-events-none">
              {crop.width} × {crop.height}
            </div>
          </div>

          {/* Resize handles */}
          {handles.map(({ id, cx, cy }) => (
            <div
              key={id}
              className="absolute bg-white border-2 border-violet-500 rounded-sm shadow-md"
              style={{
                left: cx - 5,
                top: cy - 5,
                width: 10,
                height: 10,
                cursor: cursors[id],
                zIndex: 20,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                drag.current = {
                  type: "resize",
                  handle: id,
                  startClientX: e.clientX,
                  startClientY: e.clientY,
                  startCrop: crop,
                };
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default function ToolLayout({
  toolName,
  toolIcon,
  toolDesc,
  apiEndpoint,
  acceptedFormats,
  outputFormat,
  extraParams,
  description,
  howToUse,
  benefits,
  faqs,
  renderControls,
  jsonMode,
  renderJsonResult,
  onImageLoad,
  category,
  slug,
  previewTransform,
  interactiveCrop,
  renderPreviewActions,
  minPreviewHeight = "auto",
}: ToolLayoutProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [jsonResult, setJsonResult] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<ProcessPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultSize, setResultSize] = useState(0);
  const [sliderMode, setSliderMode] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  // New state
  const [imgDims, setImgDims] = useState<{ w: number; h: number } | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [isDragOverPreview, setIsDragOverPreview] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const extraParamsRef = useRef(extraParams);
  extraParamsRef.current = extraParams;
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  // Derived
  const fileExt = file ? (file.type.split("/")[1] || "").toLowerCase() : "";
  const formatColor =
    FORMAT_COLORS[fileExt] ||
    "bg-violet-500/20 text-violet-300 border-violet-500/30";
  const isTransparentFormat =
    fileExt === "png" || fileExt === "webp" || fileExt === "gif";

  // Load persisted feedback
  useEffect(() => {
    const stored = localStorage.getItem(`feedback-${slug}`);
    if (stored === "up" || stored === "down")
      setFeedback(stored as "up" | "down");
  }, [slug]);

  // Fix #4: wrap in useCallback so the keydown listener always has the latest version
  const handleProcess = useCallback(() => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setPhase("upload");

    const formData = new FormData();
    formData.append("file", file);
    if (extraParamsRef.current) {
      Object.entries(extraParamsRef.current).forEach(([k, v]) =>
        formData.append(k, String(v))
      );
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
      setPhase("done");
      if (xhr.status === 429) {
        setError(
          `Rate limit reached. Please wait ${xhr.getResponseHeader("Retry-After") ?? 60
          }s before trying again.`
        );
        setLoading(false);
        return;
      }
      if (xhr.status !== 200) {
        const body = (() => {
          try {
            return JSON.parse(xhr.responseText);
          } catch {
            return { error: xhr.responseText };
          }
        })();
        setError(body.error || "Processing failed. Please try again.");
        setLoading(false);
        return;
      }
      if (jsonMode) {
        try {
          setJsonResult(JSON.parse(xhr.responseText));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, jsonMode, apiEndpoint]);

  // Keyboard shortcuts — handleProcess is a stable useCallback, safe to add as dep
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger in inputs/textareas
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName
        )
      )
        return;
      if (e.key === "Enter" && file && !loading && !result) handleProcess();
      if (
        (e.key === "r" || e.key === "R") &&
        !e.metaKey &&
        !e.ctrlKey &&
        file &&
        !loading
      )
        handleReset();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [file, loading, result, handleProcess]);

  // Related tools
  const relatedTools = TOOLS.filter(
    (t) => t.category === category && t.slug !== slug
  ).slice(0, 4);

  const handleFileSelect = (f: File) => {
    // Fix #11: validate format client-side for instant feedback
    if (acceptedFormats.length > 0 && !acceptedFormats.includes(f.type)) {
      const extensions = acceptedFormats.map((m) => m.split("/")[1].toUpperCase()).join(", ");
      setError(`Unsupported file type. Please upload: ${extensions}`);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(f);
    setResult(null);
    setJsonResult(null);
    setError(null);
    setProgress(0);
    setSliderMode(false);
    setPhase("idle");
    setOriginalSize(f.size);
    setImgDims(null);
    setPreview(URL.createObjectURL(f));
  };

  // Fix #5: track object URLs in refs so unmount cleanup always has the latest values
  const previewUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  useEffect(() => { previewUrlRef.current = preview; }, [preview]);
  useEffect(() => { resultUrlRef.current = result; }, [result]);
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const handleCancel = () => {
    xhrRef.current?.abort();
    setLoading(false);
    setProgress(0);
    setPhase("idle");
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
    setSliderMode(false);
    setPhase("idle");
    setImgDims(null);
  };

  // Keep result but clear output so user can tweak settings
  const handleTryAgain = () => {
    if (result) URL.revokeObjectURL(result);
    setResult(null);
    setJsonResult(null);
    setError(null);
    setProgress(0);
    setPhase("idle");
  };

  const getFilename = () => {
    if (!file) return "download";
    const base = file.name.replace(/\.[^.]+$/, "");
    const ext =
      outputFormat === "pdf"
        ? "pdf"
        : outputFormat || file.name.split(".").pop() || "jpg";
    return `${base}-pixltools.${ext}`;
  };

  const savings =
    originalSize > 0 && resultSize > 0
      ? Math.round((1 - resultSize / originalSize) * 100)
      : null;

  const handleShare = () => {
    const savingsText =
      savings !== null && savings > 0
        ? `I just saved ${savings}% on my image file size`
        : "I just optimized my image";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${savingsText} using PixlTools! 🚀 pixltools.com`
      )}`,
      "_blank"
    );
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleCopyImage = async () => {
    if (!result) return;
    try {
      const res = await fetch(result);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
    } catch {
      window.open(result, "_blank");
    }
  };

  const handleFeedback = (val: "up" | "down") => {
    setFeedback(val);
    localStorage.setItem(`feedback-${slug}`, val);
  };

  // Drag-replace onto preview
  const handlePreviewDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverPreview(true);
  };
  const handlePreviewDragLeave = () => setIsDragOverPreview(false);
  const handlePreviewDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverPreview(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImgDims({ w: img.naturalWidth, h: img.naturalHeight });
    onImageLoad?.(e);
  };

  const phaseLabel = () => {
    if (phase === "upload") return `⬆ Uploading (${progress}%)`;
    if (phase === "process") return "⚙ Optimizing your image…";
    if (phase === "done") return "✓ Ready";
    return "";
  };

  // Truncate long filenames
  const shortName = (name: string) =>
    name.length > 28 ? name.slice(0, 25) + "…" : name;
  const formatTags = Array.from(
    new Set(
      acceptedFormats.map((format) => {
        const ext = format.split("/")[1];
        if (!ext || ext === "*") return "ANY";
        return ext.toUpperCase();
      })
    )
  );
  const visibleFormats = formatTags.slice(0, 5);
  const extraFormatCount = Math.max(
    0,
    formatTags.length - visibleFormats.length
  );

  const toolSlug = slug || toolName.toLowerCase().replace(/\s+/g, "-");
  const toolIconName = TOOL_ICON_MAP[toolSlug];

  return (
    <main className="min-h-screen bg-[#0b0816]">

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── Hero ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0f0d1f] border-b border-violet-500/10">
        <div
          className="tool-hero-pattern absolute inset-0 pointer-events-none opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-16 left-1/3 w-[300px] h-[200px] rounded-full bg-purple-500/8 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 pb-12 text-center">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-violet-400 transition-colors"
            >
              <House size={11} />
              Home
            </Link>
            <CaretRight size={10} className="text-gray-700" />
            <Link
              href="/#tools"
              className="hover:text-violet-400 transition-colors"
            >
              Tools
            </Link>
            {category && (
              <>
                <CaretRight size={10} className="text-gray-700" />
                <span className="text-gray-600 capitalize">{category}</span>
              </>
            )}
            <CaretRight size={10} className="text-gray-700" />
            <span className="text-violet-400">{toolName}</span>
          </nav>

          {/* Tool heading */}
          <div className="py-10">
            <h1 className="inline-flex items-center gap-3 font-display text-gray-200 leading-tight text-2xl sm:text-4xl lg:text-5xl rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 shadow-lg shadow-violet-900/20">
              <span
                aria-hidden="true"
                className="relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 shrink-0"
              >
                <span
                  className="absolute inset-0 bg-violet-500/10 blur-xl rounded-xl"
                  aria-hidden="true"
                />
                <span className="relative z-10">
                  <ToolIcon
                    name={toolIconName ?? "FileImage"}
                    size={20}
                    className="text-violet-200"
                  />
                </span>
              </span>
              {toolName}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <AdBanner slot="Top Banner" />

        {/* Privacy strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-gray-500 font-medium py-3 mb-2">
          {[
            { icon: Lock, text: "Files never stored on server" },
            { icon: Clock, text: "Auto-deleted after processing" },
            { icon: ShieldCheck, text: "SSL encrypted transfer" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <Icon size={12} className="text-violet-400/60" />
              {text}
            </span>
          ))}
        </div>

        {/* ── Tool interface card ─────────────────────────────── */}
        <div className="bg-[#16122a] rounded-2xl border border-violet-500/15 overflow-hidden mb-8 shadow-xl shadow-violet-900/20">
          {/* Card header */}
          <div className="tool-card-header flex items-center gap-2 px-5 py-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-violet-400 uppercase bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
              Tool
            </span>
            <span className="text-sm font-semibold text-violet-100">
              {toolName}
            </span>
            {file && (
              <span className={`format-badge border ${formatColor} ml-1`}>
                {fileExt}
              </span>
            )}
            <span className="ml-auto text-xs text-gray-600">pixltools.com</span>
          </div>

          <div className="p-5 sm:p-6">
            {!file ? (
              <UploadArea
                onFileSelect={handleFileSelect}
                acceptedFormats={acceptedFormats}
              />
            ) : (
              /* ═══ Workspace: 2-column on desktop ═══ */
              <div className="workspace-enter">
                {/* ── Two-column grid ─────────────────── */}
                <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
                  {/* ── LEFT COL: Image preview / Results ── */}
                  <div className="space-y-4">
                    {/* Pre-process: original preview with drag-replace */}
                    {!result && !(jsonMode && jsonResult) && (
                      <div
                        className={`relative rounded-xl overflow-hidden border transition-all duration-200 ${isDragOverPreview
                          ? "drag-replace-overlay"
                          : "border-violet-500/15"
                          }`}
                        onDragOver={handlePreviewDragOver}
                        onDragLeave={handlePreviewDragLeave}
                        onDrop={handlePreviewDrop}
                      >
                        {/* Preview header with full metadata */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-violet-500/10 bg-[#1c1738]">
                          <span className="w-2 h-2 rounded-full bg-violet-300/40" />
                          <span className="text-xs text-gray-400 font-medium truncate flex-1">
                            {shortName(file.name)}
                          </span>
                          {imgDims && (
                            <span className="text-xs text-gray-600 shrink-0">
                              {imgDims.w}×{imgDims.h}
                            </span>
                          )}
                          <span className="text-xs text-gray-600 shrink-0">
                            {(originalSize / 1024).toFixed(1)} KB
                          </span>
                          <button
                            onClick={() => preview && setLightboxSrc(preview)}
                            className="text-gray-600 hover:text-violet-400 transition-colors shrink-0 ml-1"
                            title="View full size"
                          >
                            <MagnifyingGlassPlus size={14} />
                          </button>
                        </div>

                        {/* Image with processing overlay */}
                        <div
                          className={`checker-bg relative overflow-hidden flex items-center justify-center ${interactiveCrop && !loading ? "" : "cursor-zoom-in"
                            }`}
                          style={{
                            minHeight: minPreviewHeight,
                          }}
                          onClick={() =>
                            !interactiveCrop &&
                            preview &&
                            !loading &&
                            setLightboxSrc(preview)
                          }
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            ref={imgRef}
                            src={preview!}
                            alt="Original"
                            className={`w-full max-h-[480px] object-contain p-3 transition-all duration-300 ${loading
                              ? "processing-overlay"
                              : "image-preview-ready"
                              }`}
                            style={{
                              transform: previewTransform,
                              transition: "transform 0.25s ease",
                            }}
                            onLoad={handleImgLoad}
                          />
                          {/* Processing spinner */}
                          {loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                              <SpinnerGap
                                size={32}
                                weight="bold"
                                className="animate-spin text-violet-400"
                              />
                              <span className="text-xs text-violet-300 font-semibold bg-[#16122a]/80 px-3 py-1 rounded-full">
                                {phaseLabel()}
                              </span>
                            </div>
                          )}
                          {/* Drag-replace overlay */}
                          {isDragOverPreview && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <ArrowsClockwise
                                  size={32}
                                  className="text-violet-300 mx-auto mb-2"
                                />
                                <p className="text-sm font-bold text-violet-200">
                                  Drop to replace image
                                </p>
                              </div>
                            </div>
                          )}
                          {/* Interactive Crop Overlay */}
                          {interactiveCrop && !loading && imgDims && (
                            <CropOverlay
                              imgRef={imgRef}
                              crop={interactiveCrop}
                              naturalW={imgDims.w}
                              naturalH={imgDims.h}
                              aspectPreset={interactiveCrop.aspectPreset}
                              onChange={interactiveCrop.onChange}
                            />
                          )}
                        </div>

                        {/* Drag-hint footer */}
                        {!loading && (
                          <div className="px-3 py-1.5 border-t border-violet-500/8 flex items-center justify-between">
                            <span className="text-[10px] text-gray-700">
                              Drag a new image here to replace
                            </span>
                            {!interactiveCrop && (
                              <span className="text-[10px] text-gray-700">
                                Click image to zoom
                              </span>
                            )}
                          </div>
                        )}
                        {/* Tool-specific preview action bar (e.g. rotation buttons) */}
                        {renderPreviewActions && !loading && (
                          <div className="border-t border-violet-500/10">
                            {renderPreviewActions}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post-process: Before / After result */}
                    {result && !jsonMode && (
                      <div className="space-y-4">
                        {/* Success badge */}
                        <div className="success-badge flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5">
                          <CheckCircle
                            size={16}
                            weight="duotone"
                            className="text-emerald-400"
                          />
                          <span className="text-sm font-semibold text-emerald-400">
                            Processing complete
                            {savings !== null && savings > 0
                              ? ` — saved ${savings}%`
                              : ""}
                            !
                          </span>
                        </div>

                        {/* View toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">
                            Before / After
                          </span>
                          <button
                            onClick={() => setSliderMode((v) => !v)}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${sliderMode
                              ? "bg-violet-500/10 border-violet-500/30 text-violet-400"
                              : "border-violet-500/15 text-gray-500 hover:border-violet-500/30 hover:text-violet-400"
                              }`}
                          >
                            {sliderMode ? "Split View ✓" : "Slider View"}
                          </button>
                        </div>

                        {sliderMode ? (
                          <BeforeAfterSlider before={preview!} after={result} />
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            <div
                              className="border border-violet-500/15 rounded-xl overflow-hidden checker-bg cursor-zoom-in"
                              onClick={() => preview && setLightboxSrc(preview)}
                            >
                              <div className="flex items-center gap-2 px-3 py-2 border-b border-violet-500/10 bg-[#1c1738]">
                                <span className="w-2 h-2 rounded-full bg-violet-300/30" />
                                <p className="text-xs text-gray-400 font-medium">
                                  Original · {(originalSize / 1024).toFixed(1)}{" "}
                                  KB
                                </p>
                                <MagnifyingGlassPlus
                                  size={11}
                                  className="ml-auto text-gray-600"
                                />
                              </div>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={preview!}
                                alt="Original"
                                className="w-full max-h-64 object-contain p-3"
                              />
                            </div>
                            <div
                              className="border border-emerald-500/25 rounded-xl overflow-hidden checker-bg cursor-zoom-in"
                              onClick={() => setLightboxSrc(result)}
                            >
                              <div className="flex items-center gap-2 px-3 py-2 border-b border-emerald-500/15 bg-[#1c1738]">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <p className="text-xs text-emerald-400 font-medium">
                                  Result · {(resultSize / 1024).toFixed(1)} KB
                                  {savings !== null && savings > 0 && (
                                    <span className="ml-2 bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                                      ↓ {savings}%
                                    </span>
                                  )}
                                </p>
                                <MagnifyingGlassPlus
                                  size={11}
                                  className="ml-auto text-emerald-600/60"
                                />
                              </div>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={result}
                                alt="Result"
                                className="w-full max-h-64 object-contain p-3"
                              />
                            </div>
                          </div>
                        )}
                        {/* Fix #12: only show SizeBars for binary image results, not JSON tools */}
                        {!jsonMode && resultSize > 0 && originalSize > 0 && (
                          <SizeBars
                            original={originalSize}
                            result={resultSize}
                          />
                        )}
                      </div>
                    )}

                    {/* JSON result (left col, full width) */}
                    {jsonMode && jsonResult && renderJsonResult && (
                      <div className="border border-violet-500/15 bg-[#0f0d1f] rounded-xl p-4">
                        {renderJsonResult(jsonResult)}
                      </div>
                    )}
                  </div>

                  {/* ── RIGHT COL: Controls + Actions ── */}
                  <div className="space-y-4">
                    {/* File metadata card */}
                    <div className="bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                      <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-3">
                        File Info
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Name</span>
                          <span
                            className="text-gray-300 font-medium truncate ml-4 max-w-[160px]"
                            title={file.name}
                          >
                            {shortName(file.name)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Format</span>
                          <span
                            className={`format-badge border ${formatColor}`}
                          >
                            {fileExt.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Size</span>
                          <span className="text-gray-300 font-medium">
                            {(originalSize / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        {imgDims && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Dimensions</span>
                            <span className="text-gray-300 font-medium">
                              {imgDims.w} × {imgDims.h} px
                            </span>
                          </div>
                        )}
                        {resultSize > 0 && (
                          <div className="flex items-center justify-between border-t border-violet-500/10 pt-2 mt-1">
                            <span className="text-emerald-500">
                              Output size
                            </span>
                            <span className="text-emerald-400 font-bold">
                              {(resultSize / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ready chip (pre-process, not loading, no result) */}
                    {!result && !loading && !jsonResult && (
                      <div className="flex items-center gap-2 bg-violet-500/8 border border-violet-500/15 rounded-xl px-4 py-2.5">
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-violet-300">
                          Ready to process — press{" "}
                          <kbd className="bg-violet-500/20 border border-violet-500/30 px-1 py-0.5 rounded text-[10px] font-mono">
                            Enter
                          </kbd>
                        </span>
                      </div>
                    )}

                    {/* Progress bar */}
                    {loading && (
                      <div className="space-y-2 bg-[#0f0d1f] rounded-xl border border-violet-500/10 p-4">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <SpinnerGap
                              size={12}
                              weight="bold"
                              className="animate-spin text-violet-400"
                            />
                            {phaseLabel()}
                          </span>
                          <button
                            onClick={handleCancel}
                            className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="w-full h-2 bg-violet-500/10 rounded-full overflow-hidden">
                          <div
                            className="h-full progress-shimmer rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-600 text-center">
                          {phase === "upload"
                            ? "Uploading securely via SSL…"
                            : "Processing with high-quality algorithm…"}
                        </p>
                      </div>
                    )}

                    {/* Tool controls */}
                    {renderControls ? (
                      renderControls(handleProcess, loading)
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <button
                            id={`process-${toolSlug}`}
                            onClick={handleProcess}
                            disabled={loading}
                            className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40"
                          >
                            {loading ? (
                              <>
                                <SpinnerGap
                                  size={16}
                                  weight="bold"
                                  className="animate-spin"
                                />{" "}
                                Processing…
                              </>
                            ) : (
                              `${toolName} →`
                            )}
                          </button>
                          <button
                            onClick={handleReset}
                            className="px-4 py-3 border border-violet-500/20 text-violet-300/60 rounded-xl hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-200 flex items-center justify-center gap-1.5"
                            title="Reset (R)"
                            aria-label="Reset"
                          >
                            <ArrowCounterClockwise size={14} weight="regular" />
                          </button>
                        </div>
                        {/* Keyboard hints */}
                        <div className="flex items-center justify-center gap-3 text-[11px] text-gray-700">
                          <span className="flex items-center gap-1">
                            <kbd className="bg-[#0f0d1f] border border-violet-500/15 text-violet-500/70 px-1.5 py-0.5 rounded text-[10px] font-mono">
                              Enter
                            </kbd>{" "}
                            process
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <kbd className="bg-[#0f0d1f] border border-violet-500/15 text-violet-500/70 px-1.5 py-0.5 rounded text-[10px] font-mono">
                              R
                            </kbd>{" "}
                            reset
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <kbd className="bg-[#0f0d1f] border border-violet-500/15 text-violet-500/70 px-1.5 py-0.5 rounded text-[10px] font-mono">
                              Ctrl+V
                            </kbd>{" "}
                            paste
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Error */}
                    {error && (
                      <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                        <Warning
                          size={16}
                          weight="duotone"
                          className="mt-0.5 flex-shrink-0"
                        />
                        {error}
                      </div>
                    )}

                    {/* Download section (post-process) */}
                    {result && !jsonMode && (
                      <div className="space-y-3">
                        <a
                          href={result}
                          download={getFilename()}
                          className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-violet-900/40 text-base w-full"
                        >
                          <DownloadSimple size={18} weight="duotone" />
                          Download {outputFormat?.toUpperCase() || "Result"}
                          {savings !== null && savings > 0 && (
                            <span className="text-xs bg-violet-800/60 text-violet-200 px-2 py-0.5 rounded-full font-semibold">
                              {savings}% smaller
                            </span>
                          )}
                        </a>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={handleCopyImage}
                            className="relative flex flex-col items-center gap-1 px-3 py-2.5 border border-violet-500/20 text-violet-300/60 hover:border-violet-500/40 hover:text-violet-300 rounded-xl transition-all duration-200 text-xs font-medium"
                          >
                            <Copy size={15} weight="duotone" />
                            Copy
                            {/* Fix #10: announce toast to screen readers */}
                            {copyToast && (
                              <span role="status" aria-live="polite" className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#16122a] text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap border border-violet-500/20">
                                Copied!
                              </span>
                            )}
                          </button>
                          <button
                            onClick={handleShare}
                            className="relative flex flex-col items-center gap-1 px-3 py-2.5 border border-violet-500/20 text-violet-300/60 hover:border-sky-500/50 hover:text-sky-400 rounded-xl transition-all duration-200 text-xs font-medium"
                          >
                            {/* Fix #20: updated to X logo */}
                            <XLogo size={15} weight="duotone" />
                            Share
                            {shareToast && (
                              <span role="status" aria-live="polite" className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#16122a] text-violet-400 text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap border border-violet-500/20">
                                Opening…
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => setSliderMode((v) => !v)}
                            className="flex flex-col items-center gap-1 px-3 py-2.5 border border-violet-500/20 text-violet-300/60 hover:border-violet-500/40 hover:text-violet-300 rounded-xl transition-all duration-200 text-xs font-medium"
                          >
                            <ShareNetwork size={15} weight="duotone" />
                            {sliderMode ? "Split" : "Slider"}
                          </button>
                        </div>

                        {/* Try different settings */}
                        <button
                          onClick={handleTryAgain}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-violet-500/15 text-gray-500 hover:border-violet-500/30 hover:text-violet-300 rounded-xl transition-all duration-200 text-xs font-medium"
                        >
                          <ArrowsClockwise size={13} />
                          Try different settings
                        </button>

                        {/* Feedback */}
                        <div className="flex items-center justify-center gap-3 pt-1">
                          <span className="text-xs text-gray-600">
                            Was this helpful?
                          </span>
                          <button
                            onClick={() => handleFeedback("up")}
                            className={`feedback-btn flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${feedback === "up"
                              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                              : "border-violet-500/15 text-gray-600 hover:border-emerald-500/30 hover:text-emerald-400"
                              }`}
                          >
                            <ThumbsUp
                              size={13}
                              weight={feedback === "up" ? "duotone" : "regular"}
                            />
                            {feedback === "up" ? "Thanks!" : "Yes"}
                          </button>
                          <button
                            onClick={() => handleFeedback("down")}
                            className={`feedback-btn flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${feedback === "down"
                              ? "bg-red-500/10 border-red-500/20 text-red-400"
                              : "border-violet-500/15 text-gray-600 hover:border-red-500/20 hover:text-red-400"
                              }`}
                          >
                            <ThumbsDown
                              size={13}
                              weight={
                                feedback === "down" ? "duotone" : "regular"
                              }
                            />
                            {feedback === "down" ? "Got it" : "No"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* JSON-mode post-result actions */}
                    {jsonMode && jsonResult && (
                      <button
                        onClick={handleTryAgain}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-violet-500/15 text-gray-500 hover:border-violet-500/30 hover:text-violet-300 rounded-xl transition-all duration-200 text-xs font-medium"
                      >
                        <ArrowsClockwise size={13} />
                        Analyze a different image
                      </button>
                    )}
                  </div>
                </div>
                {/* End 2-col grid */}
              </div>
            )}
          </div>
        </div>

        <AdBanner slot="Below Tool" />

        {/* ── About ───────────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-8 bg-violet-500/70" />
              System Overview
            </div>
            <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              About {toolName}
            </h2>
            <div
              className="relative rounded-xl border border-violet-500/15 bg-[#151132] px-4 py-3 my-6 text-md text-gray-400 leading-relaxed shadow-[0_10px_40px_rgba(120,80,255,0.12)]"
              style={{ textAlign: "justify" }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{ background: "linear-gradient(120deg, rgba(139,92,246,0.12), transparent 45%, rgba(56,189,248,0.08))" }}
                aria-hidden="true"
              />
              <p className="relative">
                {description.join(" ")}
              </p>
            </div>
          </div>
        </div>

        {/* ── How to Use ──────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-8 bg-violet-500/70" />
              Execution Flow
            </div>
            <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              How to Use
            </h2>
            <div className="relative">
              <div
                className="hidden md:block absolute left-[15px] top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/30 via-violet-500/15 to-transparent"
                aria-hidden="true"
              />
              <div className="grid gap-3 my-6 md:grid-cols-2">
                {howToUse.map((step, i) => (
                  <div
                    key={i}
                    className="step-card flex items-start gap-4 bg-[#16122a] border border-violet-500/15 rounded-xl p-4 hover:border-violet-500/30 transition-all duration-200"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-600/30 to-purple-600/20 text-violet-300 border border-violet-500/25 rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-400 text-sm leading-relaxed pt-1">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AdBanner slot="Content" />

        {/* ── Key Benefits ─────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-8 bg-violet-500/70" />
              Capability Highlights
            </div>
            <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              Key Benefits
            </h2>
            <div className="flex flex-wrap gap-2 my-6">
              {benefits.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-[#16122a] border border-violet-500/15 hover:border-violet-500/30 text-gray-400 text-sm font-medium rounded-xl px-4 py-2.5 transition-all duration-200"
                >
                  <CheckCircle
                    size={14}
                    weight="duotone"
                    className="text-violet-400 flex-shrink-0"
                  />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-8 bg-violet-500/70" />
              Telemetry
            </div>
            <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              Performance Snapshot
            </h2>
            <div className="grid grid-cols-3 gap-px my-6 rounded-2xl overflow-hidden border border-violet-500/15 text-center">
              {[
                { value: "30+", label: "Tools Online" },
                { value: "~2s", label: "Median Process" },
                { value: "0", label: "Signup Required" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[#16122a] py-3 sm:py-5 text-center hover:bg-[#1c1738] transition-colors"
                >
                  <p className="stat-value text-xl sm:text-2xl font-extrabold gradient-text">
                    {value}
                  </p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
              style={{ animationDelay: "0ms" }}
            >
              <span className="h-px w-8 bg-violet-500/70" />
              Knowledge Base
            </div>
            <h2 className="font-display text-gray-200 leading-[1.02] mb-6 text-2xl sm:text-3xl lg:text-3xl rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
              Frequently Asked Questions
            </h2>
            <FAQSection faqs={faqs} />
          </div>
        </div>

        {/* ── Related Blog Posts ────────────────────────────── */}
        {(() => {
          // Map each tool slug to relevant blog post slugs
          const TOOL_BLOG_MAP: Record<string, { slug: string; title: string; readTime: number }[]> = {
            "compress-image": [
              { slug: "how-to-compress-images-without-losing-quality", title: "How to Compress Images Without Losing Quality", readTime: 7 },
              { slug: "best-free-image-compressor-online-2026", title: "Best Free Image Compressor Online in 2026", readTime: 7 },
              { slug: "how-to-reduce-image-size-for-faster-websites", title: "How to Reduce Image Size for Faster Websites", readTime: 6 },
            ],
            "compress-jpg": [
              { slug: "how-to-compress-images-without-losing-quality", title: "How to Compress Images Without Losing Quality", readTime: 7 },
              { slug: "how-to-compress-image-for-whatsapp", title: "How to Compress Images for WhatsApp", readTime: 5 },
              { slug: "how-to-reduce-photo-size-in-kb", title: "How to Reduce Photo Size in KB", readTime: 5 },
            ],
            "compress-png": [
              { slug: "how-to-compress-images-without-losing-quality", title: "How to Compress Images Without Losing Quality", readTime: 7 },
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
            ],
            "compress-webp": [
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
              { slug: "avif-vs-webp-which-is-better", title: "AVIF vs WebP – Which is Better?", readTime: 6 },
            ],
            "resize-image": [
              { slug: "how-to-resize-images-for-web-complete-guide", title: "How to Resize Images for Web – Complete Guide", readTime: 7 },
              { slug: "how-to-resize-images-for-social-media-2026", title: "How to Resize Images for Social Media", readTime: 6 },
              { slug: "how-to-resize-image-without-photoshop", title: "How to Resize Images Without Photoshop", readTime: 5 },
            ],
            "crop-image": [
              { slug: "how-to-crop-an-image-online-free", title: "How to Crop an Image Online for Free", readTime: 5 },
              { slug: "best-image-size-for-blogs-and-social-media", title: "Best Image Sizes for Blogs & Social Media", readTime: 6 },
            ],
            "jpg-to-png": [
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
              { slug: "image-file-formats-explained", title: "Image File Formats Explained", readTime: 7 },
            ],
            "png-to-jpg": [
              { slug: "how-to-convert-png-to-jpg-free", title: "How to Convert PNG to JPG Free", readTime: 5 },
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
            ],
            "jpg-to-webp": [
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
              { slug: "core-web-vitals-image-optimization", title: "Core Web Vitals Image Optimization", readTime: 8 },
              { slug: "avif-vs-webp-which-is-better", title: "AVIF vs WebP – Which is Better?", readTime: 6 },
            ],
            "webp-to-jpg": [
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
              { slug: "image-file-formats-explained", title: "Image File Formats Explained", readTime: 7 },
            ],
            "png-to-webp": [
              { slug: "webp-vs-jpg-vs-png-which-format-is-best", title: "WebP vs JPG vs PNG – Which Format is Best?", readTime: 8 },
              { slug: "best-image-formats-for-websites", title: "Best Image Formats for Websites", readTime: 7 },
            ],
            "heic-to-jpg": [
              { slug: "how-to-convert-heic-to-jpg-on-iphone-and-mac", title: "How to Convert HEIC to JPG on iPhone & Mac", readTime: 6 },
              { slug: "image-file-formats-explained", title: "Image File Formats Explained", readTime: 7 },
            ],
            "image-to-pdf": [
              { slug: "how-to-convert-jpg-to-pdf-free", title: "How to Convert JPG to PDF Free", readTime: 5 },
            ],
            "pdf-to-image": [
              { slug: "how-to-convert-pdf-to-jpg-online-free", title: "How to Convert PDF to JPG Online Free", readTime: 6 },
            ],
            "remove-image-background": [
              { slug: "how-to-remove-image-background-for-free", title: "How to Remove Image Background for Free", readTime: 6 },
            ],
            "image-upscaler": [
              { slug: "how-to-upscale-images-without-losing-quality", title: "How to Upscale Images Without Losing Quality", readTime: 7 },
              { slug: "what-is-image-dpi-and-how-to-change-it", title: "What is Image DPI and How to Change It", readTime: 6 },
            ],
            "watermark-image": [
              { slug: "how-to-add-watermark-to-images-online", title: "How to Add a Watermark to Images Online", readTime: 5 },
            ],
            "flip-image": [
              { slug: "how-to-flip-an-image-online", title: "How to Flip an Image Online", readTime: 4 },
            ],
            "image-grayscale": [
              { slug: "how-to-convert-image-to-black-and-white", title: "How to Convert Image to Black & White", readTime: 5 },
            ],
            "reduce-image-file-size": [
              { slug: "how-to-make-image-smaller", title: "How to Make an Image Smaller", readTime: 5 },
              { slug: "how-to-reduce-photo-size-in-kb", title: "How to Reduce Photo Size in KB", readTime: 5 },
              { slug: "how-to-compress-image-for-whatsapp", title: "How to Compress Images for WhatsApp", readTime: 5 },
            ],
            "photo-collage-maker": [
              { slug: "how-to-make-a-photo-collage-online-free", title: "How to Make a Photo Collage Online Free", readTime: 5 },
              { slug: "how-to-optimize-images-for-instagram", title: "How to Optimize Images for Instagram", readTime: 5 },
            ],
            "image-aspect-ratio": [
              { slug: "best-image-size-for-blogs-and-social-media", title: "Best Image Sizes for Blogs & Social Media", readTime: 6 },
              { slug: "how-to-resize-images-for-social-media-2026", title: "How to Resize Images for Social Media", readTime: 6 },
            ],
            "image-thumbnail": [
              { slug: "how-to-resize-images-for-social-media-2026", title: "How to Resize Images for Social Media", readTime: 6 },
              { slug: "best-image-size-for-blogs-and-social-media", title: "Best Image Sizes for Blogs & Social Media", readTime: 6 },
            ],
          };

          const posts = TOOL_BLOG_MAP[slug ?? ""] ?? [];
          if (posts.length === 0) return null;

          return (
            <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal" style={{ animationDelay: "0ms" }}>
                  <span className="h-px w-8 bg-violet-500/70" />
                  Guides
                </div>
                <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-5 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
                  Related Guides
                </h2>
                <div className="flex flex-col gap-3">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-violet-500/15 bg-[#16122a] hover:border-violet-500/30 hover:bg-[#1c1738] px-4 py-3 transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-gray-300 group-hover:text-violet-200 transition-colors leading-snug">
                        {post.title}
                      </span>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-[10px] text-gray-500 hidden sm:block">{post.readTime} min read</span>
                        <ArrowRight size={13} className="text-violet-500 group-hover:text-violet-300 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Related Tools ────────────────────────────────────── */}

        {relatedTools.length > 0 && (
          <div className="relative mb-8 rounded-2xl border border-violet-500/15 bg-[#131026] p-5 sm:p-6 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-violet-500/6 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative">
              <div
                className="flex items-center gap-3 py-6 text-[11px] uppercase tracking-[0.35em] text-violet-300/70 hero-reveal"
                style={{ animationDelay: "0ms" }}
              >
                <span className="h-px w-8 bg-violet-500/70" />
                Adjacent Modules
              </div>
              <h2 className="font-display text-gray-200 leading-[1.02] text-2xl sm:text-3xl lg:text-3xl mt-2 mb-6 rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-1.5">
                Related Tools
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedTools.map((tool) => (
                  <a
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="group relative flex flex-col items-center gap-2 bg-[#16122a] border border-violet-500/15 hover:border-violet-500/30 hover:bg-[#1c1738] rounded-xl p-4 text-center transition-all duration-200 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <span className="text-2xl relative">
                      <ToolIcon
                        name={TOOL_ICON_MAP[tool.slug] || "FileImage"}
                        size={22}
                        className="text-violet-200"
                      />
                    </span>
                    <span className="text-sm font-semibold text-violet-100 group-hover:text-violet-300 transition-colors relative">
                      {tool.name}
                    </span>
                    <span className="text-xs text-gray-400 leading-snug relative">
                      {tool.shortDesc}
                    </span>
                    <span className="relative mt-auto flex items-center gap-1 text-xs text-violet-400 font-semibold group-hover:opacity-100 transition-opacity">
                      Use tool <ArrowRight size={11} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <AdBanner slot="Footer" />
      </div>
    </main>
  );
}
