import ErrorPage from "@/app/_components/page/ErrorPage";
import { handleUserView } from "@/lib/auth";

import {
  type GetLikedApplicantsUseCaseParams,
  getLikedApplicantsUseCase,
} from "@/usecase/getLikedApplicants/getLikedApplicantsUseCase";
import { getParamsFromQueryStrings } from "../../applicant/search_employees/_util/getParamsFromQueryStrings";
import type { SearchParams } from "../../applicant/search_employees/page";
import LikeApplicationsContainer from "./_components/LikeApplicationsContainer";
export default async function MatchesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { user } = await handleUserView({
    isApplicantPage: false,
  });

  const { currentPage } = getParamsFromQueryStrings(searchParams);

  const getLikedApplicantsUseCaseParams: GetLikedApplicantsUseCaseParams = {
    page: currentPage,
    employeeUserId: user.id,
  };

  const result = await getLikedApplicantsUseCase(
    getLikedApplicantsUseCaseParams
  );

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }

  return (
    <LikeApplicationsContainer
      totalCount={result.data.totalCount}
      applicants={result.data.applicants}
    />
  );
}
