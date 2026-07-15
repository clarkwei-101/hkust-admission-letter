'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Persistent background video — plays the same campus loop across every
 * feature page. Uses `position: fixed; inset: 0` so the viewport always
 * shows the video regardless of scroll position. Renders behind page
 * content (z-0) and disables pointer events.
 */
export default function PersistentVideo({
  src = '/hkust-campus-tour.mp4',
}: {
  src?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // attempt to play (some browsers block autoplay without user gesture)
    const play = () => video.play().catch(() => {});
    play();

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          opacity: loaded ? 0.7 : 0,
          transform: 'scale(1.05)',
        }}
      />

      {/* Subtle dark wash keeps page text legible while keeping the video visible */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(0, 8, 25, 0.55) 0%,
              rgba(0, 8, 25, 0.25) 30%,
              rgba(0, 8, 25, 0.40) 70%,
              rgba(0, 8, 25, 0.70) 100%
            )
          `,
        }}
      />

      {/* HKUST blue + gold tint for brand harmony */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.18) 0%, rgba(153, 102, 0, 0.10) 100%)',
        }}
      />
    </div>
  );
}