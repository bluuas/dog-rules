import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from './config/languages';

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('lang');

  if (language && isSupportedLanguage(language)) {
    const response = NextResponse.next();
    response.headers.set('x-language', language);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
