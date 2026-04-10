import { ParallaxLayer } from "@/components/atoms/ParallaxLayer";
import { SectionTitle } from "@/components/atoms/SectionTitle";

interface ExperienceParallaxSectionProps {
  content: {
    title: string;
    subtitle: string;
    timelineTitle: string;
    telecomTitle: string;
    telecomDetail: string;
    automotiveTitle: string;
    automotiveDetail: string;
  };
}

export function ExperienceParallaxSection({
  content,
}: ExperienceParallaxSectionProps) {
  return (
    <section id="trayectoria" className="relative overflow-hidden rounded-3xl border border-line bg-panel p-8 md:p-12">
      <ParallaxLayer speed={0.45} className="experience-shape shape-grid" />
      <ParallaxLayer speed={0.9} className="experience-shape shape-ring" />
      <ParallaxLayer speed={1.35} className="experience-shape shape-glow" />

      <div className="relative z-10 space-y-8">
        <SectionTitle eyebrow={content.timelineTitle}>{content.title}</SectionTitle>
        <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
          {content.subtitle}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="experience-card">
            <p className="experience-card-title">{content.telecomTitle}</p>
            <p className="experience-card-copy">{content.telecomDetail}</p>
          </article>
          <article className="experience-card">
            <p className="experience-card-title">{content.automotiveTitle}</p>
            <p className="experience-card-copy">{content.automotiveDetail}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
