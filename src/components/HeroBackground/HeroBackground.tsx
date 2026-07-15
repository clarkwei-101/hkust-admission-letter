'use client';

import { useRef, useEffect } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.2 + 0.03,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(153, 102, 0, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Old blue gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0, 51, 102, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(153, 102, 0, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 60%, rgba(74, 126, 181, 0.15) 0%, transparent 30%),
            linear-gradient(180deg, #000a15 0%, #001a33 40%, #002244 70%, #001a33 100%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `
          linear-gradient(rgba(153,102,0,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(153,102,0,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Gold atmospheric glows */}
      <div
        className="absolute top-0 left-1/4 w-[700px] h-[900px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(153,102,0,0.4) 0%, transparent 70%)',
          transform: 'rotate(-15deg)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[600px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,51,102,0.6) 0%, transparent 70%)',
        }}
      />

      {/* Gold dust canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
