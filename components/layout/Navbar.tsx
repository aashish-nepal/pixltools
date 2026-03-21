"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { TOOL_CATEGORIES, TOOLS } from "@/lib/tools-data";
import { TOOL_ICON_MAP } from "@/lib/icons";
import ToolIcon from "@/components/ui/ToolIcon";
import { List, X, CaretDown, BookOpen, Lightning } from "@phosphor-icons/react";
import { Zap, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [mobileCat, setMobileCat] = useState<string | null>(null);
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

    const closeMobile = () => setMobileOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-[#0b0816]/90 backdrop-blur-md border-b border-violet-500/10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center group" onClick={closeMobile}>
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
                    className="md:hidden relative flex items-center justify-center w-10 h-10 text-violet-300/80 hover:bg-violet-500/10 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="regular" />}
                    {/* Notification dot for new features */}
                    {!mobileOpen && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400" />}
                </button>
            </div>

            {/* ── Mobile: Full-height slide-in drawer ── */}
            {mobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm mobile-drawer-backdrop"
                        onClick={closeMobile}
                        aria-hidden="true"
                    />

                    {/* Drawer panel */}
                    <div className="md:hidden fixed top-16 right-0 bottom-0 z-50 w-[85vw] max-w-sm mobile-drawer flex flex-col">
                        {/* Glass panel background */}
                        <div className="absolute inset-0 bg-[#0e0c1e]/97 backdrop-blur-2xl border-l border-violet-500/15" />

                        {/* Subtle glow at top */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                        <div className="relative flex flex-col h-full overflow-y-auto overscroll-contain">
                            {/* Header */}
                            <div className="px-5 pt-5 pb-3">
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400/50">Navigation</p>
                            </div>

                            {/* Tool categories */}
                            <div className="flex-1 px-3">
                                {Object.entries(TOOL_CATEGORIES).map(([key, cat]) => {
                                    const catTools = TOOLS.filter((t) => t.category === key);
                                    const isOpen = mobileCat === key;
                                    return (
                                        <div key={key} className="mb-1">
                                            <button
                                                onClick={() => setMobileCat(isOpen ? null : key)}
                                                className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-violet-500/8 transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                                        <Lightning size={14} weight="fill" className="text-violet-400" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-200">{cat.label}</span>
                                                    <span className="text-[10px] text-gray-600 font-medium">{catTools.length}</span>
                                                </div>
                                                <CaretDown
                                                    size={14}
                                                    weight="bold"
                                                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-violet-400" : ""}`}
                                                />
                                            </button>

                                            {isOpen && (
                                                <div className="ml-3 mb-2 pl-3 border-l border-violet-500/15 space-y-0.5">
                                                    {catTools.map((tool) => (
                                                        <Link
                                                            key={tool.slug}
                                                            href={`/${tool.slug}`}
                                                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-violet-500/8 rounded-xl transition-all"
                                                            onClick={closeMobile}
                                                        >
                                                            <span className="flex-shrink-0 w-6 h-6 bg-violet-500/8 rounded-lg flex items-center justify-center text-violet-400/70">
                                                                <ToolIcon name={TOOL_ICON_MAP[tool.slug] || "FileImage"} size={12} />
                                                            </span>
                                                            <span>{tool.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Blog & Pro links */}
                                <div className="mt-1 space-y-0.5">
                                    <Link
                                        href="/blog"
                                        className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-violet-500/8 transition-all"
                                        onClick={closeMobile}
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                                            <BookOpen size={14} className="text-sky-400" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-200">Blog & Guides</span>
                                    </Link>
                                    <Link
                                        href="/premium"
                                        className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-violet-500/8 transition-all"
                                        onClick={closeMobile}
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                            <Zap size={14} className="text-amber-400" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-200">Pro</span>
                                        <span className="text-[9px] font-black uppercase tracking-wider bg-violet-500 text-white px-1.5 py-0.5 rounded-full">Soon</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="p-4 border-t border-violet-500/10">
                                <Link
                                    href="/compress-image"
                                    className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-violet-900/50 active:scale-95"
                                    onClick={closeMobile}
                                >
                                    <Zap size={16} />
                                    Get Started Free
                                    <ArrowRight size={14} />
                                </Link>
                                <p className="text-center text-[10px] text-gray-600 mt-2">No signup · No watermarks · 100% Free</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}
