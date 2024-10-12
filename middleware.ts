import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      // If the user is not logged in (no token), deny access to all pages
      if (!token) return false;

      // Check if the route is for the admin page
      if (req.nextUrl.pathname !== "/auth/sign_in") {
        // Here, you could add logic to check if the user has admin privileges
        // For example: return token.role === 'admin';
        return true; // Assuming the token check is passed, allow access to admin routes
      }
      if (req.nextUrl.pathname == "/auth/sign_in") {
        return true;
      }

      // Allow access to non-admin routes for authenticated users
      return true;
    },
  },
});

export const config = {
  matcher: ["/"], // protect specific routes
};
