import ErrorPage from "@/app/_components/page/ErrorPage";
import { getApplicantUserId } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { redirect } from "next/navigation";
import EmployeeCard from "../../../search_employees/detail/[employeeUserId]/_components/EmployeeCard";
import type { GetEmployeeDetailParams } from "../../../search_employees/detail/[employeeUserId]/page";

export default async function ApplicantChatDetailPage({
  params,
}: {
  params: { employeeUserId: string };
}) {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }
  const getEmployeeDetailUseCaseParams: GetEmployeeDetailParams = {
    employeeUserId: params.employeeUserId,
  };

  const result: GetEmployeeDetailUseCaseResult = await getEmployeeDetailUseCase(
    { employeeUserId: params.employeeUserId }
  );

  if (!result.success) {
    return (
      <ErrorPage
        message={result.message}
        data={getEmployeeDetailUseCaseParams}
      />
    );
  }
  return <EmployeeCard employee={result.data} />;
}
