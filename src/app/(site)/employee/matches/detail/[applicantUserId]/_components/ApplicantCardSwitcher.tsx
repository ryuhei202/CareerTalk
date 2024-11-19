import ApplicantCard from "@/app/(site)/employee/chat/detail/[applicantUserId]/_components/ApplicantCard";
import { ConversationStatusEnum } from "@/domain/core/Conversation/ConversationEnum";
import type { ApplicantDetail } from "@/usecase/getLikedApplicantDetail/getLikedApplicantDetailUseCase";
import DMResultCardSwitcher from "./DMHandledCard";

export default function ApplicantCardSwitcher({
  applicant,
  likeReason,
  likeMessage,
  conversationStatus,
  action,
  onClickBack,
}: {
  applicant: ApplicantDetail;
  likeReason: string;
  likeMessage?: string;
  conversationStatus: ConversationStatusEnum;
  action: (payload: FormData) => void;
  onClickBack: () => void;
}) {
  return (
    <>
      {conversationStatus === ConversationStatusEnum.PENDING ? (
        <ApplicantCard
          applicant={applicant}
          likedApplicantContent={{
            likeReason,
            likeMessage,
            action,
          }}
        />
      ) : (
        <DMResultCardSwitcher
          conversationStatus={conversationStatus}
          onClickBack={onClickBack}
        />
      )}
    </>
  );
}
