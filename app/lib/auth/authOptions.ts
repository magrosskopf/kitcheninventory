import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { authorize } from './authorize.service';

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        authorize: authorize
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