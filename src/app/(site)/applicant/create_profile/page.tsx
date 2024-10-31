import {
  getApplicantUserId,
  getEmployeeUserId,
  getServerSession,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateProfileApplicant from "./_components/CreateApplicantProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileApplicantPage() {
  const [session, employeeUserId, applicantUserId] = await Promise.all([
    getServerSession(),
    getEmployeeUserId(),
    getApplicantUserId(),
  ]);

  // すでに現場社員として会員登録済みの場合は現場社員検索画面にリダイレクト
  if (employeeUserId) {
    redirect("/employee/matches");
  }

  // すでに転職希望者として会員登録済みの場合は転職希望者検索画面にリダイレクト
  if (applicantUserId) {
    redirect("/applicant/search_employees");
  }
  const occupations: TOccupation[] = await prisma.occupation.findMany();
  return (
    <CreateProfileApplicant
      occupations={occupations}
      userName={session?.user.name ?? ""}
    />
  );
}
