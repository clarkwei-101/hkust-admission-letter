/**
 * DEPRECATED — this file is a thin re-export of `site.config.ts`. New code should
 * import directly from `@/lib/site-configs` (useSiteConfig hook for client-side,
 * DEFAULT_SITE_CONFIG for server-side).
 *
 * Kept so existing components don't break during refactor. Will be removed.
 */

import { DEFAULT_SITE_CONFIG } from './site.config';

export const HKUST_COLORS = DEFAULT_SITE_CONFIG.theme;
export const AI_CLUB_INFO = DEFAULT_SITE_CONFIG.aiClub;
export const NAV_ITEMS = DEFAULT_SITE_CONFIG.navItems;
export const WELCOME_DATA = DEFAULT_SITE_CONFIG.welcome;
export const ACADEMICS_DATA = DEFAULT_SITE_CONFIG.academics;
export const HISTORY_DATA = DEFAULT_SITE_CONFIG.history;
export const CAMPUS_DATA = DEFAULT_SITE_CONFIG.campus;
export const CLUBS_DATA = DEFAULT_SITE_CONFIG.clubs;
export const GUIDE_DATA = DEFAULT_SITE_CONFIG.guide;
export const APPS_DATA = DEFAULT_SITE_CONFIG.apps;
