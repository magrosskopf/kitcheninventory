import { authOptions } from '@/app/lib/auth/authOptions';
import Wrapper from '@/app/ui/dex/profil/wrapper';
import { getServerSession } from 'next-auth';
export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <main>
        <Wrapper session={session} />
    </main>
  );
}
