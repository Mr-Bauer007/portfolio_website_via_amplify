import { getPage, getPages } from "@/lib/api";

export async function generateStaticParams() {
  const { items } = await getPages("type=blog.BlogPage");
  return items.map((post) => ({ slug: post.meta.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { items } = await getPages("type=blog.BlogPage");
  const summary = items.find((post) => post.meta.slug === slug);
  if (!summary) throw new Error(`Blog post not found: ${slug}`);
  const post = await getPage(summary.id);

  return (
    <article className="page-width article-page">
      <div className="eyebrow">Blog post</div>
      <h1>{post.meta.title}</h1>
      <p className="lede">{post.summary}</p>
      <p className="meta">{formatDate(post.published_date)} · {post.reading_time_minutes} min{post.topic ? ` · ${post.topic}` : ""}</p>
      <div className="prose article-body" dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
    </article>
  );
}

function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}
