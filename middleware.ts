import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(async function middleware(req: NextRequest) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const publicRoutes = ["/api/register"];
      if (
        publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
      ) {
        return true;
      }
      if (!token) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/((?!auth/sign_in|_next/static|_next/image|favicon.ico|images/.*).*)",
    "/api/register", // Exclude sign-in, static files, and public images
  ],
};
