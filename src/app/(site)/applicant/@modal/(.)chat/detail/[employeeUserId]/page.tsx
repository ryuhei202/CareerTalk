import EmployeeCard from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/_components/EmployeeCard";
import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/page";
import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
import { getApplicantUserId } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { redirect } from "next/navigation";
export default async function ApplicantChatDetailEmployeePage({
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
  return (
    <Modal>
      <EmployeeCard employee={result.data} />
    </Modal>
  );
}
