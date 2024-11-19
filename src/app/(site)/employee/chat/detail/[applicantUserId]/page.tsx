import ErrorPage from "@/app/_components/page/ErrorPage";
import { handleUserView } from "@/lib/auth";
import {
  type GetApplicantDetailUseCaseResult,
  getApplicantDetailUseCase,
} from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import ApplicantCard from "./_components/ApplicantCard";

export default async function EmployeeChatDetailPage({
  params,
}: {
  params: { applicantUserId: string };
}) {
  await handleUserView({
    isApplicantPage: false,
  });

  const result: GetApplicantDetailUseCaseResult =
    await getApplicantDetailUseCase({
      applicantUserId: params.applicantUserId,
    });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return <ApplicantCard applicant={result.data} />;
}
