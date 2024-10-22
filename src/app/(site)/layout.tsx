import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { MessageCircle, Users, MessageSquare, Calendar } from "lucide-react";
import { LogOutButton } from "../_components/parts/Button/LogOutButton";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-800">
                CareerTalk
              </span>
            </Link>
            <ul className="hidden md:flex space-x-6 items-center">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-purple-600 flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-1" />
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/employees"
                  className="text-gray-600 hover:text-purple-600 flex items-center"
                >
                  <Users className="h-5 w-5 mr-1" />
                  現場社員一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/messages"
                  className="text-gray-600 hover:text-purple-600 flex items-center"
                >
                  <MessageSquare className="h-5 w-5 mr-1" />
                  DM
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-purple-600 flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-1" />
                  イベント
                </Link>
              </li>
              <li>
                <LogOutButton />
              </li>
            </ul>
            <Button className="md:hidden" variant="ghost">
              メニュー
            </Button>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
