import type { Company, PrismaPromise } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const company = () => {
	const res: PrismaPromise<Company>[] = [];
	for (const data of fixture) {
		const row = prisma.company.upsert({
			where: { id: data.id },
			update: data,
			create: data,
		});
		res.push(row);
	}
	return res;
};
