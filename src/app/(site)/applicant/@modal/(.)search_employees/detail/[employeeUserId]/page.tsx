import EmployeeCardContainer from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/_components/EmployeeCardContainer";
import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
import { handleUserView } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
type Props = {
  params: {
    employeeUserId: string;
  };
};

export default async function EmployeeDetailModalPage({ params }: Props) {
  await handleUserView({ isApplicantPage: true });

  const result: GetEmployeeDetailUseCaseResult = await getEmployeeDetailUseCase(
    { employeeUserId: params.employeeUserId }
  );

  if (!result.success) {
    return <ErrorPage message={result.message} data={params} />;
  }

  return (
    <EmployeeCardContainer employee={result.data} />
  );
}
