'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden transition-all duration-300';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white shadow-lg shadow-[#996600]/30 hover:shadow-[#996600]/50',
    secondary: 'bg-gradient-to-r from-[#003366] to-[#1a4d7c] text-white shadow-lg shadow-[#003366]/30 hover:shadow-[#003366]/50',
    outline: 'border-2 border-[#996600] text-[#996600] hover:bg-[#996600] hover:text-white',
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = (
    <>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
        style={{ width: '50%' }}
      />

      {/* Icon */}
      {Icon && <Icon className="w-5 h-5 relative z-10" />}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-white/10" />
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={disabled ? {} : { y: -3, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
