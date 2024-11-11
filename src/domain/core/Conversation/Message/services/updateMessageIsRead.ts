import { prisma } from "@/lib/prisma";
import type { ChangeMessageIsReadParams } from "@/usecase/changeMessageIsRead/changeMessageIsReadUseCase";
import { NamedError } from "@/util/error";
import { Message } from "../Message";

export class UpdateMessageIsReadError extends NamedError {
	readonly name = "UpdateMessageIsReadError";
}

export const updateMessageIsRead = async (
	params: ChangeMessageIsReadParams,
): Promise<void> => {
	const { conversationId, userId } = params;

	const targetMessages = await prisma.message.findMany({
		where: { conversationId, senderId: { not: userId } },
	});

	if (!targetMessages) {
		throw new UpdateMessageIsReadError("このDMには送信できません");
	}

	const messageEntities = targetMessages.map((message) => {
		return Message.create(message);
	});

	for (const message of messageEntities) {
		message.changeIsRead(true);
	}

	await prisma.$transaction(async (tx) => {
		for (const message of messageEntities) {
			await tx.message.update({
				where: { id: message.id },
				data: { isRead: message.isRead },
			});
		}
	});
};
