import { getTranslations } from "next-intl/server";
import {
  getIdentitySnapshot,
  getProjectCatalog,
  getTechnicalSnapshot,
} from "@/lib/context-dictionaries";
import { PortfolioHomeTemplate } from "@/components/templates";
import type { AppLocale } from "@/i18n/routing";

interface LocaleHomePageProps {
  params: Promise<{ locale: AppLocale }>;
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  const [
    identitySnapshot,
    technicalSnapshot,
    catalog,
    tProfile,
    tHero,
    tControls,
    tExperience,
    tStory,
  ] =
    await Promise.all([
      getIdentitySnapshot(),
      getTechnicalSnapshot(),
      getProjectCatalog(),
      getTranslations({ locale, namespace: "profile" }),
      getTranslations({ locale, namespace: "hero" }),
      getTranslations({ locale, namespace: "controls" }),
      getTranslations({ locale, namespace: "experience" }),
      getTranslations({ locale, namespace: "story" }),
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
        controlsTheme: tControls("theme"),
        controlsLanguage: tControls("language"),
        themeDark: tControls("dark"),
        themeLight: tControls("light"),
        navExperience: tControls("navExperience"),
        navStory: tControls("navStory"),
        experience: {
          title: tExperience("title"),
          subtitle: tExperience("subtitle"),
          timelineTitle: tExperience("timelineTitle"),
          telecomTitle: tExperience("telecomTitle"),
          telecomDetail: tExperience("telecomDetail"),
          automotiveTitle: tExperience("automotiveTitle"),
          automotiveDetail: tExperience("automotiveDetail"),
        },
        story: {
          title: tStory("title"),
          subtitle: tStory("subtitle"),
          focusLabel: tStory("focusLabel"),
          focusValue: tStory("focusValue"),
        },
      }}
    />
  );
}
