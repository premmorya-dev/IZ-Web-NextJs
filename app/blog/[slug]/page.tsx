import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import BlogCTA from "@/components/blog/BlogCTA";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;

  author: {
    name: string;
    role: string;
    avatar: string;
  };

  readingTime: string;
  publishedAt: string;

  metaTitle: string;
  metaDescription: string;

  content: string;
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const result = await response.json();

    return result.data ?? null;
  } catch (error) {
    console.error("Blog API error:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Invoicezy",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,

    alternates: {
      canonical: `https://invoicezy.com/blog/${blog.slug}`,
    },

    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `https://invoicezy.com/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.publishedAt,
      images: [
        {
          url: blog.coverImage,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.coverImage],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const articleUrl = `https://invoicezy.com/blog/${blog.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: blog.title,

    description: blog.metaDescription,

    image: [
      `https://invoicezy.com${blog.coverImage}`,
    ],

    datePublished: blog.publishedAt,

    dateModified: blog.publishedAt,

    author: {
      "@type": "Organization",
      name: blog.author.name,
    },

    publisher: {
      "@type": "Organization",
      name: "Invoicezy",
      logo: {
        "@type": "ImageObject",
        url: "https://invoicezy.com/images/logo.png",
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <main className="bg-[#0A0E1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <article>
        <header>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-3xl px-6 pt-28 sm:pt-36"
          >
            <ol className="flex items-center gap-1.5 text-sm text-slate-500">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-slate-300"
                >
                  Home
                </Link>
              </li>

              <ChevronRight
                className="h-3.5 w-3.5"
                aria-hidden
              />

              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-slate-300"
                >
                  Blog
                </Link>
              </li>

              <ChevronRight
                className="h-3.5 w-3.5"
                aria-hidden
              />

              <li
                className="truncate text-slate-400"
                aria-current="page"
              >
                {blog.title}
              </li>
            </ol>
          </nav>

          {/* Title */}
          <div className="mx-auto max-w-3xl px-6 pb-10 pt-8 text-center">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />

                <span className="text-slate-300">
                  {blog.author.name}
                </span>
              </div>

              <span aria-hidden>&middot;</span>

              <span>
                {formatDate(blog.publishedAt)}
              </span>

              <span aria-hidden>&middot;</span>

              <span className="inline-flex items-center gap-1">
                <Clock
                  className="h-3.5 w-3.5"
                  aria-hidden
                />

                {blog.readingTime}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mx-auto max-w-4xl px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-slate-800 shadow-[0_20px_80px_rgba(0,0,0,0.15)] sm:p-12 lg:p-16">
            <BlogContent html={blog.content} />
          </div>
        </section>

        <footer>
          <BlogCTA />
        </footer>
      </article>
    </main>
  );
}