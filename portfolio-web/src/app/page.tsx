import {
  getIdentitySnapshot,
  getProjectCatalog,
  getTechnicalSnapshot,
} from "@/lib/context-dictionaries";

const prettyCategory = (value: string): string => {
  return value
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

export default async function Home() {
  const [identitySnapshot, technicalSnapshot, catalog] = await Promise.all([
    getIdentitySnapshot(),
    getTechnicalSnapshot(),
    getProjectCatalog(),
  ]);

  const identityHighlights = identitySnapshot
    .split("\n")
    .filter((line) => line.startsWith("-"))
    .slice(0, 3)
    .map((line) => line.replace(/^-\s*/, "").trim());

  const stackHighlights = technicalSnapshot
    .split("\n")
    .filter((line) => line.startsWith("-"))
    .slice(0, 4)
    .map((line) => line.replace(/^-\s*/, "").trim());

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="orb orb-left" />
        <div className="orb orb-right" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:px-12 md:py-20">
        <section className="grid gap-10 rounded-3xl border border-line bg-panel p-8 backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
              Senior Developer to Business Analytics
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              Engineering data-driven products with strategic business impact.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
              Portafolio profesional orientado a arquitectura Full-Stack,
              visualización analitica y ejecucion enfocada en time-to-market.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted">
              <span className="chip">React 19</span>
              <span className="chip">Next.js</span>
              <span className="chip">Tailwind</span>
              <span className="chip">Firebase Assets</span>
            </div>
          </div>
          <aside className="space-y-4 rounded-2xl border border-line-strong bg-panel-strong p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">
              Identity Snapshot
            </p>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              {identityHighlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Technical North Star
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {stackHighlights.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-line bg-panel p-5 text-sm leading-7 text-muted"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Project Catalog
            </h2>
            <p className="text-xs uppercase tracking-[0.18em] text-accent-strong">
              Source: .context/project-catalog.json
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {catalog.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl border border-line bg-panel p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-accent-strong">
                  {prettyCategory(project.category)}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{project.impact}</p>
                <p className="mt-3 text-sm text-muted">{project.visual}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={`${project.id}-${tech}`} className="chip chip-small">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
