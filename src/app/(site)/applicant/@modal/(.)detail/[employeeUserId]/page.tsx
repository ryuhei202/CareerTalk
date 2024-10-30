import ErrorPage from "@/app/_components/page/ErrorPage";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  type GetEmployeeDetailUseCaseResult,
  getEmployeeDetailUseCase,
} from "@/usecase/getEmployeeDetail";
import { redirect } from "next/navigation";
import EmployeeCardContainer from "../../../detail/[employeeUserId]/_components/EmployeeCardContainer";
import { Modal } from "./_components/Modal";

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

  const conversationPurpose = await prisma.conversationPurpose.findMany();
  return (
    <Modal>
      <EmployeeCardContainer
        employee={result.data}
        options={conversationPurpose}
        applicantUserId={session.user.id}
      />
    </Modal>
  );
}
