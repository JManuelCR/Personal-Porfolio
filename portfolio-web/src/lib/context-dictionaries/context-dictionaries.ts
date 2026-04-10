import { promises as fs } from "node:fs";
import path from "node:path";
import type { CatalogProject, CatalogSource } from "@/types/portfolio";
import {
  mapCatalogSourceToProjects,
  sanitizeCitationNoise,
} from "@/lib/project-catalog";

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

export async function getIdentitySnapshot(): Promise<string> {
  return readDictionary("core-identity.md");
}

export async function getTechnicalSnapshot(): Promise<string> {
  return readDictionary("technical-specs.md");
}
