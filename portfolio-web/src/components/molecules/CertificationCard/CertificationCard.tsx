import Image from "next/image";
import { Pill } from "@/components/atoms";

export interface CertificationCardProps {
  badge: string;
  title: string;
  issuer: string;
  imageUrl: string;
  skills: string[];
  active?: boolean;
}

export function CertificationCard({
  badge,
  title,
  issuer,
  imageUrl,
  skills,
  active = false,
}: CertificationCardProps) {
  return (
    <article className={`certification-card ${active ? "is-active" : ""}`}>
      <div className="certification-card-media">
        <Image
          src={imageUrl}
          alt={`${title} credential image`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1120px) 50vw, 33vw"
          className="certification-card-image"
        />
      </div>

      <div className="certification-card-badge-shell">
        <span className="certification-card-badge">{badge}</span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
        <p className="text-sm uppercase tracking-[0.18em] text-muted">{issuer}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Pill key={`${title}-${skill}`} size="small">
            {skill}
          </Pill>
        ))}
      </div>
    </article>
  );
}
