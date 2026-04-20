import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

interface PillProps extends PropsWithChildren {
  size?: "default" | "small";
  variant?: "primary" | "tag";
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Pill({
  children,
  size = "default",
  variant = "primary",
}: PillProps) {
  const variants = {
    primary: "chip",
    tag: "tag relative bg-accent-strong/30 backdrop-blur-sm rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-[inset_10px_10px_10px_rgba(0,0,0,0.05),15px_25px_10px_rgba(0,0,0,0.1),inset_-10px_-10px_15px_rgba(255,255,255,0.5)] flex items-center justify-center  border border-white/20",
  };
  return (
    <span
      className={cn(
        `${size === "small" ? "chip-small" : ""}`,
        variants[variant],
      )}
    >
      {children}
    </span>
  );
}
