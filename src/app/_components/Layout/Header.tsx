import { AuthButton } from "../AuthButton/AuthButton";
import Image from "next/image";

export default async function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <header className="bg-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/favicon.ico" alt="キャリトーク" width={40} height={40} />
          <h1 className="text-gray-800 text-2xl">キャリトーク</h1>
        </div>
        <AuthButton isLogin={isLogin} />
      </div>
    </header>
  );
}
