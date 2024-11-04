import { prisma } from "@/lib/prisma";
import type {
	GetConversationUseCaseParams,
	GetConversationsUseCaseResponse,
} from "@/usecase/getConversations/getConversationUseCase";
import { NamedError } from "@/util/error";
import { Conversation } from "../Conversation";
import {
	type ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../ConversationEnum";
import { Message } from "../Message/Message";

export class GetConversationsError extends NamedError {
	readonly name = "GetConversationsError";
}

export const getConversations = async (
	params: GetConversationUseCaseParams,
): Promise<GetConversationsUseCaseResponse> => {
	const userId = params.userId;

	const [user, conversations] = await Promise.all([
		prisma.user.findUnique({
			where: {
				id: userId,
			},
		}),
		prisma.conversation.findMany({
			where: {
				OR: [{ applicantUserId: userId }, { employeeUserId: userId }],
				status: ConversationStatusEnum.APPROVED,
			},
			include: {
				employee: {
					include: {
						user: true,
					},
				},
				applicant: {
					include: {
						user: true,
					},
				},
				messages: true,
			},
		}),
	]);

	if (!user) {
		throw new GetConversationsError(
			"ユーザーが見つかりません。再度ログインしてください",
		);
	}

	if (conversations == null) {
		throw new GetConversationsError("チャットの取得に失敗しました");
	}

	const results: GetConversationsUseCaseResponse = conversations.map(
		(conversation) => {
			const messages = conversation.messages;
			let messageEntities: Message[] = [];
			if (messages) {
				messageEntities = messages.map((message) =>
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

			const partnerUserId = conversationEntity.getPartnerIdByUserId(userId);
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
				unreadMessageCount: conversationEntity.getUnreadMessageCount(userId),
			};
		},
	);

	return results;
};
