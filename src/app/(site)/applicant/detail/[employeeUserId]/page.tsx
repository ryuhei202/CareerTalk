import ErrorPage from "@/app/_components/page/ErrorPage";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import { redirect } from "next/navigation";
import type { ReactElement } from "react";
import EmployeeCardContainer from "./_components/EmployeeCardContainer";

/**
 * 詳細取得のRequest Paramsの型
 */
export type GetEmployeeDetailParams = {
  employeeUserId: string;
};

type Props = {
  params: {
    employeeUserId: string;
  };
};

export default async function EmployeeDetailPage({
  params,
}: Props): Promise<ReactElement> {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
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

  const conversationPurpose = await prisma.conversationPurpose.findMany();

  return (
    <EmployeeCardContainer
      employee={result.data}
      options={conversationPurpose}
    />
  );
}
