'use client';

import { useState } from 'react';
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

  console.log('[Curtain] mounted, isOpen:', isOpen);

  return (
    <>
      {/* Curtain overlay — always visible when closed, sits at page center */}
      {!isOpen && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none ${className}`}
          onClick={() => setLocalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          {/* Two curtain panels sliding from center outward */}
          <div
            className="absolute inset-0 flex"
            style={{ pointerEvents: 'none' }}
          >
            {/* Left panel */}
            <div
              className="h-full overflow-hidden"
              style={{
                width: '50vw',
                transform: localOpen ? 'translateX(-100%)' : 'translateX(0)',
                transition: 'transform 0.9s cubic-bezier(0.6, 0.05, 0.2, 0.95)',
              }}
            >
              <div
                className="h-full w-[100vw]"
                style={{
                  background:
                    'linear-gradient(90deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                  boxShadow: 'inset -8px 0 18px rgba(0,0,0,0.45), 4px 0 8px rgba(0,0,0,0.5)',
                }}
              />
            </div>

            {/* Right panel */}
            <div
              className="h-full overflow-hidden"
              style={{
                width: '50vw',
                transform: localOpen ? 'translateX(100%)' : 'translateX(0)',
                transition: 'transform 0.9s cubic-bezier(0.6, 0.05, 0.2, 0.95)',
              }}
            >
              <div
                className="h-full w-[100vw]"
                style={{
                  background:
                    'linear-gradient(270deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                  boxShadow: 'inset 8px 0 18px rgba(0,0,0,0.45), -4px 0 8px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          </div>

          {/* Center label — sits in the middle of the page */}
          <div
            className="relative z-10 flex flex-col items-center text-center px-3"
            style={{ pointerEvents: 'none' }}
          >
            <div className="animate-pulse" style={{ color: '#d4a84b' }}>
              <Hand className="w-6 h-6 mb-2" />
            </div>
            <span
              className="text-xs md:text-sm uppercase tracking-[0.35em] font-semibold"
              style={{ color: '#d4a84b' }}
            >
              {label}
            </span>
            <span
              className="text-[9px] md:text-xs uppercase tracking-[0.25em] mt-1"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {hint}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
