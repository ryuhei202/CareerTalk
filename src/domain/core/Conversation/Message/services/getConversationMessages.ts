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
	const { userId, partnerUserId } = params;

	// 相手のユーザーが存在するかの確認
	const partnerUser = await prisma.user.findUnique({
		where: {
			id: partnerUserId,
		},
	});
	if (!partnerUser) {
		throw new GetConversationMessagesError("相手のユーザーが存在しません");
	}

	// 会話が存在するかの確認
	const conversation = await prisma.conversation.findFirst({
		where: {
			OR: [
				{ applicantUserId: userId, employeeUserId: partnerUserId },
				{ applicantUserId: partnerUserId, employeeUserId: userId },
			],
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

	const messages = messageEntities.map((message) => ({
		id: message.id,
		content: message.content,
		senderId: message.senderId,
		isRead: message.isRead,
		createdAt: message.createdAt,
	}));

	return {
		conversationId: conversation.id,
		partnerUser: {
			id: partnerUser.id,
			name: partnerUser.name,
			image: partnerUser.image ?? "",
		},
		messages,
	};
};
