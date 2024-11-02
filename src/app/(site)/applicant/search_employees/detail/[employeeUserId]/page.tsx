import ErrorPage from "@/app/_components/page/ErrorPage";
import { getApplicantUserId } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import { redirect } from "next/navigation";
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

export default async function EmployeeDetailPage({ params }: Props) {
  const applicantUserId = await getApplicantUserId();
  if (!applicantUserId) {
    redirect("/applicant/create_profile");
  }

  console.log("普通のなう");

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

  return <EmployeeCardContainer employee={result.data} />;
}
