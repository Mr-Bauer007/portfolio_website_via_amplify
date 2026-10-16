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
      <p className="kicker">{post.topic || "Security"} / {post.published_date}</p>
      <h1>{post.meta.title}</h1>
      <p className="article-summary">{post.summary}</p>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: post.body ?? "" }} />
    </article>
  );
}
