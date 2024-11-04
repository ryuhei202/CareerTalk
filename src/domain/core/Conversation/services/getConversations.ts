import type { GetConversationsUseCaseResponse } from "@/usecase/getConversations/getConversationUseCase";
import { NamedError } from "@/util/error";
import type {
	Applicant,
	Employee,
	Conversation as PrismaConversation,
	Message as PrismaMessage,
	User,
} from "@prisma/client";
import { Conversation } from "../Conversation";
import type { ConversationStatusEnum } from "../ConversationEnum";
import type { ConversationPurposeEnum } from "../ConversationEnum";
import { Message } from "../Message/Message";
import type { ValidatedResult } from "./validateGetConversationsInput";

export class GetConversationsError extends NamedError {
	readonly name = "GetConversationsError";
}

export const getConversations = async (
	validatedResult: ValidatedResult,
): Promise<GetConversationsUseCaseResponse> => {
	const { conversations, user } = validatedResult;

	const results: GetConversationsUseCaseResponse = conversations.map(
		(conversation) => {
			const messages = conversation.messages;
			let messageEntities: Message[] = [];
			if (messages) {
				messageEntities = messages.map((message: PrismaMessage) =>
					Message.create({
						id: message.id,
						conversationId: message.conversationId,
						senderId: message.senderId,
						content: message.content,
						isRead: message.isRead,
						createdAt: message.createdAt,
					}),
				);
			}

			const conversationEntity = Conversation.create({
				id: conversation.id,
				applicantUserId: conversation.applicantUserId,
				employeeUserId: conversation.employeeUserId,
				purpose: conversation.purpose as ConversationPurposeEnum,
				status: conversation.status as ConversationStatusEnum,
				messages: messageEntities,
			});

			const partnerUserId = conversationEntity.getPartnerIdByUserId(user.id);
			const partnerUserImage =
				partnerUserId === conversation.employeeUserId
					? conversation.employee.user.image
					: conversation.applicant.user.image;

			const partnerName =
				partnerUserId === conversation.employeeUserId
					? conversation.employee.user.name
					: conversation.applicant.user.name;

			return {
				id: conversationEntity.id,
				PartnerUserId: partnerUserId,
				PartnerName: partnerName,
				PartnerImageURL: partnerUserImage ?? "",
				lastMessage: conversationEntity.getLatestMessageContent(),
				lastMessageAt: conversationEntity.getLatestMessageAt(),
				unreadMessageCount: conversationEntity.getUnreadMessageCount(user.id),
			};
		},
	);

	return results;
};
