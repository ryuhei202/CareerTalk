import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CreateProfileApplicant from "./_components/CreateApplicantProfileContainer";

export type TOccupation = {
	id: number;
	name: string;
};

export default async function CreateProfileApplicantPage() {
	const session = await getServerSession();
	if (!session) {
		return redirect("/");
	}

	const occupations: TOccupation[] = await prisma.occupation.findMany();
	return (
		<CreateProfileApplicant
			occupations={occupations}
			userName={session.user.name ?? ""}
		/>
	);
}
