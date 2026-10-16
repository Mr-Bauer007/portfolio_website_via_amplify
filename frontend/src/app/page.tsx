import Link from "next/link";
import { getPageByType, getPages, type WagtailPage } from "@/lib/api";

export default async function HomePage() {
  const { items } = await getPages();
  const home = getPageByType(items, "home.HomePage");
  const projects = items.filter((page) => page.meta.type === "projects.ProjectPage").slice(0, 3);
  const posts = items.filter((page) => page.meta.type === "blog.BlogPage").slice(0, 3);

  return (
    <>
      <section className="hero page-width">
        <p className="kicker">Portfolio / information security</p>
        <h1>{home?.meta.title ?? "Portfolio Site"}</h1>
        <div className="hero-copy" dangerouslySetInnerHTML={{ __html: home?.intro ?? "" }} />
        <Link className="text-link" href="/projects/">Explore the work <span>↗</span></Link>
      </section>

      <section className="feature-band">
        <div className="page-width feature-grid">
          <div className="section-heading">
            <p className="kicker">Selected work</p>
            <h2>Systems made clearer, safer, and easier to operate.</h2>
            <div className="rich-copy" dangerouslySetInnerHTML={{ __html: home?.about ?? "" }} />
          </div>
          <div className="stack-list">
            {projects.map((project) => <ProjectPreview key={project.id} page={project} />)}
          </div>
        </div>
      </section>

      <section className="page-width writing-section">
        <div className="section-row">
          <div>
            <p className="kicker">Field notes</p>
            <h2>Recent writing</h2>
          </div>
          <Link className="text-link" href="/blog/">View all writing <span>↗</span></Link>
        </div>
        <div className="post-grid">
          {posts.map((post) => <PostPreview key={post.id} page={post} />)}
        </div>
      </section>
    </>
  );
}

function ProjectPreview({ page }: { page: WagtailPage }) {
  return (
    <article className="project-preview">
      <div>
        <span className="item-index">0{page.id}</span>
        <h3>{page.meta.title}</h3>
      </div>
      <p>{page.summary}</p>
      <Link aria-label={`Read ${page.meta.title}`} href={`/projects/${page.meta.slug}/`}>↗</Link>
    </article>
  );
}

function PostPreview({ page }: { page: WagtailPage }) {
  return (
    <article className="post-preview">
      <p className="post-meta">{page.published_date} · {page.topic || "Security"}</p>
      <h3><Link href={`/blog/${page.meta.slug}/`}>{page.meta.title}</Link></h3>
      <p>{page.summary}</p>
    </article>
  );
}
