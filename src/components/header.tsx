 
import options, { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';



export default async function Header() {
  /* const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  }); */
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <Link href="/api/auth/signout?callbackUrl=/">Log out</Link>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Link href="/api/auth/signin">Log in</Link>
    </>
  );
}
