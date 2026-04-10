import { LanguageSwitcher, Pill, SectionTitle, ThemeToggle } from "@/components/atoms";
import {
  CertificationSlider,
  ExperienceParallaxSection,
  ProjectCard,
  StoryTransitionSection,
} from "@/components/organisms";
import type { CatalogProject } from "@/types/portfolio";

interface PortfolioHomeTemplateProps {
  identityHighlights: string[];
  stackHighlights: string[];
  projects: CatalogProject[];
  profileName: string;
  profileTitle: string;
  content: {
    badge: string;
    headline: string;
    description: string;
    identity: string;
    technical: string;
    catalog: string;
    catalogSource: string;
    controlsTheme: string;
    controlsLanguage: string;
    themeDark: string;
    themeLight: string;
    navCertifications: string;
    navExperience: string;
    navStory: string;
    certifications: {
      eyebrow: string;
      title: string;
      subtitle: string;
      previousLabel: string;
      nextLabel: string;
      statusLabel: string;
      items: Array<{
        badge: string;
        title: string;
        issuer: string;
        dotLabel: string;
      }>;
    };
    experience: {
      title: string;
      subtitle: string;
      timelineTitle: string;
      telecomTitle: string;
      telecomDetail: string;
      automotiveTitle: string;
      automotiveDetail: string;
    };
    story: {
      title: string;
      subtitle: string;
      focusLabel: string;
      focusValue: string;
    };
  };
}

export function PortfolioHomeTemplate({
  identityHighlights,
  stackHighlights,
  projects,
  profileName,
  profileTitle,
  content,
}: PortfolioHomeTemplateProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="orb orb-left" />
        <div className="orb orb-right" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:px-12 md:py-20">
        <section className="control-strip sticky top-3 z-50 ml-auto flex w-fit flex-wrap items-center justify-end gap-3 rounded-full px-4 py-3 md:px-5">
          <a href="#certifications" className="chip chip-small">
            {content.navCertifications}
          </a>
          <a href="#trayectoria" className="chip chip-small">
            {content.navExperience}
          </a>
          <a href="#historia" className="chip chip-small">
            {content.navStory}
          </a>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.controlsLanguage}
          </p>
          <LanguageSwitcher />
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.controlsTheme}
          </p>
          <ThemeToggle darkLabel={content.themeDark} lightLabel={content.themeLight} />
        </section>

        <section className="mission-panel mission-panel-strong grid gap-10 rounded-3xl p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
              {content.badge}
            </p>
            <h1 className="hero-title gradient-title text-4xl font-semibold text-balance md:text-6xl">
              {content.headline}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
              {content.description}
            </p>
            <p className="text-sm leading-7 text-foreground/95 md:text-base">
              {profileName}
              <span className="mx-2 text-accent-strong">|</span>
              {profileTitle}
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted">
              <Pill>React 19</Pill>
              <Pill>Next.js</Pill>
              <Pill>Tailwind</Pill>
              <Pill>Firebase Assets</Pill>
            </div>
          </div>
          <aside className="surface-card space-y-4 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">
              {content.identity}
            </p>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              {identityHighlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="space-y-6">
          <SectionTitle>{content.technical}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {stackHighlights.map((item) => (
              <article
                key={item}
                className="surface-card rounded-2xl p-5 text-sm leading-7 text-muted"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        <ExperienceParallaxSection content={content.experience} />

        <StoryTransitionSection content={content.story} />

        <CertificationSlider
          eyebrow={content.certifications.eyebrow}
          title={content.certifications.title}
          subtitle={content.certifications.subtitle}
          previousLabel={content.certifications.previousLabel}
          nextLabel={content.certifications.nextLabel}
          statusLabel={content.certifications.statusLabel}
          items={content.certifications.items}
          autoPlay
        />

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow={content.catalogSource}>
              {content.catalog}
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
