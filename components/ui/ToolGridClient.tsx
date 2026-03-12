"use client";
import { useState } from "react";
import ToolCard from "@/components/ui/ToolCard";
import { TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";

const INITIAL_VISIBLE = 15;

export default function ToolGridClient() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const filteredTools = TOOLS.filter(tool =>
        !activeCategory || tool.category === activeCategory
    );

    const visibleTools = showAll ? filteredTools : filteredTools.slice(0, INITIAL_VISIBLE);
    const hasMore = filteredTools.length > INITIAL_VISIBLE;

    return (
        <>
            {/* Category filter tabs */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-16">
                <button
                    onClick={() => { setActiveCategory(null); setShowAll(false); }}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${!activeCategory ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" : "bg-white/5 text-violet-200/50 hover:bg-white/10 hover:text-violet-100 border border-white/5"}`}
                >
                    ALL
                </button>
                {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
                    const isActive = activeCategory === key;
                    return (
                        <button
                            key={key}
                            onClick={() => { setActiveCategory(isActive ? null : key); setShowAll(false); }}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${isActive ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" : "bg-white/5 text-violet-200/50 hover:bg-white/10 hover:text-violet-100 border border-white/5"}`}
                        >
                            {cat.label.toUpperCase()}
                        </button>
                    );
                })}
            </div>

            {/* Flat tool grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {visibleTools.map(tool => (
                    <ToolCard
                        key={tool.slug}
                        tool={tool}
                        isPopular={(tool as any).isPopular}
                        isNew={(tool as any).isNew}
                    />
                ))}
            </div>

            {/* Show more / less */}
            {hasMore && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAll(prev => !prev)}
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-500 text-violet-200/70 hover:text-white text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-violet-900/40 hover:-translate-y-0.5"
                    >
                        {showAll ? "Show Less" : `Show ${filteredTools.length - INITIAL_VISIBLE} More Tools`}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
