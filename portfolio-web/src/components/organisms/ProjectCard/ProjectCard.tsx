"use client";

import { useState } from "react";
import { Pill } from "@/components/atoms";
import { ProjectMedia } from "@/components/molecules";
import type { CatalogProject } from "@/types/portfolio";

const prettyCategory = (value: string): string => {
  return value
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

interface ProjectCardProps {
  project: CatalogProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className="project-card group rounded-2xl p-4 hover:-translate-y-1 md:p-6"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <ProjectMedia
        title={project.name}
        imageUrl={project.imageUrl}
        videoUrl={project.videoUrl}
        forceActive={isActive}
      />
      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-accent-strong">
        {prettyCategory(project.category)}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{project.impact}</p>
      <p className="mt-3 text-sm text-muted">{project.visual}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Pill key={`${project.id}-${tech}`} size="small">
            {tech}
          </Pill>
        ))}
      </div>
    </article>
  );
}
