import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CRAWLER_URL = process.env.CRAWLER_URL || 'http://localhost:18080';
const SEED_FILE = join(process.cwd(), 'public', 'hkust-data', 'scraped.json');

export async function GET() {
  // Try live crawler first
  try {
    const res = await fetch(`${CRAWLER_URL}/api/hkust/last-updated`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }
  } catch {
    // fall through
  }

  // Fall back to seed file metadata
  try {
    const text = await readFile(SEED_FILE, 'utf-8');
    const data = JSON.parse(text);
    return NextResponse.json(
      {
        scrapedAt: data.scrapedAt,
        totalItems: data.totalItems ?? (data.items?.length ?? 0),
        byCategory: data.byCategory
          ? Object.fromEntries(Object.entries(data.byCategory).map(([k, v]) => [k, (v as any[]).length]))
          : {},
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch {
    return NextResponse.json({ scrapedAt: null, totalItems: 0, byCategory: {} });
  }
}
