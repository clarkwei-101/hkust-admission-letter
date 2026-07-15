'use client';

import { useEffect, useRef, useState } from 'react';
import { useMouseScrub } from '@/hooks/useMouseScrub';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

export default function ScrubVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useMouseScrub(videoRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isDesktop) return;
    video.autoplay = true;
    video.play().catch(() => {});
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div style={{ width: '50%', height: '100%', overflow: 'hidden', flexShrink: 0 }}>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right bottom',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  );
}
