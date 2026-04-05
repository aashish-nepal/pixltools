import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools-data";
import { BLOG_POSTS } from "@/lib/blog-data";

// Auto-derived from latest blog post
const BLOG_LATEST = BLOG_POSTS.length > 0
    ? new Date(Math.max(...BLOG_POSTS.map(p => new Date(p.date).getTime())))
    : new Date("2026-01-01");

// Bump this whenever tool pages are updated — signals freshness to Googlebot
const TOOLS_CONTENT_UPDATED = new Date("2026-04-05");

// Use whichever is more recent — auto-updates when a new blog post is newer
const TOOLS_LAST_UPDATED = new Date(Math.max(BLOG_LATEST.getTime(), TOOLS_CONTENT_UPDATED.getTime()));

// Stable dates for static pages — avoids telling Google they change on every build
const STATIC_DATES = {
    home: new Date(Math.max(BLOG_LATEST.getTime(), TOOLS_CONTENT_UPDATED.getTime())),
    blog: BLOG_LATEST,
    about: new Date("2026-01-01"),
    legal: new Date("2026-01-01"),
    seoGuides: new Date("2026-03-18"),
    premium: new Date("2026-03-08"),
    apiAccess: new Date("2026-03-08"),
};

const BASE = "https://www.pixltools.com";

// ── URLs ──────────────────────────────────────────────────────────────────────

const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: STATIC_DATES.home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: STATIC_DATES.blog, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/premium`, lastModified: STATIC_DATES.premium, changeFrequency: "monthly", priority: 0.7 },
    // Standalone tool page (not in TOOLS array)
    { url: `${BASE}/photo-collage-maker`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: "monthly", priority: 0.75 },
    // SEO comparison & guide pages
    { url: `${BASE}/jpg-vs-png`, lastModified: STATIC_DATES.seoGuides, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/png-vs-webp`, lastModified: STATIC_DATES.seoGuides, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/how-to-compress-images-for-instagram`, lastModified: STATIC_DATES.seoGuides, changeFrequency: "monthly", priority: 0.75 },
    // API access
    { url: `${BASE}/api-access`, lastModified: STATIC_DATES.apiAccess, changeFrequency: "monthly", priority: 0.65 },
    // Informational / legal
    { url: `${BASE}/about`, lastModified: STATIC_DATES.about, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: STATIC_DATES.legal, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: STATIC_DATES.legal, changeFrequency: "yearly", priority: 0.3 },
    // HTML sitemap — crawlable anchors for every page, helps Googlebot on budget-limited sites
    { url: `${BASE}/sitemap-page`, lastModified: TOOLS_LAST_UPDATED, changeFrequency: "weekly", priority: 0.4 },
];

const toolPages: MetadataRoute.Sitemap = TOOLS.map(tool => ({
    url: `${BASE}/${tool.slug}`,
    lastModified: TOOLS_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
}));

// Blog posts — use updatedDate when available for accurate freshness signalling
const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
}));

// Deduplicate: static pages take precedence over auto-generated tool pages
const seen = new Set<string>(staticPages.map(p => p.url));
const dedupedToolPages = toolPages.filter(p => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
});
const dedupedBlogPages = blogPages.filter(p => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
});

// ── Sitemap index: two sub-sitemaps ──────────────────────────────────────────
// Google processes each sub-sitemap independently, giving proper crawl budget
// allocation to tool pages and blog posts without them competing.
// Blog category pages are intentionally excluded — thin filter pages that
// burn crawl quota without offering unique indexable content.

export async function generateSitemaps() {
    return [{ id: 0 }, { id: 1 }];
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
    if (id === 0) return [...staticPages, ...dedupedToolPages];
    if (id === 1) return dedupedBlogPages;
    return [];
}
