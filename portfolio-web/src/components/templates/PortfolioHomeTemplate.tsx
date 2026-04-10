import { Pill } from "@/components/atoms/Pill";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import type { CatalogProject } from "@/types/portfolio";

interface PortfolioHomeTemplateProps {
  identityHighlights: string[];
  stackHighlights: string[];
  projects: CatalogProject[];
}

export function PortfolioHomeTemplate({
  identityHighlights,
  stackHighlights,
  projects,
}: PortfolioHomeTemplateProps) {
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
              visualizacion analitica y ejecucion enfocada en time-to-market.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted">
              <Pill>React 19</Pill>
              <Pill>Next.js</Pill>
              <Pill>Tailwind</Pill>
              <Pill>Firebase Assets</Pill>
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
          <SectionTitle>Technical North Star</SectionTitle>
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
            <SectionTitle eyebrow="Source: .context/project-catalog.json">
              Project Catalog
            </SectionTitle>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
