import ApplicantCard from "@/app/(site)/employee/chat/detail/[applicantUserId]/_components/ApplicantCard";
import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
import { getEmployeeUserId } from "@/lib/auth";
import { getApplicantDetailUseCase } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { redirect } from "next/navigation";

export default async function EmployeeChatDetailPage({
  params,
}: {
  params: { applicantUserId: string };
}) {
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }

  const result = await getApplicantDetailUseCase({
    applicantUserId: params.applicantUserId,
  });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return (
    <Modal>
      <ApplicantCard applicant={result.data} />
    </Modal>
  );
}
