import type { ConversationPurpose, PrismaPromise } from "@prisma/client";
import { prisma } from "..";
import fixture from "./fixture.json";

export const conversationPurpose = () => {
	const res: PrismaPromise<ConversationPurpose>[] = [];
	for (const data of fixture) {
		const row = prisma.conversationPurpose.upsert({
			where: { id: data.id },
			update: {
				reason: data.reason,
			},
			create: {
				id: data.id,
				reason: data.reason,
			},
		});
		res.push(row);
	}
	return res;
};
