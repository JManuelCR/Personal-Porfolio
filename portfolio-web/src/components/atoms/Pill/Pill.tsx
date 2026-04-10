import type { PropsWithChildren } from "react";

interface PillProps extends PropsWithChildren {
  size?: "default" | "small";
}

export function Pill({ children, size = "default" }: PillProps) {
  return <span className={`chip ${size === "small" ? "chip-small" : ""}`}>{children}</span>;
}
