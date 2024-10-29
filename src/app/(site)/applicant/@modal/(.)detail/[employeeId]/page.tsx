import ErrorPage from "@/app/_components/page/ErrorPage";
import { prisma } from "@/lib/prisma";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import EmployeeCardContainer from "../../../detail/[employeeId]/_components/EmployeeCardContainer";
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

  const conversationPurpose = await prisma.conversationPurpose.findMany();
  return (
    <Modal>
      <EmployeeCardContainer
        employee={result.data}
        options={conversationPurpose}
      />
    </Modal>
  );
}
