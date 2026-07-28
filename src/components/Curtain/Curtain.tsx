'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand } from 'lucide-react';

interface CurtainProps {
  /** Optional click target — when true, the curtain opens. */
  open?: boolean;
  /** Label shown when curtain is closed. Use this to hide something behind it. */
  label?: string;
  /** Hint shown beneath the label to invite the click. */
  hint?: string;
  className?: string;
}

// `<Curtain />` is the dual-fabric overlay that hangs in front of a piece of
// branded content (e.g. the HKUST wax seal on the front of the envelope) and
// only reveals that content when the user clicks it. The two halves slide
// apart vertically using Framer Motion.
export default function Curtain({
  open: controlledOpen = false,
  label = 'Covered',
  hint = 'Tap to reveal',
  className = '',
}: CurtainProps) {
  // Local state so the curtain is interactive even without an external
  // controller. When a parent controls it via `open`, that wins once it
  // becomes true.
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = controlledOpen || localOpen;

  return (
    <div
      className={`relative w-full ${className}`}
      onClick={() => !isOpen && setLocalOpen(true)}
      role={isOpen ? undefined : 'button'}
      tabIndex={isOpen ? -1 : 0}
      aria-label={isOpen ? undefined : hint}
      style={{ cursor: isOpen ? 'default' : 'pointer' }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="curtain-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            {/* Left curtain panel */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-105%' }}
              transition={{ duration: 0.9, ease: [0.6, 0.05, 0.2, 0.95] }}
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background:
                  'linear-gradient(90deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                boxShadow: 'inset -8px 0 18px rgba(0,0,0,0.45), 4px 0 8px rgba(0,0,0,0.5)',
              }}
            >
              {/* Fabric folds */}
              <div
                className="absolute inset-y-0 right-0 w-3"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0))',
                }}
              />
              <div
                className="absolute inset-y-0 right-6 w-px opacity-40"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              />
              <div
                className="absolute inset-y-0 right-12 w-px opacity-30"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              />
              {/* Gold tassel */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                <div className="w-3 h-3 rounded-full bg-[#d4a84b] ring-2 ring-[#996600]/60 shadow-lg" />
              </div>
            </motion.div>

            {/* Right curtain panel */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '105%' }}
              transition={{ duration: 0.9, ease: [0.6, 0.05, 0.2, 0.95] }}
              className="absolute inset-y-0 right-0 w-1/2"
              style={{
                background:
                  'linear-gradient(270deg, #6b1f1f 0%, #8b2c2c 35%, #5a1414 70%, #3d0d0d 100%)',
                boxShadow: 'inset 8px 0 18px rgba(0,0,0,0.45), -4px 0 8px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="absolute inset-y-0 left-0 w-3"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(0,0,0,0.4), rgba(0,0,0,0))',
                }}
              />
              <div
                className="absolute inset-y-0 left-6 w-px opacity-40"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              />
              <div
                className="absolute inset-y-0 left-12 w-px opacity-30"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-10">
                <div className="w-3 h-3 rounded-full bg-[#d4a84b] ring-2 ring-[#996600]/60 shadow-lg" />
              </div>
            </motion.div>

            {/* Center label — sits on top of the closed curtain, asking the
                user to tap. It disappears once the curtain opens. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="relative z-10 flex flex-col items-center text-center px-3"
              style={{ pointerEvents: 'none' }}
            >
              <Hand className="w-5 h-5 text-[#d4a84b] mb-1 animate-pulse" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d4a84b] font-semibold">
                {label}
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/70 mt-1">
                {hint}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
