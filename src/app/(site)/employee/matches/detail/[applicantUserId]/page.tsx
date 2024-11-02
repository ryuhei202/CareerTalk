import ErrorPage from "@/app/_components/page/ErrorPage";
import { getEmployeeUserId } from "@/lib/auth";
import {
  type GetLikedApplicantDetailUseCaseResult,
  getLikedApplicantDetailUseCase,
} from "@/usecase/getLikedApplicantDetail";
import { redirect } from "next/navigation";
import ApplicantCardContainer from "./_components/ApplicantCardContainer";

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
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }

  const getLikedApplicantDetailUseCaseParams: GetLikedApplicantDetailParams = {
    applicantUserId: params.applicantUserId,
    employeeUserId,
  };

  const result: GetLikedApplicantDetailUseCaseResult =
    await getLikedApplicantDetailUseCase(getLikedApplicantDetailUseCaseParams);

  console.log(result);

  if (!result.success) {
    return (
      <ErrorPage
        message={result.message}
        data={getLikedApplicantDetailUseCaseParams}
      />
    );
  }

  return (
    <ApplicantCardContainer
      applicant={result.data.applicant}
      likeReason={result.data.likeReason}
      likeMessage={result.data.likeMessage}
    />
  );
}
