'use client';

import { useState } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  embedUrl: string;   // e.g. https://www.youtube.com/embed/VIDEO_ID?rel=0
  title: string;
  thumbnailUrl?: string; // optional custom thumbnail; falls back to YouTube HQ thumb
  className?: string;
}

function extractVideoId(embedUrl: string): string | null {
  // matches /embed/VIDEO_ID
  const match = embedUrl.match(/\/embed\/([^?&/]+)/);
  return match ? match[1] : null;
}

export default function YouTubeFacade({ embedUrl, title, thumbnailUrl, className = '' }: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = extractVideoId(embedUrl);
  // Use YouTube's maxresdefault if no custom thumbnail
  const thumb = thumbnailUrl || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '');

  // When the user clicks play, mount the real iframe with autoplay=1
  const playUrl = embedUrl.includes('?')
    ? `${embedUrl}&autoplay=1`
    : `${embedUrl}?autoplay=1`;

  if (isPlaying) {
    return (
      <div className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={playUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-pointer group ${className}`}
      onClick={() => setIsPlaying(true)}
      role="button"
      aria-label={`Play ${title}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true); }}
    >
      {/* Thumbnail */}
      {thumb && (
        <Image
          src={thumb}
          alt={`${title} thumbnail`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          unoptimized
          priority
        />
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

      {/* YouTube-style Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Outer ring pulse */}
          <div className="absolute w-24 h-24 rounded-full bg-white/10 animate-ping group-hover:animate-none" />
          {/* Main button */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-black/70 border-2 border-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-[#15b6e8] group-hover:border-[#15b6e8] transition-all duration-300 group-hover:scale-110">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Title label at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <p className="text-white text-sm font-semibold truncate opacity-80 group-hover:opacity-100 transition-opacity">
          {title}
        </p>
      </div>
    </div>
  );
}
