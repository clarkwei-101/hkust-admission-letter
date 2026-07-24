import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// API route that proxies to either:
//  1) A live crawler server (CRAWLER_URL env var or default http://localhost:18080)
//  2) The static seed file at /public/hkust-data/scraped.json (Next.js public)
//  3) Empty array if neither exists

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CRAWLER_URL = process.env.CRAWLER_URL || 'http://localhost:18080';
const SEED_FILE = join(process.cwd(), 'public', 'hkust-data', 'scraped.json');

interface ScraperItem {
  title: string;
  summary?: string;
  url: string;
  date?: string;
  dateDetected?: string;
  category?: string;
  source?: string;
  school?: { name: string; nameZh: string; code: string } | null;
  scrapedAt?: string;
}

async function loadSnapshot(): Promise<{ scrapedAt?: string; totalItems: number; items: ScraperItem[] }> {
  // Try live crawler first
  try {
    const res = await fetch(`${CRAWLER_URL}/api/hkust/all`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        scrapedAt: data.scrapedAt,
        totalItems: data.totalItems ?? (data.items?.length ?? 0),
        items: data.items ?? [],
      };
    }
  } catch {
    // Crawler not running; fall through to seed
  }

  // Fall back to seed file
  try {
    const text = await readFile(SEED_FILE, 'utf-8');
    const data = JSON.parse(text);
    return {
      scrapedAt: data.scrapedAt,
      totalItems: data.totalItems ?? (data.items?.length ?? 0),
      items: data.items ?? [],
    };
  } catch {
    return { totalItems: 0, items: [] };
  }
}

export async function GET() {
  const snapshot = await loadSnapshot();
  const items = (snapshot.items ?? []).filter((i) => i.category === 'news');
  return NextResponse.json(
    {
      scrapedAt: snapshot.scrapedAt,
      totalItems: items.length,
      items,
    },
    {
      headers: {
        // 5-minute edge cache so the page is fast and stable
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
