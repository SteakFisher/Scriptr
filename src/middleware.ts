import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// supabase gen types typescript --project-id sanxrkhvjsvnkvrresut > database.types.ts

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  let {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !(req.nextUrl.pathname == "/")) {
    res = NextResponse.redirect(new URL("/", req.url));
  } else if (session && req.nextUrl.pathname == "/") {
    res = NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
