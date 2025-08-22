import { loginUser } from "@/app/lib/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    // Credentials login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) return null; // invalid credentials
        return user; // return user object
      },
    }),

    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt", // use JWT for session
  },

  callbacks: {
  async jwt({ token, user }) {
    if (user) token.user = user;
    return token;
  },
  async session({ session, token }) {
    if (token.user) session.user = token.user;
    return session;
  },
async redirect({ url, baseUrl }) {
  // If NextAuth provides a relative URL (internal), go there
  if (url.startsWith("/")) return url;

  // If it’s a full URL from our site, go there
  if (url.startsWith(baseUrl)) return url;

  // Otherwise fallback to home
  return baseUrl;
}
},

  pages: {
    signIn: "/login", // custom login page
  },

  debug: true, // optional, shows NextAuth logs in console
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
