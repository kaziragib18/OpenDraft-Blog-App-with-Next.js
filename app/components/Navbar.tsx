"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-5 py-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={125} height={25} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1 rounded hover:bg-gray-200 hover:text-red-600 transition-colors duration-200"
              >
                <span>Logout</span>
              </button>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="px-3 py-1 rounded hover:bg-gray-200 hover:text-blue-600-transition-colors duration-200"
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
