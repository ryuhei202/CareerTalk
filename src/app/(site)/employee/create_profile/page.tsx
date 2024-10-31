import { getEmployeeUserId, getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateEmployeeProfileContainer from "./_components/CreateEmplopyeeProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileEmployeePage() {
  const session = await getServerSession();
  const employeeUserId = await getEmployeeUserId();
  // すでに会員登録済みの場合はいいね一覧画面にリダイレクト
  if (employeeUserId) {
    redirect("/employee/matches");
  }
  const occupations: TOccupation[] = await prisma.occupation.findMany();
  return (
    <CreateEmployeeProfileContainer
      occupations={occupations}
      userName={session?.user.name ?? ""}
    />
  );
}
