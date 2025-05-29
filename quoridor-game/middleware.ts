import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isDev = process.env.NODE_ENV === 'development';
    const isHttps = request.nextUrl.protocol === 'https:' || 
        request.headers.get('x-forwarded-proto') == 'https';

    if (!isDev && !isHttps) {
        const url = request.nextUrl.clone();
        url.protocol = 'https';
        url.port = '443';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
