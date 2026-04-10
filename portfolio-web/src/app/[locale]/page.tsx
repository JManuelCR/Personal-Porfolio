import { getTranslations } from "next-intl/server";
import {
  getIdentitySnapshot,
  getProjectCatalog,
  getTechnicalSnapshot,
} from "@/lib/context-dictionaries";
import { PortfolioHomeTemplate } from "@/components/templates/PortfolioHomeTemplate";

export default async function LocaleHomePage() {
  const [identitySnapshot, technicalSnapshot, catalog, tProfile, tHero] =
    await Promise.all([
      getIdentitySnapshot(),
      getTechnicalSnapshot(),
      getProjectCatalog(),
      getTranslations("profile"),
      getTranslations("hero"),
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
      profileName={tProfile("name")}
      profileTitle={tProfile("title")}
      content={{
        badge: tHero("badge"),
        headline: tHero("headline"),
        description: tHero("description"),
        identity: tHero("identity"),
        technical: tHero("technical"),
        catalog: tHero("catalog"),
        catalogSource: tHero("catalogSource"),
      }}
    />
  );
}
