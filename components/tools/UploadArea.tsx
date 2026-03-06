"use client";
import { useState, useRef, useCallback, DragEvent } from "react";
import { UploadCloud } from "lucide-react";

interface UploadAreaProps {
    onFileSelect: (file: File) => void;
    acceptedFormats: string[];
    maxSizeMB?: number;
}

export default function UploadArea({ onFileSelect, acceptedFormats, maxSizeMB = 10 }: UploadAreaProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateAndSelect = useCallback((file: File) => {
        setError(null);
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

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) validateAndSelect(file);
    }, [validateAndSelect]);

    return (
        <div>
            <div
                className={`drop-zone rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${isDragOver ? "drag-over" : ""}`}
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
                            className={`transition-all duration-300 ${isDragOver ? "text-emerald-300 translate-y-[-4px]" : "text-emerald-400"}`}
                            strokeWidth={1.5}
                        />
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-slate-200">
                            {isDragOver ? "Drop your image here" : "Drag & drop your image"}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">or <span className="text-emerald-400 font-medium underline underline-offset-2">click to browse</span></p>
                    </div>

                    {/* Format badges */}
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {acceptedFormats.map((f) => (
                            <span key={f} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-semibold tracking-wide">
                                {f.split("/")[1].toUpperCase()}
                            </span>
                        ))}
                        <span className="text-xs text-slate-600">&middot; Max {maxSizeMB}MB</span>
                    </div>

                    {/* Trust line */}
                    <p className="text-xs text-slate-600 font-medium">
                        🔒 Secure &nbsp;·&nbsp; ⚡ Processed instantly &nbsp;·&nbsp; 🗑 Files never stored
                    </p>
                </div>
            </div>

            {error && (
                <p className="mt-3 text-sm text-red-400 text-center font-medium">{error}</p>
            )}
        </div>
    );
}
