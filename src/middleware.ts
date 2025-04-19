// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated, hasRole } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin panel
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Special case for login page
    if (request.nextUrl.pathname === '/admin/login') {
      // If already authenticated, redirect to admin dashboard
      if (await isAuthenticated(request)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // Otherwise, allow access to login page
      return NextResponse.next();
    }
    
    // Check if user is authenticated
    if (!(await isAuthenticated(request))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Check if user has admin role
    if (!(await hasRole(request, ['admin']))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/admin/:path*'],
};