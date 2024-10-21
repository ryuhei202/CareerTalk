import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CreateEmployeeProfileContainer from "./_components/CreateEmplpyeeProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileEmployeePage() {
  const session = await getServerSession();
  if (!session) {
    return redirect("/");
  }

  const occupations: TOccupation[] = await prisma.occupation.findMany();
  return (
    <CreateEmployeeProfileContainer
      occupations={occupations}
      userId={session.user.id}
    />
  );
}
