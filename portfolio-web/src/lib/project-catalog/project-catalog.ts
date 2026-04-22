import type { CatalogProject, CatalogSource } from "@/types/portfolio";

const FIREBASE_MEDIA_PREFIX = "https://firebasestorage.googleapis.com/";

export const sanitizeCitationNoise = (content: string): string => {
  return content
    .replace(/\[cite_start\]/g, "")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .trim();
};


export const mapCatalogSourceToProjects = (
  source: CatalogSource,
): CatalogProject[] => {
  return Object.entries(source.project_logic).map(([category, project]) => {

    return {
      id: `${category}-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      category,
      name: project.name,
      stack: project.stack,
      impact: sanitizeCitationNoise(project.impact),
      visual: sanitizeCitationNoise(project.visual),
      imageUrl: project.image_url,
      videoUrl: project.video_url,
      linkToProject: project.link
    };
  });
};
