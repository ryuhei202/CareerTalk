import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SorryPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  if (!session.user.isBaned) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br bg-customBlue-light to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>アカウント停止のお知らせ</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          アカウント停止のお知らせ
        </h2>
        <p className="text-gray-600 mb-6">
          申し訳ありませんが、このアカウントは現在停止されています。
        </p>
        <p className="text-sm text-gray-500">
          ご不明な点がございましたら、お問い合わせフォームよりご連絡ください。
        </p>
      </div>
    </div>
  );
}
