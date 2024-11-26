import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
import { handleUserView } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import EmployeeCard from "../../../search_employees/detail/[employeeUserId]/_components/EmployeeCard";
import type { GetEmployeeDetailParams } from "../../../search_employees/detail/[employeeUserId]/page";

export default async function ApplicantChatDetailPage({
  params,
}: {
  params: { employeeUserId: string };
}) {
  await handleUserView({ isApplicantPage: true });
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
    <Modal contentClassName="h-[90%] max-w-[60%]">
      <EmployeeCard employee={result.data} />
    </Modal>
  );
}
