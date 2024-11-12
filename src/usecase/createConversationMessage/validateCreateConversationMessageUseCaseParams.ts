import { z } from "zod";
import type { CreateConversationMessageUseCaseParams } from "./createConversationMessageUseCase";
export const validateCreateConversationMessageUseCaseParams = (
	params: CreateConversationMessageUseCaseParams,
) => {
	// スキーマ定義
	const conversationIdSchema = z.string().trim().length(25);
	const messageIdSchema = z.string().trim().length(25);
	const senderIdSchema = z.string().trim().length(25);
	const contentSchema = z.string().min(1).max(1000);

	// パラメータスキーマ
	const paramsSchema = z.object({
		conversationId: conversationIdSchema,
		messageId: messageIdSchema,
		senderId: senderIdSchema,
		content: contentSchema,
	});

	return paramsSchema.parse(params);
};
