"use client";
import {
    // Compression
    FileArrowDown, FileImage, FilePng, FileJpg, FileZip, ImageSquare, Images, Gauge,
    // Resize / Crop / Transform
    CornersOut, CornersIn, Crop, ArrowClockwise, ArrowsClockwise, ArrowsHorizontal,
    FlipHorizontal, ArrowsOutSimple, ArrowsOut,
    // Conversion
    ArrowsLeftRight, FilePdf, FileDoc,
    // Utilities
    Stamp, Drop, Eyedropper, MagnifyingGlass, Eraser, Info,
    // Advanced
    MagicWand, Aperture, Sun, Sliders, Sparkle, FrameCorners,
    Lightning, GridFour, Code, FileCode, SquaresFour,
} from "@phosphor-icons/react";

// Icon name → Phosphor component, with duotone weight preference
const ICON_COMPONENTS: Record<string, React.ElementType> = {
    // compression
    FileArrowDown, FileImage, FilePng, FileJpg, FileZip, ImageSquare, Images, Gauge,
    // resize/crop/transform
    CornersOut, CornersIn, Crop, ArrowClockwise, ArrowsClockwise, ArrowsHorizontal,
    FlipHorizontal, ArrowsOutSimple, ArrowsOut,
    // conversion
    ArrowsLeftRight, FilePdf, FileDoc,
    // utilities
    Stamp, Drop, Eyedropper, MagnifyingGlass, Eraser, Info,
    // advanced
    MagicWand, Aperture, Sun, Sliders, Sparkle, FrameCorners,
    Lightning, GridFour, Code, FileCode, SquaresFour,
};

interface Props {
    name: string;
    size?: number;
    className?: string;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export default function ToolIcon({ name, size = 20, className = "", weight = "duotone" }: Props) {
    const Icon = ICON_COMPONENTS[name] || FileImage;
    return <Icon size={size} className={className} weight={weight} />;
}
