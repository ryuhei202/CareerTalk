import DMResultCard from "@/app/_components/parts/DMRequestCard";
import { Button } from "@/app/_components/ui/button";
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
          onClickBack={handleDMClick}
        >
          <CardFooter className="flex justify-center">
            <Button
              onClick={onClickBack}
            >
              DM画面へ
            </Button>

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
