"use client";
import { useSearchParamsUpdate } from "@/app/(site)/applicant/search_employees/_util/useSearchParamsUpdate";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import LikedApplicantList from "./LikedApplicantList";

export default function LikeApplicationsContainer({
  totalCount,
  applicants,
}: {
  totalCount: number;
  applicants: LikedApplicant[];
}) {
  const { handleChangePage, currentPage } = useSearchParamsUpdate();
  const totalPages = Math.ceil(totalCount / 10);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <LikedApplicantList
        applicants={applicants}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
