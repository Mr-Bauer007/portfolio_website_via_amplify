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
      <div className="eyebrow">Project</div>
      <h1>{project.meta.title}</h1>
      <p className="lede">{project.summary}</p>
      <div className="article-grid">
        <Detail title="Challenge" content={project.challenge} />
        <Detail title="Approach" content={project.approach} />
        <Detail title="Impact" content={project.impact} />
      </div>
      {(project.tools || project.repo_url || project.demo_url) && <section className="panel"><h2>Details</h2>{project.tools && <p><strong>Tools:</strong> {project.tools}</p>}{project.repo_url && <p><a href={project.repo_url}>Repository</a></p>}{project.demo_url && <p><a href={project.demo_url}>Live demo</a></p>}</section>}
    </article>
  );
}

function Detail({ title, content }: { title: string; content?: string }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="prose" dangerouslySetInnerHTML={{ __html: content ?? "" }} />
    </section>
  );
}
