import { Metadata } from "next";
import PremiumClient from "./PremiumClient";

export const metadata: Metadata = {
    title: "PixlTools Pro — Unlock Premium Image Processing",
    description: "Get unlimited batch processing, larger file sizes, priority processing, and API access with PixlTools Pro. Free plan always available.",
};

export default function PremiumPage() {
    return <PremiumClient />;
}
