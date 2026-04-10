"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectMediaProps {
  title: string;
  imageUrl: string;
  videoUrl: string;
}

export function ProjectMedia({ title, imageUrl, videoUrl }: ProjectMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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
        className={`project-media-image ${isPlaying ? "is-hidden" : ""}`}
      />
      <video
        className={`project-media-video ${isPlaying ? "is-visible" : ""}`}
        src={videoUrl}
        muted
        autoPlay
        loop
        playsInline
        aria-hidden={!isPlaying}
      />
    </div>
  );
}
