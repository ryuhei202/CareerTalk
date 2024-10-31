import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreateEmployeeProfileContainer from "./_components/CreateEmplopyeeProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileEmployeePage() {
  const session = await getServerSession();
  const occupations: TOccupation[] = await prisma.occupation.findMany();
  return (
    <CreateEmployeeProfileContainer
      occupations={occupations}
      userName={session?.user.name ?? ""}
    />
  );
}
