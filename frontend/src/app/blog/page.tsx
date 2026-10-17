import { getPages } from "@/lib/api";

export default async function BlogIndexPage() {
  const { items } = await getPages("type=blog.BlogPage");

  return (
    <>
      <section className="page-heading">
        <div className="eyebrow">Blog</div>
        <h1>Blog</h1>
        <p className="lede">Information-security notes, writeups, and practical guides.</p>
      </section>
      <section className="card-list">
        {items.map((post) => (
          <article className="card card-wide" key={post.id}>
            <h2><a href={`/blog/${post.meta.slug}/`}>{post.meta.title}</a></h2>
            <p>{post.summary}</p>
            <p className="meta">{formatDate(post.published_date)} · {post.reading_time_minutes} min{post.topic ? ` · ${post.topic}` : ""}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}
