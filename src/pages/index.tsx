import type { GetServerSideProps, NextPage } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage= () => {
  return (
    <>
      <Head>
        <title>Be on time</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Be <span className="text-purple-300">On</span> Time
        </h1>
        <HomeContent/>
      </main>
    </>
  );
};


const HomeContent = () => {
  const { data: session } = useSession();
  const loginWithGoogle = () => signIn("google");

  console.log(session)
  if (!session) {
    return (
      <div className="flex">
        <LoginButton onClick={loginWithGoogle}/>
      </div>
    )
  }

  return (
    <div>
      <p>
        <span className="font-semibold font-mono">
          {session.user?.name}
        </span>, you are logged in!
        <br />
        <Link href={`/${session.user?.id}/reserve/`}>{session.user?.id}</Link>
      </p>

      <button className="rounded w-full p-2 bg-red-50 hover:bg-red-100" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  )

}

const LoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickAction = () => {
    setIsLoading(true);
    onClick()
  }

  let spinner;

  if (isLoading) {
    spinner = (
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    )
  }


  return (
    <button
      onClick={onClickAction}
      className={`flex rounded bg-gray-100 p-2 hover:bg-gray-300 text-gray-600 font-medium`}
      disabled={isLoading}>
        {spinner}
      Login with Google
    </button>
  );
};

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      session,
    },
  }
}

export default Home;
