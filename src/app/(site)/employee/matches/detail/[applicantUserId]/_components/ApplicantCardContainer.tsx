"use client";

import ErrorPage from "@/app/_components/page/ErrorPage";
import type { ApplicantDetail } from "@/usecase/getLikedApplicantDetail/getLikedApplicantDetailUseCase";
import type { HandleDMRequestUseCaseResponse } from "@/usecase/handleDMRequest/handleDMRequestUseCase";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { handleDMRequestAction } from "../_actions/handleDMRequestAction";
import ApplicantCard from "./ApplicantCard";

export type FormState = {
  success: boolean | undefined;
  message: string;
  data: HandleDMRequestUseCaseResponse | undefined;
};

export default function ApplicantCardContainer({
  applicant,
  likeReason,
  likeMessage,
}: {
  applicant: ApplicantDetail;
  likeReason: string;
  likeMessage?: string;
}) {
  const router = useRouter();
  const [state, formAction] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      const isApprove = formData.get("isApprove") === "true";
      return handleDMRequestAction(prevState, applicant.userId, isApprove);
    },
    {
      success: undefined,
      message: "",
      data: {
        conversationStatus: applicant.conversationStatus,
      },
    }
  );

  if (state.success === false || !state.data) {
    return <ErrorPage message={state.message} data={state.data} />;
  }
  return (
    <ApplicantCard
      applicant={applicant}
      likeReason={likeReason}
      likeMessage={likeMessage}
      conversationStatus={state.data.conversationStatus}
      action={formAction}
      onClickBack={() => router.back()}
    />
  );
}
