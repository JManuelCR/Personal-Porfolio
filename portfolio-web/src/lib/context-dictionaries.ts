import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  CatalogProject,
  CatalogSource,
  CertificationCatalogItem,
  CertificationCatalogSource,
  ProfileStoryPhase,
  ProfileStorySource,
} from "@/types/portfolio";
import { mapCatalogSourceToProjects, sanitizeCitationNoise } from "@/lib/project-catalog";

const contextDirectory = path.resolve(process.cwd(), "..", ".context");

export async function readDictionary(name: string): Promise<string> {
  const target = path.join(contextDirectory, name);
  const fileContent = await fs.readFile(target, "utf-8");
  return sanitizeCitationNoise(fileContent);
}

export async function getProjectCatalog(): Promise<CatalogProject[]> {
  const target = path.join(contextDirectory, "project-catalog.json");
  const raw = await fs.readFile(target, "utf-8");
  const parsed = JSON.parse(raw) as CatalogSource;

  return mapCatalogSourceToProjects(parsed);
}

export async function getCertificationsCatalog(): Promise<CertificationCatalogItem[]> {
  const target = path.join(contextDirectory, "certifications-catalog.json");
  const raw = await fs.readFile(target, "utf-8");
  const parsed = JSON.parse(raw) as CertificationCatalogSource;

  return parsed.certifications.map((certification) => ({
    id: certification.id,
    name: certification.name,
    issuer: certification.issuer,
    date: certification.date,
    category: certification.category,
    skills: certification.skills,
    impact: sanitizeCitationNoise(certification.impact),
    firebaseImageUrl: certification.firebase_image_url,
    credentialUrl: certification.credential_url,
  }));
}

export async function getProfileStoryPhases(): Promise<ProfileStoryPhase[]> {
  const target = path.join(contextDirectory, "profile-story.json");
  const raw = await fs.readFile(target, "utf-8");
  const parsed = JSON.parse(raw) as ProfileStorySource;

  return parsed.narrative_parallax.map((phase) => ({
    id: phase.id,
    stage: sanitizeCitationNoise(phase.stage),
    title: sanitizeCitationNoise(phase.title),
    description: sanitizeCitationNoise(phase.description),
    imageGallery: phase.image_gallery,
    backgroundLayer: phase.visual_assets.background_layer,
    floatingElement: phase.visual_assets.floating_element,
    parallaxSpeed: phase.parallax_speed,
  }));
}

export async function getIdentitySnapshot(): Promise<string> {
  return readDictionary("core-identity.md");
}

export async function getTechnicalSnapshot(): Promise<string> {
  return readDictionary("technical-skills.md");
}
