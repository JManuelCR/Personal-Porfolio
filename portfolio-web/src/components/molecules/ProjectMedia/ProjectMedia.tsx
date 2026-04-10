"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectMediaProps {
  title: string;
  imageUrl: string;
  videoUrl: string;
  forceActive?: boolean;
}

export function ProjectMedia({
  title,
  imageUrl,
  videoUrl,
  forceActive = false,
}: ProjectMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isActive = isPlaying || forceActive;

  return (
    <div
      className="project-media"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
      onFocus={() => setIsPlaying(true)}
      onBlur={() => setIsPlaying(false)}
      aria-label={`${title} preview`}
      tabIndex={0}
    >
      <Image
        src={imageUrl}
        alt={`${title} static preview`}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`project-media-image ${isActive ? "is-hidden" : ""}`}
      />
      <video
        className={`project-media-video ${isActive ? "is-visible" : ""}`}
        src={videoUrl}
        muted
        autoPlay
        loop
        playsInline
        aria-hidden={!isActive}
      />
    </div>
  );
}
