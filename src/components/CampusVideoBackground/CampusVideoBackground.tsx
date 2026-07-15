'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HKUST campus drone tour video background.
 * Light blur + soft dark overlay keep text legible while showing the campus.
 * Auto-pauses when the tab is hidden (saves CPU + battery).
 */
export default function CampusVideoBackground({
  src = '/hkust-campus-tour.mp4',
}: {
  src?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      {/* Video — light blur so campus reads as ambience, not noise */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: loaded ? 0.85 : 0,
          filter: 'blur(4px) saturate(1.05)',
          transform: 'scale(1.06)',
        }}
      />

      {/* Soft dark gradient — darker at the very top + bottom (where nav/controls live),
          lighter through the middle so the campus stays visible */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(0, 8, 25, 0.85) 0%,
              rgba(0, 8, 25, 0.25) 18%,
              rgba(0, 8, 25, 0.10) 40%,
              rgba(0, 8, 25, 0.30) 75%,
              rgba(0, 8, 25, 0.75) 100%
            )
          `,
        }}
      />

      {/* HKUST blue tint to keep brand color harmony */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.18) 0%, rgba(153, 102, 0, 0.10) 100%)',
        }}
      />
    </div>
  );
}