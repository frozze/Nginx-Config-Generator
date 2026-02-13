import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("better-auth.session_token") || request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionToken) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/configs/:path*"],
};
