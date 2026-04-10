"use client";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import type { AppLocale } from "@/i18n/routing";

const supportedLocales: AppLocale[] = ["es", "en"];
const localeSwitchScrollResetKey = "portfolio:locale-switch-reset-scroll";

export function buildLocaleTarget(
  pathname: string,
  search: string,
  nextLocale: AppLocale,
): string {
  const pathWithoutLocale = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
  const normalizedPath =
    pathWithoutLocale === "" || pathWithoutLocale === "/" ? "" : pathWithoutLocale;

  return `/${nextLocale}${normalizedPath}${search}`;
}

interface LanguageSwitcherProps {
  value?: AppLocale;
  onChange?: (locale: AppLocale) => void;
}

export function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  const localeFromContext = useLocale() as AppLocale;
  const locale = value ?? localeFromContext;

  const handleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale) {
      return;
    }

    if (onChange) {
      onChange(nextLocale);
      return;
    }

    Cookies.set("NEXT_LOCALE", nextLocale, { expires: 365, sameSite: "lax" });

    const { pathname: currentPathname, search } = window.location;
    window.sessionStorage.setItem(localeSwitchScrollResetKey, "1");
    window.location.assign(buildLocaleTarget(currentPathname, search, nextLocale));
  };

  return (
    <div className="language-switcher" role="group" aria-label="Language selector">
      {supportedLocales.map((option) => (
        <button
          key={option}
          type="button"
          className={`language-switcher-option ${locale === option ? "is-active" : ""}`}
          onClick={() => handleChange(option)}
          aria-pressed={locale === option}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
