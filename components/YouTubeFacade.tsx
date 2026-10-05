'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  embedUrl: string;   // e.g. https://www.youtube.com/embed/VIDEO_ID?rel=0 or VIDEO_ID
  title: string;
  thumbnailUrl?: string; // optional custom thumbnail; falls back to YouTube HQ thumb
  className?: string;
  autoPlay?: boolean; // if true (e.g. in modal after user clicked card), mounts iframe immediately
}

function extractVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

function buildNoCookieUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export default function YouTubeFacade({
  embedUrl,
  title,
  thumbnailUrl,
  className = '',
  autoPlay = false,
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [imgError, setImgError] = useState(false);
  const [hasPreconnected, setHasPreconnected] = useState(false);

  const videoId = extractVideoId(embedUrl);

  const defaultMaxRes = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '';
  const defaultHq = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';

  const currentThumb = thumbnailUrl
    ? (imgError ? defaultHq : thumbnailUrl)
    : (imgError ? defaultHq : defaultMaxRes);

  const playUrl = videoId ? buildNoCookieUrl(videoId) : embedUrl;

  // Preconnect hint on pointer hover (not on page load)
  const handlePointerEnter = useCallback(() => {
    if (hasPreconnected || isPlaying) return;
    setHasPreconnected(true);

    if (typeof document !== 'undefined') {
      let link = document.querySelector('link[data-youtube-nocookie-preconnect]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://www.youtube-nocookie.com';
        link.setAttribute('data-youtube-nocookie-preconnect', 'true');
        document.head.appendChild(link);
      }
    }
  }, [hasPreconnected, isPlaying]);

  if (isPlaying && videoId) {
    return (
      <div className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={playUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-pointer group ${className}`}
      onClick={() => setIsPlaying(true)}
      onPointerEnter={handlePointerEnter}
      role="button"
      aria-label={`Play ${title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
    >
      {/* Thumbnail */}
      {currentThumb && (
        <Image
          src={currentThumb}
          alt={`${title} thumbnail`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
          onError={() => setImgError(true)}
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

