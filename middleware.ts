import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
  ],
};
