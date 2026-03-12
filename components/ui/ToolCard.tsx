import Link from "next/link";
import type { ToolData } from "@/lib/tools-data";
import { TOOL_CATEGORIES } from "@/lib/tools-data";
import ToolIcon from "@/components/ui/ToolIcon";
import { TOOL_ICON_MAP } from "@/lib/icons";
import { ArrowRight, Sparkle } from "lucide-react";

interface ToolCardProps {
    tool: ToolData;
    isPopular?: boolean;
    isNew?: boolean;
}

export default function ToolCard({ tool, isPopular, isNew }: ToolCardProps) {
    const iconName = TOOL_ICON_MAP[tool.slug] || "FileImage";
    const categoryInfo = TOOL_CATEGORIES[tool.category];
    const categoryColorClass = categoryInfo?.color || "from-violet-500 to-purple-500";

    return (
        <Link href={`/${tool.slug}`} className="group block h-full">
            <div className="relative h-full bg-[#16122a]/40 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col overflow-hidden transition-all duration-300 ease-out hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:-translate-y-1.5 active:scale-[0.98]">

                {/* Background Glow */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${categoryColorClass} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                {/* Popular / New badge */}
                {(isPopular || isNew) && (
                    <div className="absolute top-3 right-3 z-20 flex gap-1">
                        {isNew && (
                            <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                <Sparkle size={8} /> New
                            </span>
                        )}
                        {isPopular && (
                            <span className="text-[8px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                Popular
                            </span>
                        )}
                    </div>
                )}

                {/* Icon Container */}
                <div className="relative mb-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-violet-500/40 group-hover:bg-violet-500/10 group-hover:scale-110 transition-all duration-300 shadow-inner">
                        <ToolIcon name={iconName} size={20} className="text-violet-100 group-hover:text-violet-400 transition-colors" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="font-bold text-white text-sm leading-tight mb-2 group-hover:text-violet-300 transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-[11px] text-violet-200/50 leading-relaxed line-clamp-2 mb-4">
                        {tool.shortDesc}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            {tool.acceptedFormats.slice(0, 2).map(f => (
                                <span key={f} className="text-[8px] font-bold uppercase tracking-widest text-gray-400 px-0">
                                    {f.replace("image/", "").replace("application/", "")}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                            Use Tool <ArrowRight size={10} />
                        </div>
                    </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
            </div>
        </Link>
    );
}

