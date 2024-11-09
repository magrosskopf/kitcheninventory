import NextAuth, { RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import connectToDatabase from '@/app/lib/database/mongoose';
import User from '@/app/lib/definitions/user.definitioins'
import * as password from '@/app/lib/util/password';
import { authOptions } from '@/app/lib/auth/authOptions';



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
