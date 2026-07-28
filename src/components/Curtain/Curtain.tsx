'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand } from 'lucide-react';

interface CurtainProps {
  open?: boolean;
  label?: string;
  hint?: string;
  className?: string;
}

export default function Curtain({
  open: controlledOpen = false,
  label = 'Covered',
  hint = 'Tap to reveal',
  className = '',
}: CurtainProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = controlledOpen || localOpen;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: '100%', height: '100%' }}
      onClick={() => !isOpen && setLocalOpen(true)}
    >
      {/* Curtain overlay — pure CSS, no Framer Motion, always renders until open */}
      {!isOpen && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{
            pointerEvents: 'none',
          }}
        >
          {/* Left panel */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 h-full overflow-hidden"
            style={{
              transform: localOpen ? 'translateX(-105%)' : 'translateX(0)',
              transition: 'transform 0.9s cubic-bezier(0.6, 0.05, 0.2, 0.95)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                boxShadow: 'inset -8px 0 18px rgba(0,0,0,0.45), 4px 0 8px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-3"
              style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0))' }}
            />
            <div
              className="absolute inset-y-0 right-6 w-px opacity-40"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
            <div
              className="absolute inset-y-0 right-12 w-px opacity-30"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            />
            <div
              className="absolute top-1/2 -right-2 -translate-y-1/2 z-10"
              style={{}}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: '#d4a84b', boxShadow: '0 0 6px rgba(212,168,83,0.6)' }}
              />
            </div>
          </div>

          {/* Right panel */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 h-full overflow-hidden"
            style={{
              transform: localOpen ? 'translateX(105%)' : 'translateX(0)',
              transition: 'transform 0.9s cubic-bezier(0.6, 0.05, 0.2, 0.95)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                boxShadow: 'inset 8px 0 18px rgba(0,0,0,0.45), -4px 0 8px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="absolute inset-y-0 left-0 w-3"
              style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.4), rgba(0,0,0,0))' }}
            />
            <div
              className="absolute inset-y-0 left-6 w-px opacity-40"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
            <div
              className="absolute inset-y-0 left-12 w-px opacity-30"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            />
            <div
              className="absolute top-1/2 -left-2 -translate-y-1/2 z-10"
              style={{}}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: '#d4a84b', boxShadow: '0 0 6px rgba(212,168,83,0.6)' }}
              />
            </div>
          </div>

          {/* Center label */}
          <div
            className="relative z-10 flex flex-col items-center text-center px-3"
            style={{ pointerEvents: 'none' }}
          >
            <div className="animate-pulse" style={{ color: '#d4a84b' }}>
              <Hand className="w-5 h-5 mb-1" />
            </div>
            <span
              className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold"
              style={{ color: '#d4a84b' }}
            >
              {label}
            </span>
            <span
              className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] mt-1"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {hint}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
