import Link from "next/link";
import { LoginButton } from "../Button/LoginButton";
import { MessageCircle } from "lucide-react";

export default async function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <MessageCircle className="h-8 w-8 text-purple-600" />
        <span className="text-2xl font-bold text-gray-800">CareerTalk</span>
      </Link>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              ホーム
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              サービス
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              料金
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              お問い合わせ
            </a>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
