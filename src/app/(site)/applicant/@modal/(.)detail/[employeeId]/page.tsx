import ErrorPage from "@/app/_components/page/ErrorPage";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import EmployeeCard from "../../../detail/[employeeId]/_components/EmployeeCard";
import type { GetEmployeeDetailParams } from "../../../detail/[employeeId]/page";
import { Modal } from "./_components/Modal";

type Props = {
  params: {
    employeeId: string;
  };
};

export default async function EmployeeDetailModalPage({ params }: Props) {
  const getEmployeeDetailUseCaseParams: GetEmployeeDetailParams = {
    employeeId: params.employeeId,
  };

  const result: GetEmployeeDetailUseCaseResult = await getEmployeeDetailUseCase(
    getEmployeeDetailUseCaseParams
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
