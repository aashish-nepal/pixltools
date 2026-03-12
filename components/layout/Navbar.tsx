"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-data";
import { TOOL_ICON_MAP } from "@/lib/icons";
import ToolIcon from "@/components/ui/ToolIcon";
import { List, X, CaretDown, BookOpen, Lightning } from "@phosphor-icons/react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openMenu = useCallback((key: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveCategory(key);
    }, []);

    const closeMenu = useCallback(() => {
        closeTimer.current = setTimeout(() => setActiveCategory(null), 120);
    }, []);

    const toggleMenu = useCallback((key: string) => {
        setActiveCategory(prev => (prev === key ? null : key));
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-[#0b0816]/90 backdrop-blur-md border-b border-violet-500/10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <Image
                        src="/logo.jpg"
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
                            <button
                                aria-haspopup="true"
                                aria-expanded={activeCategory === key}
                                onClick={() => toggleMenu(key)}
                                onFocus={() => openMenu(key)}
                                onBlur={closeMenu}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg transition-all"
                            >
                                {cat.label}
                                <CaretDown size={13} weight="bold" className={`transition-transform duration-150 ${activeCategory === key ? "rotate-180" : ""}`} />
                            </button>

                            {activeCategory === key && (
                                <div
                                    className="absolute top-full left-0 pt-1 z-50 w-52"
                                    onMouseEnter={() => openMenu(key)}
                                    onMouseLeave={closeMenu}
                                >
                                    <div className="bg-[#16122a] rounded-2xl shadow-2xl shadow-violet-900/40 border border-violet-500/20 p-2">
                                        {TOOLS.filter((t) => t.category === key).map((tool) => (
                                            <Link
                                                key={tool.slug}
                                                href={`/${tool.slug}`}
                                                onFocus={() => openMenu(key)}
                                                onBlur={closeMenu}
                                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-violet-500/10 hover:text-white rounded-xl transition-colors"
                                            >
                                                <span className="flex-shrink-0 w-6 h-6 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400">
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
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg transition-all"
                    >
                        <BookOpen size={14} />
                        Blog
                    </Link>
                    <Link
                        href="/premium"
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg transition-all"
                    >
                        <span>Pro</span>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-violet-500 text-white px-1.5 py-0.5 rounded-full ml-0.5">Soon</span>
                    </Link>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/compress-image"
                        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-violet-900/50"
                    >
                        Get Started Free →
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-2 text-violet-300/70 hover:bg-violet-500/10 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="regular" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#0f0d1f] border-t border-violet-500/10 px-4 py-4 max-h-[80vh] overflow-y-auto">
                    {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => (
                        <div key={key} className="mb-4">
                            <p className="text-xs font-bold text-violet-400/60 uppercase tracking-widest mb-2 px-1">{cat.label}</p>
                            <div className="space-y-0.5">
                                {TOOLS.filter((t) => t.category === key).map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/${tool.slug}`}
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-violet-500/10 hover:text-white rounded-xl transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400">
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
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-violet-500/10 hover:text-white rounded-xl"
                        onClick={() => setMobileOpen(false)}
                    >
                        <BookOpen size={15} /> Blog
                    </Link>
                    <Link
                        href="/premium"
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-violet-400 hover:bg-violet-500/10 rounded-xl"
                        onClick={() => setMobileOpen(false)}
                    >
                        ⚡ Pro — Coming Soon
                    </Link>
                    <div className="mt-4 pt-4 border-t border-violet-500/10">
                        <Link
                            href="/compress-image"
                            className="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Get Started Free →
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
