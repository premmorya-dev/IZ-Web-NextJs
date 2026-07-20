// types/blog.ts
// Shared Blog type. Both lib/blog-data.ts (today) and a future
// GET /api/blogs response (later) should conform to this shape,
// so swapping the data source never requires touching components.

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Raw HTML string, rendered via BlogContent. */
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  /** e.g. "6 min read" */
  readingTime: string;
  /** ISO 8601 date string */
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
}
