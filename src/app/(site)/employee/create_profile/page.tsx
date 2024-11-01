import {
  getApplicantUserId,
  getEmployeeUserId,
  getServerSession,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateEmployeeProfileContainer from "./_components/CreateEmplopyeeProfileContainer";

export default async function CreateProfileEmployeePage() {
  const [session, employeeUserId, applicantUserId] = await Promise.all([
    getServerSession(),
    getEmployeeUserId(),
    getApplicantUserId(),
  ]);
  // 既に転職希望者として登録済みの場合は転職希望者検索画面にリダイレクト
  if (applicantUserId) {
    redirect("/applicant/search_employees");
  }
  // 既に現場社員として登録済みの場合はいいね一覧画面にリダイレクト
  if (employeeUserId) {
    redirect("/employee/matches");
  }

  const [occupations, workLocations] = await Promise.all([
    prisma.occupation.findMany(),
    prisma.workLocation.findMany(),
  ]);

  return (
    <CreateEmployeeProfileContainer
      occupations={occupations}
      userName={session?.user.name ?? ""}
      workLocations={workLocations}
    />
  );
}
