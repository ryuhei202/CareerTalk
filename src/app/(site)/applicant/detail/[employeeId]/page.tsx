import ErrorPage from "@/app/_components/page/ErrorPage";
import { prisma } from "@/lib/prisma";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import type { ReactElement } from "react";
import EmployeeCardContainer from "./_components/EmployeeCardContainer";

/**
 * 詳細取得のRequest Paramsの型
 */
export type GetEmployeeDetailParams = {
  employeeId: string;
};

type Props = {
  params: {
    employeeId: string;
  };
};

export default async function EmployeeDetailPage({
  params,
}: Props): Promise<ReactElement> {
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
    <EmployeeCardContainer
      employee={result.data}
      options={conversationPurpose}
    />
  );
}
