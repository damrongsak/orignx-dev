import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Corrected and defined public/auth routes
const authRoutes = ["/auth/signin", "/auth/signup", "/auth/forgot-password"];
const publicRoutes = ["/", "/about", "/contact", "/blog"];

// Role-based route access
const roleProtectedRoutes: Record<string, string[]> = {
    "/dashboard/admin": ["ADMIN"],
    "/dashboard": ["USER", "EDITOR", "ADMIN"],
    "/blog/edit": ["EDITOR", "ADMIN"],
    "/blog/admin": ["ADMIN"],
    "/profile": ["USER", "EDITOR", "ADMIN"],
    "/settings": ["USER", "EDITOR", "ADMIN"],};

export default async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoggedIn = !!token;
    const userRole: string = typeof token?.role === "string" ? token.role : "GUEST";
    const currentPath = request.nextUrl.pathname;

    console.log("Middleware", { isLoggedIn, role: userRole, currentPath });

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && authRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow access to public routes and /blog/* (except edit/admin)
    if (
        publicRoutes.includes(currentPath) ||
        currentPath.startsWith("/blog/")
    ) {
        const needsRoleCheck = Object.keys(roleProtectedRoutes).some((prefix) =>
            currentPath.startsWith(prefix)
        );

        if (needsRoleCheck) {
            const allowedRoles =
                roleProtectedRoutes[
                Object.keys(roleProtectedRoutes).find((prefix) =>
                    currentPath.startsWith(prefix)
                )!
                ];

            // if (!isLoggedIn) {
            //     return NextResponse.redirect(
            //         new URL(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`, request.url)
            //     );
            // }

            if (!allowedRoles.includes(userRole)) {
                return NextResponse.redirect(new URL("/unauthorized", request.url));
            }
        }

        return NextResponse.next();
    }

    // Fallback: protect remaining routes (e.g., /dashboard)
    for (const [routePrefix, allowedRoles] of Object.entries(roleProtectedRoutes)) {
        if (currentPath.startsWith(routePrefix)) {
            if (!isLoggedIn) {
                return NextResponse.redirect(
                    new URL(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`, request.url)
                );
            }

            if (!allowedRoles.includes(userRole)) {
                return NextResponse.redirect(new URL("/unauthorized", request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
