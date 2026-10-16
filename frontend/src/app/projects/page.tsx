import Link from "next/link";
import { getPages } from "@/lib/api";

export default async function ProjectsPage() {
  const { items } = await getPages("type=projects.ProjectPage");

  return (
    <section className="page-width listing-page">
      <p className="kicker">Selected work</p>
      <h1>Practical systems for complicated environments.</h1>
      <div className="project-list">
        {items.map((project) => (
          <article className="project-row" key={project.id}>
            <span className="item-index">0{project.id}</span>
            <div>
              <h2>{project.meta.title}</h2>
              <p>{project.summary}</p>
              <div className="tag-line">{project.tools}</div>
            </div>
            <div className="project-links">
              {project.repo_url && <a href={project.repo_url}>Repository ↗</a>}
              {project.demo_url && <a href={project.demo_url}>Live demo ↗</a>}
            </div>
          </article>
        ))}
      </div>
      <Link className="text-link" href="/blog/">Read the field notes <span>↗</span></Link>
    </section>
  );
}
