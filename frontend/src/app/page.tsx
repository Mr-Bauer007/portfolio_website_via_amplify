import Link from "next/link";
import { getPageByType, getPages } from "@/lib/api";

export default async function HomePage() {
  const { items } = await getPages();
  const home = getPageByType(items, "home.HomePage");
  const projects = items.filter((page) => page.meta.type === "projects.ProjectPage");
  const posts = items.filter((page) => page.meta.type === "blog.BlogPage");

  return (
    <>
      <section className="hero">
        <div className="eyebrow">Portfolio + information-security blog</div>
        <h1>{home?.meta.title ?? "Portfolio Site"}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: home?.intro ?? "" }} />
        <div className="prose subtle" dangerouslySetInnerHTML={{ __html: home?.about ?? "" }} />
      </section>

      <section className="grid two-up">
        <div className="panel">
          <h2>Featured projects</h2>
          {projects.length ? <div className="card-list">{projects.map((project) => <ProjectPreview key={project.id} page={project} />)}</div> : <p className="muted">Add your first project page in the admin.</p>}
        </div>
        <div className="panel">
          <h2>Latest infosec writing</h2>
          {posts.length ? <div className="card-list">{posts.map((post) => <PostPreview key={post.id} page={post} />)}</div> : <p className="muted">Publish your first post to surface it here.</p>}
        </div>
      </section>
    </>
  );
}

function ProjectPreview({ page }: { page: Awaited<ReturnType<typeof getPages>>["items"][number] }) {
  return (
    <article className="card">
      <h3><Link href={`/projects/${page.meta.slug}/`}>{page.meta.title}</Link></h3>
      <p>{page.summary}</p>
    </article>
  );
}

function PostPreview({ page }: { page: Awaited<ReturnType<typeof getPages>>["items"][number] }) {
  return (
    <article className="card">
      <h3><Link href={`/blog/${page.meta.slug}/`}>{page.meta.title}</Link></h3>
      <p>{page.summary}</p>
      <p className="meta">{formatDate(page.published_date)}{page.topic ? ` · ${page.topic}` : ""}</p>
    </article>
  );
}

function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}
