import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Authentication routes - redirect away if logged in
const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];

// Public routes - no authentication required
const publicRoutes = ['/', '/about', '/contact', '/blog'];

// Role-based route access - authentication required
const roleProtectedRoutes: Record<string, string[]> = {
  '/dashboard/admin': ['ADMIN'],
  '/dashboard': ['USER', 'EDITOR', 'ADMIN'],
  '/blog/edit': ['EDITOR', 'ADMIN'],
  '/blog/admin': ['ADMIN'],
  '/profile': ['USER', 'EDITOR', 'ADMIN'],
  '/settings': ['USER', 'EDITOR', 'ADMIN'],
};

// Valid user roles
const validRoles = ['USER', 'EDITOR', 'ADMIN', 'GUEST'];

// Helper function to find matching protected route
function findProtectedRoute(path: string): string | null {
  return Object.keys(roleProtectedRoutes).find(route => path.startsWith(route)) || null;
}

// Helper function to validate user role
function isValidRole(role: string): boolean {
  return validRoles.includes(role);
}

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const userRole: string = typeof token?.role === 'string' ? token.role : 'GUEST';
  const currentPath = request.nextUrl.pathname;

  // Validate user role
  if (!isValidRole(userRole)) {
    console.warn('Invalid user role detected:', userRole);
    //return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  console.log('Middleware', { isLoggedIn, role: userRole, currentPath });

  // 1. Redirect logged-in users away from auth pages
  if (isLoggedIn && authRoutes.includes(currentPath)) {
    //return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Check if route requires role-based protection
  const protectedRoute = findProtectedRoute(currentPath);
  if (protectedRoute) {
    const allowedRoles = roleProtectedRoutes[protectedRoute];

    // Require authentication for protected routes
    if (!isLoggedIn) {
      // return NextResponse.redirect(
      //   new URL(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`, request.url)
      // );
    }

    // Check role authorization
    if (!allowedRoles.includes(userRole)) {
      //return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    //return NextResponse.next();
  }

  // 3. Allow access to public routes
  if (publicRoutes.includes(currentPath) || currentPath.startsWith('/blog/')) {
    //return NextResponse.next();
  }

  // 4. Default: require authentication for unlisted routes
  if (!isLoggedIn) {
    // return NextResponse.redirect(
    //   new URL(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`, request.url)
    // );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
