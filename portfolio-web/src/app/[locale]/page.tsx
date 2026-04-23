import { getTranslations } from "next-intl/server";
import {
  getCertificationsCatalog,
  getIdentitySnapshot,
  getProfileStoryPhases,
  getProjectCatalog,
  getTechnicalSnapshot,
} from "@/lib/context-dictionaries";
import {
  PortfolioHomeTemplate,
  type PortfolioHomeTemplateContent,
} from "@/components/templates";
import type { CertificationSlideItem } from "@/components/organisms/CertificationSlider";
import type { AppLocale } from "@/i18n/routing";
import { getPublicUrl } from "@/lib/supabase";

interface LocaleHomePageProps {
  params: Promise<{ locale: AppLocale }>;
}
interface Skill {
  title: string;
  description: string;
}

interface TechnicalSnapshot {
  skills: Record<string, Skill>;
}

interface RootObject {
  technical_north: TechnicalSnapshot;
}

const normalizeI18nKey = (value: string): string => {
  return value.trim().replace(/[.,;:!?]+$/g, "");
};

export const resolveIdentityTranslation = (
  rawValue: string,
  translate: (key: string) => string,
): string => {
  const normalizedKey = normalizeI18nKey(rawValue);

  if (!normalizedKey.includes(".")) {
    return rawValue;
  }

  try {
    const translated = translate(normalizedKey);
    return translated === normalizedKey ? rawValue : translated;
  } catch {
    return rawValue;
  }
};

const parseIdentityBullet = (
  line: string,
): { title: string; value: string } => {
  const boldOutsideColon = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
  if (boldOutsideColon) {
    return {
      title: boldOutsideColon[1].trim(),
      value: boldOutsideColon[2].trim(),
    };
  }

  const boldInsideColon = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
  if (boldInsideColon) {
    return {
      title: boldInsideColon[1].trim(),
      value: boldInsideColon[2].trim(),
    };
  }

  const splitByColon = line.split(/:\s+(.+)/);
  if (splitByColon.length >= 3) {
    return {
      title: splitByColon[0].trim(),
      value: splitByColon[1].trim(),
    };
  }

  return {
    title: line.trim(),
    value: "",
  };
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  const [
    certificationsCatalog,
    identitySnapshot,
    profileStoryPhasesRaw,
    tTechnicalSnapshot,
    catalog,
    tProfile,
    tHero,
    tControls,
    tCertifications,
    tExperience,
    tStory,
    tProfileStory,
    tIdentitySnapshot,
  ] = await Promise.all([
    getCertificationsCatalog(),
    getIdentitySnapshot(),
    getProfileStoryPhases(),
    getTranslations({ locale, namespace: "technicalSnapshot" }),
    getProjectCatalog(),
    getTranslations({ locale, namespace: "profile" }),
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "controls" }),
    getTranslations({ locale, namespace: "certifications" }),
    getTranslations({ locale, namespace: "experience" }),
    getTranslations({ locale, namespace: "story" }),
    getTranslations({ locale, namespace: "profileStory" }),
    getTranslations({ locale, namespace: "identitySnapshot" }),
  ]);
  const profileStoryPhases = profileStoryPhasesRaw.map((phase) => {
    const gallery = phase.imageGallery.map((image) => getPublicUrl(image));
    const backGroundImage = getPublicUrl(phase.backgroundLayer);
    const floating = getPublicUrl(phase.floatingElement);
    return {
      ...phase,
      imageGallery: gallery,
      backgroundLayer: backGroundImage,
      floatingElement: floating,
      stage: tProfileStory(phase.stage),
      title: tProfileStory(phase.title),
      description: tProfileStory(phase.description),
    };
  });

  const certificationItems: CertificationSlideItem[] = await Promise.all(
    certificationsCatalog.map(async (item, index) => {
      const publicUrl = await getPublicUrl(
        item.image_url ? item.image_url : "asf",
      );
      return {
        id: item.id,
        badge: item.category,
        title: item.name,
        issuer: item.issuer,
        imageUrl: publicUrl,
        skills: item.skills,
        dotLabel: tCertifications("dotLabel", {
          index: index + 1,
          title: item.name,
        }),
      };
    }),
  );

  const identityHighlights = (identitySnapshot.match(/^\s*-\s+.+$/gm) ?? [])
    .slice(0, 4)
    .map((line: string) => line.replace(/^\s*-\s*/, "").trim())
    .map((line: string) => parseIdentityBullet(line))
    .map((item) => {
      const title = resolveIdentityTranslation(item.title, tIdentitySnapshot);
      const value = resolveIdentityTranslation(item.value, tIdentitySnapshot);
      let links = undefined;

      try {
        const rawLinks = tIdentitySnapshot.raw("identity.contact.links");
        if (item.title.toLocaleLowerCase().includes("contact")) {
          links = rawLinks.map((link: { title: string; value: string }) => ({
            title: link.title,
            value: link.value,
          }));
        }
      } catch (e) {
        console.error("Error cargando links desde el json de traducción", e);
      }
      return {
        title,
        value,
        links,
      };
    });

  const stackHighlights = await (async() => { 
    const skills = await Promise.resolve(getTechnicalSnapshot());
    const skillDictionary:RootObject = JSON.parse(skills)
    const skillsObject = skillDictionary.technical_north.skills;
    const skillArray = Object.values(skillsObject)
    return skillArray.map((skill) => ({
      title: tTechnicalSnapshot(skill.title),
      description: tTechnicalSnapshot(skill.description)
    }))
  })();

  const content: PortfolioHomeTemplateContent = {
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
    navCertifications: tControls("navCertifications"),
    navExperience: tControls("navExperience"),
    navStory: tControls("navStory"),
    certifications: {
      eyebrow: tCertifications("eyebrow"),
      title: tCertifications("title"),
      subtitle: tCertifications("subtitle"),
      previousLabel: tCertifications("previous"),
      nextLabel: tCertifications("next"),
      statusLabel: tCertifications("statusLabel"),
      items: certificationItems,
    },
    experience: {
      title: tExperience("title"),
      subtitle: tExperience("subtitle"),
      timelineTitle: tExperience("timelineTitle"),
      developmentTitle: tExperience("developmentTitle"),
      developmentDetail: tExperience("developmentDetail"),
      automotiveTitle: tExperience("automotiveTitle"),
      automotiveDetail: tExperience("automotiveDetail"),
      simulationTitle: tExperience("simulationTitle"),
      simulationDetail:tExperience("simulationDetail"),
      dataScientistTitle: tExperience("dataScienceTitle"),
      dataScientistDetail: tExperience("dataScienceDetail")
    },
    story: {
      title: tStory("title"),
      subtitle: tStory("subtitle"),
      focusLabel: tStory("focusLabel"),
      focusValue: tStory("focusValue"),
    },
  };

  return (
    <PortfolioHomeTemplate
      identityHighlights={identityHighlights}
      stackHighlights={stackHighlights}
      profileStoryPhases={profileStoryPhases}
      projects={catalog}
      profileName={tProfile("name")}
      profileTitle={tProfile("title")}
      content={content}
    />
  );
}
