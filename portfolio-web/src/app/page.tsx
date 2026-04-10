import {
  getIdentitySnapshot,
  getProjectCatalog,
  getTechnicalSnapshot,
} from "@/lib/context-dictionaries";
import { PortfolioHomeTemplate } from "@/components/templates/PortfolioHomeTemplate";

export default async function Home() {
  const [identitySnapshot, technicalSnapshot, catalog] = await Promise.all([
    getIdentitySnapshot(),
    getTechnicalSnapshot(),
    getProjectCatalog(),
  ]);

  const identityHighlights = identitySnapshot
    .split("\n")
    .filter((line) => line.startsWith("-"))
    .slice(0, 3)
    .map((line) => line.replace(/^-\s*/, "").trim());

  const stackHighlights = technicalSnapshot
    .split("\n")
    .filter((line) => line.startsWith("-"))
    .slice(0, 4)
    .map((line) => line.replace(/^-\s*/, "").trim());

  return (
    <PortfolioHomeTemplate
      identityHighlights={identityHighlights}
      stackHighlights={stackHighlights}
      projects={catalog}
    />
  );
}
