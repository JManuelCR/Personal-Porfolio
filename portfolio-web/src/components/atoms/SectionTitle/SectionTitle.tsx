import type { PropsWithChildren } from "react";

interface SectionTitleProps extends PropsWithChildren {
  eyebrow?: string;
}

export function SectionTitle({ eyebrow, children }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.18em] text-accent-strong">{eyebrow}</p>
      ) : null}
      <h2 className="section-title gradient-title text-2xl font-semibold md:text-3xl">
        {children}
      </h2>
    </div>
  );
}
