import { getPage, getPages } from "@/lib/api";

export async function generateStaticParams() {
  const { items } = await getPages("type=projects.ProjectPage");
  return items.map((project) => ({ slug: project.meta.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { items } = await getPages("type=projects.ProjectPage");
  const summary = items.find((project) => project.meta.slug === slug);
  if (!summary) throw new Error(`Project not found: ${slug}`);
  const project = await getPage(summary.id);

  return (
    <article className="page-width article-page project-article">
      <p className="kicker">Project / {project.tools || "Security engineering"}</p>
      <h1>{project.meta.title}</h1>
      <p className="article-summary">{project.summary}</p>
      <div className="project-details">
        <Detail title="Challenge" content={project.challenge} />
        <Detail title="Approach" content={project.approach} />
        <Detail title="Impact" content={project.impact} />
      </div>
      <div className="project-links">
        {project.repo_url && <a href={project.repo_url}>Repository ↗</a>}
        {project.demo_url && <a href={project.demo_url}>Live demo ↗</a>}
      </div>
    </article>
  );
}

function Detail({ title, content }: { title: string; content?: string }) {
  return (
    <section>
      <p className="kicker">{title}</p>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: content ?? "" }} />
    </section>
  );
}
