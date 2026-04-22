import { NextResponse } from 'next/server';
import { getSEOMetadata } from '@/lib/seo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';

  try {
    const seoData = await getSEOMetadata(path);
    
    return NextResponse.json(seoData, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Enable CORS for the frontend
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SEO metadata' }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
