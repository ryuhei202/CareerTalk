"use client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CareerTalkLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <MessageCircle className="h-8 w-8 text-purple-600" />
      <span className="text-2xl font-bold text-gray-800">CareerTalk</span>
    </Link>
  );
}
