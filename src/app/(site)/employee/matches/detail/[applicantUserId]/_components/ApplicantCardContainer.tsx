"use client";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import { useRouter } from "next/navigation";
import ApplicantCard from "./ApplicantCard";

export default function ApplicantCardContainer({
  applicant,
  likeReason,
  likeMessage,
}: {
  applicant: LikedApplicant;
  likeReason: string;
  likeMessage?: string;
}) {
  const router = useRouter();
  return (
    <ApplicantCard
      applicant={applicant}
      likeReason={likeReason}
      likeMessage={likeMessage}
      onClickBack={() => router.back()}
    />
  );
}
