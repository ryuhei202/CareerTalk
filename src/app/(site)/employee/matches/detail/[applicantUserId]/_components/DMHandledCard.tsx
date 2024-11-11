import DMResultCard from "@/app/_components/parts/DMRequestCard";
import { CardFooter } from "@/app/_components/ui/card";
import likeIcon from "@/assets/images/like_icon.svg";
import rejectIcon from "@/assets/images/reject_icon.svg";
import { ConversationStatusEnum } from "@/domain/core/Conversation/ConversationEnum";
import { useRouter } from "next/navigation";

export default function DMResultCardSwitcher({
  conversationStatus,
  onClickBack,
}: {
  conversationStatus: ConversationStatusEnum;
  onClickBack: () => void;
}) {
  const router = useRouter();

  const handleDMClick = () => {
    router.push("/employee/chat");
  };

  return (
    <>
      {conversationStatus === ConversationStatusEnum.APPROVED ? (
        <DMResultCard
          imageSrc={likeIcon}
          title="いいねを承認しました！"
          onClickBack={onClickBack}
        >
          <CardFooter className="flex justify-center">
            <button
              type="button"
              onClick={handleDMClick}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              DM画面へ
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>DM画面へ</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </CardFooter>
        </DMResultCard>
      ) : (
        <DMResultCard
          imageSrc={rejectIcon}
          title="いいねを拒否しました。"
          onClickBack={onClickBack}
        />
      )}
    </>
  );
}
