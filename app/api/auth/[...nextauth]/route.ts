import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import connectToDatabase from '@/app/lib/database/mongoose';
import User from '@/app/lib/definitions/user.definitioins'
import * as password from '@/app/lib/util/password';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => {
        if (!credentials) return null
        await connectToDatabase();
        console.log("hash", await password.hash(credentials.password))
        const user = await User.findOne({ email: credentials?.username });
        if (!user || !user.password) return null;
        if (await password.compare(credentials.password, user.password)) return { id: user._id, name: user.name, email: user.email };
        //if (credentials.password === user.password) return {id: user._id, name: user.name, email: user.email}
        return null
          
        
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',  
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id }; 
      }
      return token;
    },
    session: ({ session, token, user }) => {
      console.log("stu", session, token, user);
      
      return {
        ...session,
        user: {
          ...session.user,
          // id: user.id, // This is copied from official docs which find user is undefined
          id: token.id, // Get id from token instead
        },
      };
    },
    
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
