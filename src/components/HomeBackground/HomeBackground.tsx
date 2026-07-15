'use client';

import { useEffect, useRef } from 'react';

export default function HomeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll('.home-particle');
    particles.forEach((p, i) => {
      const el = p as HTMLElement;
      const delay = parseFloat(el.dataset.delay || '0');
      const size = parseFloat(el.dataset.size || '4');
      const duration = 3 + Math.random() * 3;
      el.style.animationDelay = `${delay}s`;
      el.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 40}px`);
      el.style.setProperty('--drift-y', `${-20 - Math.random() * 30}px`);
      el.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse at 30% 40%, rgba(0,51,102,0.7) 0%, rgba(0,20,60,0.85) 50%, rgba(0,10,25,0.95) 100%)',
      }}
    >
      {Array.from({ length: 40 }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 1 + Math.random() * 2.5;
        const delay = Math.random() * 5;
        const colors = ['#996600', '#d4a84b', '#4a7eb5', '#FFFFFF'];
        const color = colors[i % colors.length];
        const opacity = 0.15 + Math.random() * 0.35;
        return (
          <div
            key={i}
            data-delay={delay}
            data-size={size}
            className="home-particle absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: color,
              opacity,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes floatParticle {
          from { transform: translate(0, 0); }
          to   { transform: translate(var(--drift-x, 0px), var(--drift-y, -30px)); }
        }
      `}</style>
    </div>
  );
}
