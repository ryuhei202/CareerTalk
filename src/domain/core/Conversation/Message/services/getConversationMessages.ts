import { prisma } from "@/lib/prisma";
import type {
	GetConversationMessagesUseCaseParams,
	GetConversationMessagesUseCaseResponse,
} from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { NamedError } from "@/util/error";
import { Message } from "../Message";

export class GetConversationMessagesError extends NamedError {
	readonly name = "GetConversationMessagesError";
}

export const getConversationMessages = async (
	params: GetConversationMessagesUseCaseParams,
): Promise<GetConversationMessagesUseCaseResponse> => {
	const { conversationId } = params;
	console.log("conversationId", conversationId);
	// 会話が存在するかの確認
	const conversation = await prisma.conversation.findFirst({
		where: {
			id: conversationId,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: "asc",
				},
			},
		},
	});

	if (!conversation) {
		throw new GetConversationMessagesError("このDMは存在しません");
	}

	console.log("conversation", conversation);

	const messageEntities = conversation.messages.map((message) => {
		return Message.create({
			id: message.id,
			content: message.content,
			conversationId: conversation.id,
			senderId: message.senderId,
			isRead: message.isRead,
			createdAt: message.createdAt,
		});
	});

	return messageEntities.map((message) => ({
		id: message.id,
		content: message.content,
		senderId: message.senderId,
		isRead: message.isRead,
		createdAt: message.createdAt,
	}));
};
