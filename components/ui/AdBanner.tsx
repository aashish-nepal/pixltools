"use client";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// Map slot names to AdSense ad slot IDs from env vars
const SLOT_MAP: Record<string, string | undefined> = {
    "Homepage Top Banner": process.env.NEXT_PUBLIC_AD_SLOT_HOME_TOP,
    "Homepage Middle": process.env.NEXT_PUBLIC_AD_SLOT_HOME_MID,
    "Top Banner": process.env.NEXT_PUBLIC_AD_SLOT_TOOL_TOP,
    "Below Tool": process.env.NEXT_PUBLIC_AD_SLOT_TOOL_BELOW,
    "Content": process.env.NEXT_PUBLIC_AD_SLOT_TOOL_CONTENT,
    "Footer": process.env.NEXT_PUBLIC_AD_SLOT_TOOL_FOOTER,
    "Blog Top Banner": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_TOP,
    "Blog Post Top": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_POST_TOP,
    "Blog Post Middle": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_POST_MID,
    "Blog Post Bottom": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_POST_BOTTOM,
    "Blog Sidebar Top": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_SIDEBAR_TOP,
    "Blog Sidebar Bottom": process.env.NEXT_PUBLIC_AD_SLOT_BLOG_SIDEBAR_BOTTOM,
};

export default function AdBanner({ slot }: { slot: string }) {
    const adSlot = SLOT_MAP[slot];

    // If AdSense client + slot ID are configured, render real ad unit
    if (ADSENSE_CLIENT && adSlot) {
        return (
            <div className="w-full my-4 overflow-hidden rounded-xl">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client={ADSENSE_CLIENT}
                    data-ad-slot={adSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        );
    }

    // #11 fix: render nothing when AdSense is not yet configured
    return null;
}
