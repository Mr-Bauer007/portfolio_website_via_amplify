import { getPages } from "@/lib/api";

export default async function ProjectsPage() {
  const { items } = await getPages("type=projects.ProjectPage");

  return (
    <>
      <section className="page-heading">
        <div className="eyebrow">Projects</div>
        <h1>Projects</h1>
        <p className="lede">Case studies, experiments, and security-focused builds.</p>
      </section>
      <section className="card-list">
        {items.map((project) => (
          <article className="card card-wide" key={project.id}>
            <h2><a href={`/projects/${project.meta.slug}/`}>{project.meta.title}</a></h2>
            <p>{project.summary}</p>
          </article>
        ))}
      </section>
    </>
  );
}
