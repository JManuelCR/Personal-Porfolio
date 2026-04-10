"use client";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import type { AppLocale } from "@/i18n/routing";

const supportedLocales: AppLocale[] = ["es", "en"];

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

    const { pathname: currentPathname, search, hash } = window.location;
    const pathWithoutLocale =
      currentPathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
    window.location.assign(`/${nextLocale}${pathWithoutLocale}${search}${hash}`);
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
