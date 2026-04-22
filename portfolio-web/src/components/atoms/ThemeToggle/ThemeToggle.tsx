"use client";

import { useSyncExternalStore, useMemo } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
interface ThemeToggleProps {
  darkLabel?: string;
  lightLabel?: string;
}

// Función para saber si estamos en el cliente
const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback); // Solo para registrar un listener
  return () => window.removeEventListener("resize", callback);
};

export function ThemeToggle({ darkLabel = "Dark", lightLabel = "Light" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  // Este hook devuelve 'false' en el servidor y 'true' en el cliente de forma segura
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  // Si no es el cliente, renderizamos el estado inicial fijo (SSR)
  if (!isClient) {
    return (
      <button type="button" className="theme-toggle opacity-50">
        <span className="theme-toggle-thumb" style={{ transform: "translateX(2px)" }} />
        <span className="theme-toggle-label font-extrabold">{lightLabel}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
    >
      <motion.span
        className="theme-toggle-thumb"
        animate={{ x: isDark ? 33 : 2 }}
      />
      <span className="theme-toggle-label font-extrabold">
        {isDark ? darkLabel : lightLabel}
      </span>
    </button>
  );
}