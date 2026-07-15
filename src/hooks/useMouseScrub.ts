'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useMouseScrub(videoRef: RefObject<HTMLVideoElement | null>) {
  const prevXRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (video.duration === 0 || isNaN(video.duration)) return;

      const delta = prevXRef.current !== null ? e.clientX - prevXRef.current : 0;
      prevXRef.current = e.clientX;

      const targetTime = video.currentTime + (delta / window.innerWidth) * 0.8 * video.duration;
      video.currentTime = Math.max(0, Math.min(video.duration, targetTime));
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleSeeked = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoRef]);
}
