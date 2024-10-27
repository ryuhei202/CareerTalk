import type { Occupation, PrismaPromise } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const occupation = () => {
	const res: PrismaPromise<Occupation>[] = [];
	for (const data of fixture) {
		const row = prisma.occupation.upsert({
			where: { id: data.id },
			update: {
				name: data.name,
			},
			create: {
				id: data.id,
				name: data.name,
			},
		});
		res.push(row);
	}
	return res;
};
