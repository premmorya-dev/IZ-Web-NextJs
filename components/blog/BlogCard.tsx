// components/blog/BlogCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  /** "default" for grid cards, "featured" for the large hero card. */
  variant?: "default" | "featured";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/20 ${
        isFeatured ? "md:flex md:items-stretch" : ""
      }`}
    >
      <Link
        href={`/blog/${blog.slug}`}
        className={`block ${isFeatured ? "md:flex md:w-full md:items-stretch" : ""}`}
      >
        <div
          className={`relative overflow-hidden ${
            isFeatured ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes={isFeatured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isFeatured}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 via-transparent to-transparent" />
        </div>

        <div
          className={`flex flex-col justify-center gap-3 p-6 ${
            isFeatured ? "md:w-1/2 md:p-10" : ""
          }`}
        >
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{formatDate(blog.publishedAt)}</span>
            <span aria-hidden>&middot;</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {blog.readingTime}
            </span>
          </div>

          {isFeatured ? (
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {blog.title}
            </h2>
          ) : (
            <h3 className="font-display text-lg font-semibold text-white">
              {blog.title}
            </h3>
          )}

          <p
            className={`text-sm leading-relaxed text-slate-400 ${
              isFeatured ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {blog.excerpt}
          </p>

          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300">
            Read Article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
