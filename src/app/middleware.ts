import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const language = pathname.split('/')[1];

  if (['de', 'en', 'es', 'it', 'fr'].includes(language)) {
    const response = NextResponse.next();
    response.cookies.set('language', language);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
