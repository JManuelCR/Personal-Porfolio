import { promises as fs } from "node:fs";
import path from "node:path";
import type { CatalogProject, CatalogSource } from "@/types/portfolio";

const contextDirectory = path.resolve(process.cwd(), "..", ".context");

const sanitizeCitationNoise = (content: string): string => {
  return content
    .replace(/\[cite_start\]/g, "")
    .replace(/\[cite:\s*[^\]]+\]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

export async function readDictionary(name: string): Promise<string> {
  const target = path.join(contextDirectory, name);
  const fileContent = await fs.readFile(target, "utf-8");
  return sanitizeCitationNoise(fileContent);
}

export async function getProjectCatalog(): Promise<CatalogProject[]> {
  const target = path.join(contextDirectory, "project-catalog.json");
  const raw = await fs.readFile(target, "utf-8");
  const parsed = JSON.parse(raw) as CatalogSource;

  return Object.entries(parsed.project_logic).map(([category, project]) => ({
    id: `${category}-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    category,
    name: project.name,
    stack: project.stack,
    impact: sanitizeCitationNoise(project.impact),
    visual: sanitizeCitationNoise(project.visual),
  }));
}

export async function getIdentitySnapshot(): Promise<string> {
  return readDictionary("core-identity.md");
}

export async function getTechnicalSnapshot(): Promise<string> {
  return readDictionary("technical-specs.md");
}
