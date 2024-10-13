import { getServerSession } from "@/lib/auth";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-500 text-2xl mb-4">キャリトーク</div>
      <div className="flex flex-col items-center gap-4">
        {session?.user.id ? (
          <>
            <p>ログインに成功しました</p>
            <p>id:{session?.user.id}</p>
            <p>name:{session?.user.name}</p>
            <p>email:{session?.user.email}</p>
            <Image
              src={session?.user.image ?? ""}
              alt="プロフィール画像"
              width={100}
              height={100}
            />
          </>
        ) : (
          <>
            <p>ログインしてください</p>
          </>
        )}
      </div>
    </div>
  );
}
