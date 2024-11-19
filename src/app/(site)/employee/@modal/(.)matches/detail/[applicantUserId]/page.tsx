import ErrorPage from "@/app/_components/page/ErrorPage";
import { handleUserView } from "@/lib/auth";
import {
  type GetLikedApplicantDetailUseCaseResult,
  getLikedApplicantDetailUseCase,
} from "@/usecase/getLikedApplicantDetail/getLikedApplicantDetailUseCase";
import ApplicantDetailModal from "./_components/ApplicantDetailModal";

export type GetLikedApplicantDetailParams = {
  applicantUserId: string;
  employeeUserId: string;
};

type Props = {
  params: {
    applicantUserId: string;
  };
};

export default async function ApplicantDetailPage({ params }: Props) {
  const { user } = await handleUserView({
    isApplicantPage: false,
  });

  const getLikedApplicantDetailUseCaseParams: GetLikedApplicantDetailParams = {
    applicantUserId: params.applicantUserId,
    employeeUserId: user.id,
  };

  const result: GetLikedApplicantDetailUseCaseResult =
    await getLikedApplicantDetailUseCase(getLikedApplicantDetailUseCaseParams);

  if (!result.success) {
    return (
      <ErrorPage
        message={result.message}
        data={getLikedApplicantDetailUseCaseParams}
      />
    );
  }

  return (
    <ApplicantDetailModal
      applicant={result.data.applicant}
      likeReason={result.data.likeReason}
      likeMessage={result.data.likeMessage}
    />
  );
}
