import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CreateProfileApplicant from "./_components/CreateApplicantProfileContainer";

export type TOccupation = {
  id: number;
  name: string;
};

export default async function CreateProfileApplicantPage() {
  const session = await getServerSession();
  const occupations: TOccupation[] = await prisma.occupation.findMany();
  return (
    <CreateProfileApplicant
      occupations={occupations}
      userName={session?.user.name ?? ""}
    />
  );
}
