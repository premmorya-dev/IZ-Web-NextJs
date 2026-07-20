import { MetadataRoute } from "next";
import { BLOGS } from "@/lib/blog-data";

const BASE_URL = "https://invoicezy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/register",
    "/pricing", 
    "/features",
    "/templates",
    "/website-development",
    "/faq",
    "/contact",
    "/free-invoice-software",
    "/blog",
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }));

  const blogRoutes = BLOGS.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}