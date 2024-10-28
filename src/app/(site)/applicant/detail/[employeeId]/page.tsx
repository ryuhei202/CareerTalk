import ErrorPage from "@/app/_components/page/ErrorPage";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import type { ReactElement } from "react";
import EmployeeCard from "./_components/EmployeeCard";

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

  return <EmployeeCard employee={result.data} />;
}
