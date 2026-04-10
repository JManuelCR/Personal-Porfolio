"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme !== "light", [resolvedTheme]);

  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      <motion.span
        className="theme-toggle-thumb"
        animate={{ x: isDark ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      />
      <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
