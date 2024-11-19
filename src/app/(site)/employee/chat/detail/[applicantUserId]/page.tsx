import ErrorPage from "@/app/_components/page/ErrorPage";
import { getEmployeeUserId } from "@/lib/auth";
import {
  type GetApplicantDetailUseCaseResult,
  getApplicantDetailUseCase,
} from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { redirect } from "next/navigation";
import ApplicantCard from "./_components/ApplicantCard";

export default async function EmployeeChatDetailPage({
  params,
}: {
  params: { applicantUserId: string };
}) {
  const employeeUserId = await getEmployeeUserId();
  if (!employeeUserId) {
    redirect("/employee/create_profile");
  }

  const result: GetApplicantDetailUseCaseResult =
    await getApplicantDetailUseCase({
      applicantUserId: params.applicantUserId,
    });

  if (!result.success) {
    return <ErrorPage message={result.message} data={result.data} />;
  }
  return <ApplicantCard applicant={result.data} />;
}
