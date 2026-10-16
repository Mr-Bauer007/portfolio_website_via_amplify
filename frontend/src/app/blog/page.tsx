import Link from "next/link";
import { getPages } from "@/lib/api";

export default async function BlogIndexPage() {
  const { items } = await getPages("type=blog.BlogPage");

  return (
    <section className="page-width listing-page">
      <p className="kicker">Field notes</p>
      <h1>Writing on secure systems.</h1>
      <div className="post-list">
        {items.map((post) => (
          <article className="post-row" key={post.id}>
            <p className="post-meta">{post.published_date} · {post.topic || "Security"}</p>
            <div>
              <h2><Link href={`/blog/${post.meta.slug}/`}>{post.meta.title}</Link></h2>
              <p>{post.summary}</p>
            </div>
            <span className="arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
