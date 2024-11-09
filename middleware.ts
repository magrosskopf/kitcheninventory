import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Angepasster Pfad
  },
});

export const config = {
  matcher: ["/inventar",
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.css$|.*\\.js$).*)",
  ], // Geschützte Seiten innerhalb von `dex`

};