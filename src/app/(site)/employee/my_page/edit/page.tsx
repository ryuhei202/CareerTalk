import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getEmployeeDetailUseCase } from "@/usecase/getEmployeeDetail/getEmployeeDetailUseCase";
import { redirect } from "next/navigation";
import { EditMyPageFormContent } from "./_components/EditMyPageFormContent";

export default async function MyPageEdit() {

  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const employee = await getEmployeeDetailUseCase({ employeeUserId: session.user.id })

  if (!employee.success) {
    redirect("/signin")
  }

  const [occupations, workLocations] = await Promise.all([
    prisma.occupation.findMany(),
    prisma.workLocation.findMany(),
  ]);

  return (
    <>
      <EditMyPageFormContent
        employee={employee.data}
        session={session}
        occupations={occupations}
        workLocations={workLocations}
      />
    </>
  );
}