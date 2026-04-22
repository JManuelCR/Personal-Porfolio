import {
  LanguageSwitcher,
  Pill,
  SectionTitle,
  ThemeToggle,
} from "@/components/atoms";
import MainImage from "@/components/atoms/MainImage/MainImage";
import {
  CertificationSlider,
  ExperienceParallaxSection,
  ProfileVisualNarrative,
  ProjectCard,
  StoryTransitionSection,
} from "@/components/organisms";
import type { CertificationSlideItem } from "@/components/organisms/CertificationSlider";
import type { CatalogProject, ProfileStoryPhase } from "@/types/portfolio";
import { IDENTITY } from "@/constants/identity";
import { getPublicUrl } from "@/lib/supabase";
import Image from "next/image";
import { Header } from "@/components/organisms/Header/Header";
interface Link {
  title: string;
  value: string;
}
interface IdentityHighlightItem {
  title: string;
  value: string;
  links: Link[];
}

export interface PortfolioHomeTemplateContent {
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
    items: CertificationSlideItem[];
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
}

interface PortfolioHomeTemplateProps {
  identityHighlights: IdentityHighlightItem[];
  stackHighlights: string[];
  profileStoryPhases: ProfileStoryPhase[];
  projects: CatalogProject[];
  profileName: string;
  profileTitle: string;
  content: PortfolioHomeTemplateContent;
}

export async function PortfolioHomeTemplate({
  identityHighlights,
  stackHighlights,
  profileStoryPhases,
  projects,
  profileName,
  profileTitle,
  content,
}: PortfolioHomeTemplateProps) {
  const avatarUrl = await getPublicUrl(IDENTITY.personal.avatarPath);
  const projectWithImagesURLs = await Promise.all(
    projects.map(async (project) => {
      const image = await getPublicUrl(project.imageUrl);
      const video = await getPublicUrl(project.videoUrl, 3600, "video");
      return {
        ...project,
        imageUrl: image,
        videoUrl: video,
      };
    }),
  );
  const contactItems = (
    data: IdentityHighlightItem,
  ): string | React.ReactNode => {
    if (!data.title.toLocaleLowerCase().includes("contact")) return data.value;
    return (
      <ul className="contact-info">
        {data.links.map((link, index) => (
          <div key={index} className="contact-item">
            <li className="content">
              <span>{link.title}: </span>
              <a
                href={
                  link.title.toLocaleLowerCase() === "email"
                    ? `mailto:${link.value}`
                    : link.value
                }
                target="_blank"
              >
                {link.value}
              </a>
            </li>
          </div>
        ))}
      </ul>
    );
  };
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
        <div className="orb orb-left" />
        <div className="orb orb-right" />
      </div>

      <Header avatarUrl={avatarUrl} content={content} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-14 pt-30 md:px-12 md:pb-20 md:pt-34">
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
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted text-shadow-amber-50 justify-center md:justify-start">
              <Pill variant="tag">Angular</Pill>
              <Pill variant="tag">Figma Design</Pill>
              <Pill variant="tag">Python</Pill>
              <Pill variant="tag">SQL</Pill>
              <Pill variant="tag">React 19</Pill>
              <Pill variant="tag">Next.js</Pill>
              <Pill variant="tag">Tailwind</Pill>
              <Pill variant="tag">CI/CD</Pill>
              <Pill variant="tag">Copilot</Pill>
              <Pill variant="tag">Cursor</Pill>
              <Pill variant="tag">MONGO DB</Pill>
              <Pill variant="tag">Postgres</Pill>
              <Pill variant="tag">Postgres</Pill>
            </div>
          </div>
          <aside className="surface-card space-y-4 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-accent-strong">
              {content.identity}
            </p>
            <div className="image-container">
              <Image
                className="card-image"
                src={avatarUrl}
                alt="Image Profile"
                width={110}
                height={150}
              />
            </div>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              {identityHighlights.map((item) => (
                <li
                  key={`${item.title}-${item.value}`}
                  className="list-disc list-inside"
                >
                  <strong className="font-semibold text-foreground">
                    {item.title}:
                  </strong>
                  <br />
                  {contactItems(item)}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow={content.catalogSource}>
              {content.catalog}
            </SectionTitle>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projectWithImagesURLs.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        <ProfileVisualNarrative phases={profileStoryPhases} />
        <ExperienceParallaxSection content={content.experience} />

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
      </main>
    </div>
  );
}
