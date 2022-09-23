import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            src={session.user.image as string}
            alt="user image"
            width={40}
            height={40}
          />
          <span>{session.user.name}</span>
        </div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('github')}>Sign in</button>
    </>
  );
}
