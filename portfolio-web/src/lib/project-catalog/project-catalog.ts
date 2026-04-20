import type { CatalogProject, CatalogSource } from "@/types/portfolio";

const FIREBASE_MEDIA_PREFIX = "https://firebasestorage.googleapis.com/";

export const sanitizeCitationNoise = (content: string): string => {
  return content
    .replace(/\[cite_start\]/g, "")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .trim();
};

export const isFirebaseStorageUrl = (value: string): boolean => {
  return value.startsWith(FIREBASE_MEDIA_PREFIX);
};

export const mapCatalogSourceToProjects = (
  source: CatalogSource,
): CatalogProject[] => {
  return Object.entries(source.project_logic).map(([category, project]) => {
    if (!isFirebaseStorageUrl(project.firebase_image_url)) {
      throw new Error(`Invalid firebase image URL for ${project.name}`);
    }

    if (!isFirebaseStorageUrl(project.firebase_video_url)) {
      throw new Error(`Invalid firebase video URL for ${project.name}`);
    }

    return {
      id: `${category}-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      category,
      name: project.name,
      stack: project.stack,
      impact: sanitizeCitationNoise(project.impact),
      visual: sanitizeCitationNoise(project.visual),
      firebaseImageUrl: project.firebase_image_url,
      firebaseVideoUrl: project.firebase_video_url,
    };
  });
};
