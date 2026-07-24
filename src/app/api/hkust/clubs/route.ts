import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CRAWLER_URL = process.env.CRAWLER_URL || 'http://localhost:18080';
const SEED_FILE = join(process.cwd(), 'public', 'hkust-data', 'scraped.json');

async function loadSnapshot(): Promise<{ scrapedAt?: string; totalItems: number; items: any[] }> {
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
    // fall through
  }
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
  const items = (snapshot.items ?? []).filter((i) => i.category === 'clubs');
  return NextResponse.json(
    {
      scrapedAt: snapshot.scrapedAt,
      totalItems: items.length,
      items,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
