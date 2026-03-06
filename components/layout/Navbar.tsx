"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-data";
import { TOOL_ICON_MAP } from "@/lib/icons";
import ToolIcon from "@/components/ui/ToolIcon";
import { Menu, X, ChevronDown, BookOpen } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // #12 fix: keyboard-accessible dropdown handlers
    const openMenu = useCallback((key: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveCategory(key);
    }, []);

    const closeMenu = useCallback(() => {
        // Slight delay so focus can move inside the dropdown before it closes
        closeTimer.current = setTimeout(() => setActiveCategory(null), 120);
    }, []);

    const toggleMenu = useCallback((key: string) => {
        setActiveCategory(prev => (prev === key ? null : key));
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/logo.jpeg"
                        alt="PixlTools"
                        width={99}
                        height={36}
                        className="h-9 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
                        <div
                            key={key}
                            className="relative"
                            onMouseEnter={() => openMenu(key)}
                            onMouseLeave={closeMenu}
                        >
                            {/* #12 fix: aria-expanded, aria-haspopup, keyboard toggle */}
                            <button
                                aria-haspopup="true"
                                aria-expanded={activeCategory === key}
                                onClick={() => toggleMenu(key)}
                                onFocus={() => openMenu(key)}
                                onBlur={closeMenu}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                            >
                                {cat.label}
                                <ChevronDown size={13} className={`transition-transform duration-150 ${activeCategory === key ? "rotate-180" : ""}`} />
                            </button>

                            {activeCategory === key && (
                                <div
                                    className="absolute top-full left-0 pt-1 z-50 w-52"
                                    onMouseEnter={() => openMenu(key)}
                                    onMouseLeave={closeMenu}
                                >
                                    <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-700 p-2">
                                        {TOOLS.filter((t) => t.category === key).map((tool) => (
                                            <Link
                                                key={tool.slug}
                                                href={`/${tool.slug}`}
                                                onFocus={() => openMenu(key)}
                                                onBlur={closeMenu}
                                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-xl transition-colors"
                                            >
                                                <span className="flex-shrink-0 w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-emerald-400">
                                                    <ToolIcon name={TOOL_ICON_MAP[tool.slug] || "FileImage"} size={14} />
                                                </span>
                                                {tool.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <Link
                        href="/blog"
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                    >
                        <BookOpen size={14} />
                        Blog
                    </Link>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/compress-image"
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-emerald-900/50"
                    >
                        Try Free →
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 max-h-[80vh] overflow-y-auto">
                    {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
                        <div key={key} className="mb-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">{cat.label}</p>
                            <div className="space-y-0.5">
                                {TOOLS.filter((t) => t.category === key).map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/${tool.slug}`}
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-emerald-400 rounded-xl transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                                            <ToolIcon name={TOOL_ICON_MAP[tool.slug] || "FileImage"} size={13} />
                                        </span>
                                        {tool.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl"
                        onClick={() => setMobileOpen(false)}
                    >
                        <BookOpen size={15} /> Blog
                    </Link>
                    <div className="mt-4 pt-4 border-t border-slate-800">
                        <Link
                            href="/compress-image"
                            className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold py-2.5 rounded-xl transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Start Free →
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}