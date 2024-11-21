import ApplicantCard from "@/app/(site)/employee/chat/detail/[applicantUserId]/_components/ApplicantCard";
import { Modal } from "@/app/_components/parts/Modal";
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
        <Modal contentClassName="h-[90%] max-w-[60%]">
          <ApplicantCard
            applicant={applicant}
            likedApplicantContent={{
              likeReason,
              likeMessage,
              action,
            }}
          />
        </Modal>
      ) : (
        <Modal contentClassName="">
          <DMResultCardSwitcher
            conversationStatus={conversationStatus}
            onClickBack={onClickBack}
          />
        </Modal>
      )}
    </>
  );
}
