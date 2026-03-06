"use client";
import {
    Minimize2, FileImage, Maximize2, Crop, RotateCcw, FlipHorizontal2,
    ArrowLeftRight, FileText, Stamp, Layers, Pipette, ScanSearch,
    Scissors, ZoomIn, Eclipse, Sun, SunMedium, Focus, Image, Frame,
    Move, ArrowDownToLine, LucideProps,
} from "lucide-react";

const ICON_COMPONENTS: Record<string, React.ComponentType<LucideProps>> = {
    Minimize2, FileImage, Maximize2, Crop, RotateCcw, FlipHorizontal2,
    ArrowLeftRight, FileText, Stamp, Layers, Pipette, ScanSearch,
    Scissors, ZoomIn, Eclipse, Sun, SunMedium, Focus, Image, Frame,
    Move, ArrowDownToLine,
};

interface Props {
    name: string;
    size?: number;
    className?: string;
}

export default function ToolIcon({ name, size = 20, className = "" }: Props) {
    const Icon = ICON_COMPONENTS[name] || FileImage;
    return <Icon size={size} className={className} strokeWidth={1.7} />;
}
