import type { PrismaPromise, WorkLocation } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const workLocation = () => {
	const res: PrismaPromise<WorkLocation>[] = [];
	for (const data of fixture) {
		const row = prisma.workLocation.upsert({
			where: { id: data.id },
			update: data,
			create: data,
		});
		res.push(row);
	}
	return res;
};
