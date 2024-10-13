"use client";

import { signIn, signOut } from "next-auth/react";

export const AuthButton = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      {isLogin ? (
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
          onClick={() => signOut()}
        >
          ログアウト
        </button>
      ) : (
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
          onClick={() => signIn()}
        >
          ログイン
        </button>
      )}
    </>
  );
};
