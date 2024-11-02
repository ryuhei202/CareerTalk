import EmployeeCardContainer from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/_components/EmployeeCardContainer";
import ErrorPage from "@/app/_components/page/ErrorPage";
import { Modal } from "@/app/_components/parts/Modal";
import { getServerSession } from "@/lib/auth";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { redirect } from "next/navigation";
type Props = {
  params: {
    employeeUserId: string;
  };
};

export default async function EmployeeDetailModalPage({ params }: Props) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const result: GetEmployeeDetailUseCaseResult = await getEmployeeDetailUseCase(
    { employeeUserId: params.employeeUserId }
  );

  if (!result.success) {
    return <ErrorPage message={result.message} data={params} />;
  }

  return (
    <Modal>
      <EmployeeCardContainer employee={result.data} />
    </Modal>
  );
}
