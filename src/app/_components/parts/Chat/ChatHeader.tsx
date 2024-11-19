import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ChatHeaderProps = {
  partnerUserId: string;
  partnerName: string;
  partnerImageUrl: string;
  isApplicant: boolean;
};

export function ChatHeader({
  partnerUserId,
  partnerName,
  partnerImageUrl,
  isApplicant,
}: ChatHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 p-4 border-b bg-white">
      <Link
        href={`/${isApplicant ? "applicant" : "employee"}/chat`}
        className="hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() =>
          router.push(
            `/${
              isApplicant ? "applicant" : "employee"
            }/chat/detail/${partnerUserId}`
          )
        }
      >
        <div className="relative w-10 h-10">
          <Image
            src={partnerImageUrl}
            alt={`${partnerName}のプロフィール画像`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="font-medium">{partnerName}</h2>
      </button>
    </div>
  );
}
