import { prisma } from "@/lib/prisma";
import type { Conversation as PrismaConversation } from "@prisma/client";
import type { Conversation } from "../Conversation";

export const createConversation = async (
	conversation: Conversation,
): Promise<PrismaConversation> => {
	const createdConversation = await prisma.$transaction(async (tx) => {
		try {
			return await tx.conversation.create({
				data: {
					id: conversation.id,
					applicant: {
						connect: {
							userId: conversation.applicantUserId,
						},
					},
					employee: {
						connect: {
							userId: conversation.employeeUserId,
						},
					},
					purpose: conversation.purpose,
					messages:
						conversation.messages.length > 0
							? {
									create: conversation.messages.map((message) => ({
										id: message.id,
										content: message.content,
										senderId: message.senderId,
										isRead: message.isRead,
									})),
								}
							: undefined,
				},
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	});

	return createdConversation;
};
