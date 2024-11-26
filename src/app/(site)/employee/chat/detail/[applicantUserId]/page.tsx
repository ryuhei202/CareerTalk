import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
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
  return (
    <Modal contentClassName="h-[90%] max-w-[60%]">
      <ApplicantCard applicant={result.data} />
    </Modal>
  );
}
