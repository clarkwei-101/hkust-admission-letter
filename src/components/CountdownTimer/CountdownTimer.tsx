'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({
  targetDate,
  label = '距离开学',
}: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calculateTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTime(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!time) {
    return (
      <div className="inline-flex items-center gap-3 text-white/60 text-sm">
        <span className="w-2 h-2 rounded-full bg-[#996600] animate-pulse" />
        正在计算...
      </div>
    );
  }

  const isStarted = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  if (isStarted) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        2026 学年已开启！欢迎来到 HKUST
      </div>
    );
  }

  const cells: { value: number; unit: string }[] = [
    { value: time.days, unit: '天' },
    { value: time.hours, unit: '时' },
    { value: time.minutes, unit: '分' },
    { value: time.seconds, unit: '秒' },
  ];

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-[#996600]/80">{label}</span>
      <div className="flex items-center gap-2 md:gap-3">
        {cells.map((c, i) => (
          <div key={c.unit} className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#996600]/20 blur-md rounded-lg" />
              <div className="relative bg-[#003366]/60 backdrop-blur-sm border border-[#996600]/30 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[72px] text-center">
                <div className="text-2xl md:text-4xl font-bold text-white font-mono tabular-nums">
                  {c.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs text-[#C0C0C0] mt-0.5">{c.unit}</div>
              </div>
            </div>
            {i < cells.length - 1 && (
              <span className="text-[#996600]/60 text-2xl font-light pb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}