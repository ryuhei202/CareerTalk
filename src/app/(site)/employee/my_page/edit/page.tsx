import { getEmployeeDetail } from "@/domain/core/Employee/services/getEmployeeDetail";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { EditMyPageFormContent } from "./_components/EditMyPageFormContent";

export default async function MyPageEdit() {

  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  const employee = await getEmployeeDetail({ employeeUserId: session.user.id })
  if (!employee) {
    redirect("/signin")
  }

  const [occupations, workLocations] = await Promise.all([
    prisma.occupation.findMany(),
    prisma.workLocation.findMany(),
  ]);

  return (
    <>
      <EditMyPageFormContent employee={employee} session={session} occupations={occupations} workLocations={workLocations} />
    </>
  );
}