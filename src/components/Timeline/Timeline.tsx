'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineItem {
  year: number;
  title: string;
  titleEn: string;
  description: string;
  color: string;
}

interface TimelineProps {
  items: readonly TimelineItem[];
  title?: string;
}

export default function Timeline({ items, title }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-100px' });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white mb-12 text-center"
        >
          {title}
        </motion.h3>
      )}

      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#996600] via-[#003366] to-[#996600] transform -translate-x-1/2 hidden md:block" />

      {/* Timeline Items */}
      <div className="space-y-12 md:space-y-0">
        {items.map((item, index) => (
          <div
            key={item.year}
            className={`timeline-item relative flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Content Card */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <div
                className="p-6 rounded-2xl border border-[#996600]/20 relative overflow-hidden group hover:border-[#996600]/50 transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${item.color}10 0%, transparent 100%)`,
                }}
              >
                {/* Year Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)`,
                    color: '#fff',
                  }}
                >
                  {item.year}
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-white mb-2 pr-20">
                  {item.title}
                </h4>
                <p className="text-sm text-[#996600] font-medium mb-2">
                  {item.titleEn}
                </p>
                <p className="text-[#C0C0C0] text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>

            {/* Center Dot (Desktop) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="w-6 h-6 rounded-full border-4 border-[#002244] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)` }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </motion.div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
