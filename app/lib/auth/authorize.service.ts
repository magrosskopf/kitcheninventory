import connectToDatabase from '@/app/lib/database/mongoose';
import User from '@/app/lib/definitions/user.definitioins'
import * as password from '@/app/lib/util/password';
import { RequestInternal } from 'next-auth';
export async function authorize(credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
    if (!credentials) return null
    await connectToDatabase();
    //console.log("hash", await password.hash(credentials.password))
    const user = await User.findOne({ email: credentials?.username });
    if (!user || !user.password) return null;
    if (await password.compare(credentials.password, user.password)) return { id: user._id, name: user.name, email: user.email };
    //if (credentials.password === user.password) return {id: user._id, name: user.name, email: user.email}
    return null
}