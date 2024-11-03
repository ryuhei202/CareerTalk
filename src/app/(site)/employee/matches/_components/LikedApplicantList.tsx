import Pagenation from "@/app/_components/parts/Pagenation";
import type { LikedApplicant } from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import LikedApplicantListItem from "./LikedApplicantListItem";

export default function LikedApplicantList({
  applicants,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: {
  applicants: LikedApplicant[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">
        いいねをしてくれた転職者一覧（{totalCount}件）
      </h1>
      {applicants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicants.map((applicant) => (
              <LikedApplicantListItem
                key={applicant.userId}
                applicant={applicant}
              />
            ))}
          </div>
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl font-semibold text-gray-600">
            いいねはまだありません
          </p>
        </div>
      )}
    </div>
  );
}
