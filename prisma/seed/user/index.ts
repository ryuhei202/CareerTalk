import type { PrismaPromise, User } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const user = () => {
	const res: PrismaPromise<User>[] = [];
	for (const data of fixture) {
		const row = prisma.user.upsert({
			where: { id: data.id },
			update: data,
			create: data,
		});
		res.push(row);
	}
	return res;
};
