import type { GetConversationsUseCaseResponse } from "@/usecase/getConversations/getConversationUseCase";
import { NamedError } from "@/util/error";
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
			// パフォーマンスの観点から、最後のメッセージのみを取得する
			let messageEntities: Message[] = [];
			const latestMessage = messages[messages.length - 1];
			if (latestMessage) {
				messageEntities = [
					Message.create({
						id: latestMessage.id,
						conversationId: latestMessage.conversationId,
						senderId: latestMessage.senderId,
						content: latestMessage.content,
						isRead: latestMessage.isRead,
						createdAt: latestMessage.createdAt,
					}),
				];
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
