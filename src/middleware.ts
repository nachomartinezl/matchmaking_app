// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The only paths that should be accessible
const allowedPaths = ['/', '/signup', '/verify'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- DEBUGGING: Check your terminal to see this message on every page request ---
  console.log(`[Middleware] Intercepting path: ${pathname}`);

  // Check if the requested path is one of the allowed ones.
  // We use `startsWith` for '/verify' to allow for dynamic routes like /verify/token
  const isAllowed = allowedPaths.some(path => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  });

  // If the path is allowed, let the user proceed.
  if (isAllowed) {
    return NextResponse.next();
  }

  // If the path is NOT allowed, redirect to the root URL.
  const absoluteURL = new URL('/', request.url);
  return NextResponse.redirect(absoluteURL);
}

// This config ensures the middleware runs on all page routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};