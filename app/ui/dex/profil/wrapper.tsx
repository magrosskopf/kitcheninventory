"use client";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';


export default function Wrapper({session}:{session: Session | null}) {
  if (session) {
    return (
      <>
       <SessionProvider session={session} >
        Angemeldet als {session.user?.email} <br />
        <button onClick={() => signOut()}>Abmelden</button>
        </SessionProvider>
      </>
    );
  }
  return (
    <>
    <SessionProvider session={session} >
    <h1 className={` mb-4 text-xl md:text-2xl`}>Profil</h1>
      Nicht angemeldet <br />
      <button onClick={() => signIn()}>Anmelden</button>
      </SessionProvider>
      </>
  );
}
