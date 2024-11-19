"use client";

import ApplicantCardContainer from "@/app/(site)/employee/matches/detail/[applicantUserId]/_components/ApplicantCardContainer";
import { Modal } from "@/app/_components/parts/Modal";
import type { ApplicantDetail } from "@/usecase/getLikedApplicantDetail/getLikedApplicantDetailUseCase";
import { usePathname } from "next/navigation";

// マッチングが成立し、「DM画面へ」ボタンを押してDMに遷移する際にモーダルが表示されないようにするための制御コンポーネント
// @see https://qiita.com/P-man_Brown/items/6db87962f102baec68e7
export default function ApplicantDetailModal({
  applicant,
  likeReason,
  likeMessage,
}: {
  applicant: ApplicantDetail;
  likeReason: string;
  likeMessage?: string;
}) {
  const pathname = usePathname();
  const shouldShowModal = pathname.includes("/detail/");
  return (
    shouldShowModal && (
      <Modal contentClassName="h-[90%] max-w-[60%]">
        <ApplicantCardContainer
          applicant={applicant}
          likeReason={likeReason}
          likeMessage={likeMessage}
        />
      </Modal>
    )
  );
}
