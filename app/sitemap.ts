import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools-data";
import { BLOG_POSTS } from "@/lib/blog-data";

// Last time tool pages were meaningfully updated
const TOOLS_LAST_UPDATED = new Date("2026-03-06");

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://pixltools.com";
    const now = new Date();

    const toolPages = TOOLS.map(tool => ({
        url: `${base}/${tool.slug}`,
        lastModified: TOOLS_LAST_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const blogPages = BLOG_POSTS.map(post => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
        { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        ...toolPages,
        ...blogPages,
    ];
}

