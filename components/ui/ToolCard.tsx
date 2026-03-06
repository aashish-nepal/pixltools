import Link from "next/link";
import type { ToolData } from "@/lib/tools-data";
import ToolIcon from "@/components/ui/ToolIcon";
import { TOOL_ICON_MAP } from "@/lib/icons";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: ToolData }) {
    const iconName = TOOL_ICON_MAP[tool.slug] || "FileImage";

    return (
        <Link href={`/${tool.slug}`} className="group block h-full">
            <div className={`
        relative h-full bg-slate-800/80 border border-slate-700 rounded-2xl p-5
        flex flex-col
        transition-all duration-200 ease-out
        hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1
        hover:shadow-emerald-500/10 hover:bg-slate-800
      `}>
                {/* Icon container */}
                <div className={`
          inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 flex-shrink-0
          bg-slate-700 text-emerald-400 border border-slate-600
          group-hover:bg-emerald-500/10 group-hover:border-emerald-500/40 group-hover:scale-110 transition-all duration-200
        `}>
                    <ToolIcon name={iconName} size={17} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-200 text-sm leading-snug mb-1.5 group-hover:text-emerald-400 transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {tool.shortDesc}
                    </p>
                </div>

                {/* Hover CTA */}
                <div className="flex items-center gap-1 mt-3 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150">
                    Use tool <ArrowRight size={11} />
                </div>

                {/* Hover shimmer border */}
                <div className={`
          absolute inset-0 rounded-2xl pointer-events-none
          bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        `} />
            </div>
        </Link>
    );
}
