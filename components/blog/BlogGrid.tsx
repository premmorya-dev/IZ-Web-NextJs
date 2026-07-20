// components/blog/BlogGrid.tsx
import type { Blog } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: Blog[];
}

/**
 * Server component: no animation state of its own, just lays out
 * BlogCard (client component) in a responsive grid. Keeping this
 * as a server component avoids shipping unnecessary client JS.
 */
export default function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <p className="text-center text-slate-500">No articles published yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
