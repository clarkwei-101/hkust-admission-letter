'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Home, ArrowLeft, Edit3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';
import { LanguageSwitcher } from '@/components/Providers/Providers';

interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Navigation({ showBackButton = false, title }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale } = useI18n();
  const { name, setName } = usePersonalisation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        router.push('/hub');
      } else if (e.key === 'Escape' && pathname !== '/' && pathname !== '/hub') {
        e.preventDefault();
        router.back();
      } else if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.back();
      } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.forward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname, router]);

  const handleEditName = () => {
    setName('');
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="container-hkust mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          <Link href="/hub" className="flex items-center gap-3 group min-w-0">
            {showBackButton && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center flex-shrink-0"
                aria-label={t.common.back}
              >
                <ArrowLeft className="w-5 h-5 text-[#C0C0C0] group-hover:text-[#996600] transition-colors" />
              </motion.button>
            )}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-lg flex items-center justify-center border border-[#996600]/30">
                  <span className="text-[#996600] font-bold text-lg md:text-xl">HK</span>
                </div>
              </div>
              <div className="min-w-0">
                <h1 className="text-sm md:text-base font-semibold text-white truncate">
                  {title || 'HKUST Admission'}
                </h1>
                <p className="text-xs text-[#C0C0C0] hidden md:block truncate">
                  Hong Kong University of Science and Technology
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            <NavLink href="/hub" isActive={pathname === '/hub'}>
              {t.nav.home}
            </NavLink>
            <NavLink href="/content/welcome" isActive={pathname.includes('/welcome')}>
              {t.nav.welcome}
            </NavLink>
            <NavLink href="/content/resources" isActive={pathname.includes('/resources')}>
              {t.nav.resources}
            </NavLink>
            <NavLink href="/content/checklist" isActive={pathname.includes('/checklist')}>
              {t.nav.checklist}
            </NavLink>
            <NavLink href="/content/campus-live" isActive={pathname.includes('/campus-live')}>
              {locale === 'zh' ? '实时校园' : 'Live Campus'}
            </NavLink>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {name && (
              <div
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#996600]/15 border border-[#996600]/30 text-[#d4a84b] text-xs font-medium"
                title={t.nav.personaliseLabel}
              >
                <span className="max-w-[120px] truncate">{name}</span>
                <button
                  onClick={handleEditName}
                  className="hover:text-white transition-colors"
                  aria-label={t.nav.personaliseEdit}
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}

            <LanguageSwitcher />

            <Link href="/hub" className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-[#003366]/50 text-white hover:bg-[#003366] transition-colors"
                aria-label={t.nav.home}
              >
                <Home className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#996600]/30 to-transparent" />
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={`
          relative px-2.5 py-2 text-sm font-medium transition-colors whitespace-nowrap
          ${isActive ? 'text-[#d4a84b]' : 'text-[#C0C0C0] hover:text-white'}
        `}
        whileHover={{ y: -2 }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="navIndicator"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#996600]"
          />
        )}
      </motion.span>
    </Link>
  );
}