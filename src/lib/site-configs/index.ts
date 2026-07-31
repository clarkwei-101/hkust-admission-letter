/**
 * Bundled alternate site identities — these are presets you can flip between
 * at runtime via the `/preview` page or `localStorage.setItem('site-preset-key', ...)`.
 *
 * Add new presets:
 *   1. Create `your-key.ts` exporting a default `SiteConfig`
 *   2. Add it to `PRESETS` below
 *   3. Add the key to `PRESET_KEYS` in `site.config.ts`
 *
 * Then anyone can fork the repo, edit these files, and rebuild — no component
 * edits required.
 */

import { DEFAULT_SITE_CONFIG, hkust, PRESET_KEYS, type PresetKey, type SiteConfig } from '../site.config';
import cuhk from './cuhk';
import hku from './hku';
import pku from './pku';
import personal from './personal';

export type { SiteConfig, PresetKey };

export const PRESETS: Record<PresetKey, SiteConfig> = {
  hkust,
  cuhk,
  hku,
  pku,
  personal,
};

export const DEFAULT_PRESET_KEY: PresetKey = 'hkust';

export function isPresetKey(k: string | null | undefined): k is PresetKey {
  return !!k && (PRESET_KEYS as readonly string[]).includes(k);
}

/** Returns the SiteConfig for a key — falls back to default if missing. */
export function getPreset(key: string | null | undefined): SiteConfig {
  if (!key) return DEFAULT_SITE_CONFIG;
  return PRESETS[key as PresetKey] ?? DEFAULT_SITE_CONFIG;
}

export { DEFAULT_SITE_CONFIG };
