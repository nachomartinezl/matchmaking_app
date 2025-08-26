// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// The only paths that should be accessible
const allowedPaths = ['/', '/signup', '/verify']

// Extensions we never gatekeep (public assets + Next internals)
const STATIC_EXT = /\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|map|txt|woff2?|ttf|otf)$/i

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Debug
  console.log(`[Middleware] Intercepting path: ${pathname}`)

  // 0) Always skip Next internals + common public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.webmanifest' ||
    STATIC_EXT.test(pathname)
  ) {
    return NextResponse.next()
  }

  // 1) Allow only specific pages (permit /verify/*)
  const isAllowed = allowedPaths.some((p) =>
    p === '/' ? pathname === '/' : pathname.startsWith(p)
  )

  if (isAllowed) {
    return NextResponse.next()
  }

  // 2) Otherwise, bounce to root
  const url = new URL('/', request.url)
  return NextResponse.redirect(url)
}

// Run on all routes except obvious internals; keep it simple
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
