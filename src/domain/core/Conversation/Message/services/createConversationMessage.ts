import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import type { CreateConversationMessageUseCaseParams } from "@/usecase/createConversationMessage/createConversationMessageUseCase";
import type { ConversationMessage } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { NamedError } from "@/util/error";
import { Message } from "../Message";
export class CreateConversationMessageError extends NamedError {
	readonly name = "CreateConversationMessageError";
}

export const createConversationMessage = async (
	params: CreateConversationMessageUseCaseParams,
): Promise<ConversationMessage> => {
	const { conversationId, senderId, content } = params;

	const conversation = await prisma.conversation.findFirst({
		where: {
			id: conversationId,
		},
	});

	if (!conversation) {
		throw new CreateConversationMessageError("このDMは存在しません");
	}

	if (
		conversation.applicantUserId !== senderId &&
		conversation.employeeUserId !== senderId
	) {
		throw new CreateConversationMessageError("このDMには送信できません");
	}

	const messageEntity = Message.create({
		id: createId(),
		conversationId,
		senderId,
		content,
		isRead: false,
		createdAt: new Date(),
	});

	await prisma.$transaction(async (tx) => {
		return await tx.message.create({
			data: {
				id: messageEntity.id,
				content: messageEntity.content,
				senderId: messageEntity.senderId,
				conversationId: messageEntity.conversationId,
				isRead: messageEntity.isRead,
				createdAt: messageEntity.createdAt,
			},
		});
	});

	return {
		id: messageEntity.id,
		senderId: messageEntity.senderId,
		content: messageEntity.content,
		isRead: messageEntity.isRead,
		createdAt: messageEntity.createdAt,
	};
};
