import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/favicon.ico"
              alt="キャリトーク"
              width={40}
              height={40}
            />
            <h1 className="text-gray-800 text-2xl">キャリトーク</h1>
          </div>
          <button className="bg-gray-300 text-black px-4 py-2 rounded-md">
            ログイン
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
