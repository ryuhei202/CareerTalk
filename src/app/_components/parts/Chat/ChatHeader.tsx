import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";

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
    <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
      <Link
        href={`/${isApplicant ? "applicant" : "employee"}/chat`}
        className="hover:text-gray-600 transition-colors"
      >
        <Button variant="outline" className="border-none shadow-none">
          <ArrowLeft className="h-10 w-10" />戻る
        </Button>
      </Link>
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() =>
          router.push(
            `/${isApplicant ? "applicant" : "employee"
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
        <h2 className="font-bold text-xl">{partnerName}</h2>
      </button>
    </div>
  );
}
