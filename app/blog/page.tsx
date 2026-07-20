// app/blog/page.tsx
import type { Metadata } from "next";
import { getFeaturedBlog, getRemainingBlogs } from "@/lib/blog-data";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogCTA from "@/components/blog/BlogCTA";

export const metadata: Metadata = {
  title: "Blog — Invoicing, GST & Business Guides | Invoicezy",
  description:
    "Learn invoicing, GST, payments and business growth with expert articles from Invoicezy.",
  alternates: {
    canonical: "https://invoicezy.com/blog",
  },
  openGraph: {
    title: "Blog — Invoicing, GST & Business Guides | Invoicezy",
    description:
      "Learn invoicing, GST, payments and business growth with expert articles from Invoicezy.",
    url: "https://invoicezy.com/blog",
    type: "website",
  },
};

export default async function BlogListingPage() {
  const [featured, remaining] = await Promise.all([
    getFeaturedBlog(),
    getRemainingBlogs(),
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Invoicezy Blog",
    description:
      "Learn invoicing, GST, payments and business growth with expert articles from Invoicezy.",
    url: "https://invoicezy.com/blog",
  };

  return (
    <main className="bg-[#0A0E1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <BlogHero />

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <BlogCard blog={featured} variant="featured" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Knowledge Hub
          </span>

          <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
            Latest Articles & Business Guides
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Explore expert articles on GST invoicing, online billing, UPI payments,
            expense tracking, accounting tips, and business growth to help you run
            your business more efficiently.
          </p>
        </div>

        <BlogGrid blogs={remaining} />
      </section>

      <BlogCTA />
    </main>
  );
}
