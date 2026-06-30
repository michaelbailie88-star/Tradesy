import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based access control
    if ((path.startsWith("/post-job") || path.startsWith("/my-jobs")) && token?.role !== "HOMEOWNER") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if ((path.startsWith("/dashboard") || path.startsWith("/my-bids")) && token?.role !== "CONTRACTOR") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/post-job/:path*", "/dashboard/:path*", "/profile/:path*", "/my-jobs/:path*", "/my-bids/:path*"],
};
