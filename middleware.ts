import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const authRoutes = ["/auth/singin", "/auth/signup", "/auth/forgot-password"];
const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/dashboard/admin"];

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isLoggedIn = !!token;
    const isAdmin = token?.role === "ADMIN";
    const currentPath = request.nextUrl.pathname;

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && authRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Protect dashboard routes
    if (protectedRoutes.some(route => currentPath.startsWith(route))) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/auth/singin", request.url));
        }

        // Redirect non-admins from admin routes
        if (adminRoutes.some(route => currentPath.startsWith(route))) {
            if (!isAdmin) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};