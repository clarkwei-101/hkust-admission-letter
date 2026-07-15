'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface FireworksProps {
  active: boolean;
  duration?: number; // ms
  onComplete?: () => void;
  colors?: string[];
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
  gravity: number;
};

/**
 * Lightweight canvas-based fireworks. No external deps.
 * Designed for ceremonial "envelope open" bursts.
 */
export default function Fireworks({
  active,
  duration = 4500,
  onComplete,
  colors = ['#d4a84b', '#996600', '#003366', '#ffffff', '#7B2FFF'],
}: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnBurst = (originX: number, originY: number) => {
      const count = 70 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 4 + Math.random() * 6;
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size: 2 + Math.random() * 2,
          gravity: 0.05 + Math.random() * 0.05,
        });
      }
    };

    startRef.current = performance.now();
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const scheduleBursts = [
      { t: 0, x: w() * 0.5, y: h() * 0.45 },
      { t: 600, x: w() * 0.25, y: h() * 0.35 },
      { t: 1100, x: w() * 0.75, y: h() * 0.4 },
      { t: 1700, x: w() * 0.5, y: h() * 0.3 },
      { t: 2400, x: w() * 0.3, y: h() * 0.5 },
      { t: 3100, x: w() * 0.7, y: h() * 0.5 },
    ];

    const tick = (now: number) => {
      const elapsed = now - startRef.current;

      // Schedule new bursts
      scheduleBursts.forEach((b) => {
        if (elapsed > b.t && elapsed - 16 < b.t) {
          spawnBurst(b.x, b.y);
        }
      });

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.vy *= 0.99;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (alpha <= 0) return false;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (elapsed < duration && particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particlesRef.current = [];
        if (onComplete) onComplete();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    // Kick off the first burst immediately
    spawnBurst(w() * 0.5, h() * 0.45);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      particlesRef.current = [];
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [active, duration, colors, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] pointer-events-none"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
