import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ChatHeaderProps = {
  partnerName: string;
  partnerImageUrl: string;
  isApplicant: boolean;
};

export function ChatHeader({
  partnerName,
  partnerImageUrl,
  isApplicant,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b bg-white">
      <Link
        href={`/${isApplicant ? "applicant" : "employee"}/chat`}
        className="hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <div className="relative w-10 h-10">
        <Image
          src={partnerImageUrl}
          alt={`${partnerName}のプロフィール画像`}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h2 className="font-medium">{partnerName}</h2>
    </div>
  );
}
