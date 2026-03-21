"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, BookOpen, Zap } from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Home", icon: Home },
    { href: "#tools", label: "Tools", icon: Wrench },
    { href: "/blog", label: "Blog", icon: BookOpen },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
            {/* Glow line on top */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            <div className="bg-[#0b0816]/85 backdrop-blur-xl border-t border-violet-500/15 px-2 pt-2 pb-3">
                <div className="flex items-center justify-around gap-1">
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px] ${
                                    isActive
                                        ? "text-violet-300"
                                        : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                <div className="relative">
                                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                                    )}
                                </div>
                                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
                            </Link>
                        );
                    })}

                    {/* CTA button */}
                    <Link
                        href="/compress-image"
                        className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all duration-200 shadow-lg shadow-violet-900/50 min-w-[64px]"
                    >
                        <Zap size={19} strokeWidth={2.2} className="text-white" />
                        <span className="text-[10px] font-bold text-white tracking-wide">Compress</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
