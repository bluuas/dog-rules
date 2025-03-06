import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('lang');

  if (['de', 'en', 'es', 'it', 'fr'].includes(language)) {
    const response = NextResponse.next();
    response.headers.set('x-language', language);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
