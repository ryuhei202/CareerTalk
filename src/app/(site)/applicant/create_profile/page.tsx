import { getApplicantUserId, getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateProfileApplicant from "./_components/CreateApplicantProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileApplicantPage() {
  const session = await getServerSession();
  const applicantUserId = await getApplicantUserId();
  // すでに会員登録済みの場合は現場社員検索画面にリダイレクト
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
