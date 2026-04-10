export interface CertificationCardProps {
  badge: string;
  title: string;
  issuer: string;
  active?: boolean;
}

export function CertificationCard({
  badge,
  title,
  issuer,
  active = false,
}: CertificationCardProps) {
  return (
    <article className={`certification-card ${active ? "is-active" : ""}`}>
      <div className="certification-card-badge-shell">
        <span className="certification-card-badge">{badge}</span>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
        <p className="text-sm uppercase tracking-[0.18em] text-muted">{issuer}</p>
      </div>
    </article>
  );
}
