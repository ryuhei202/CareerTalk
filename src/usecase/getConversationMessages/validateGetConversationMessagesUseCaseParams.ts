import { z } from "zod";
import type { GetConversationMessagesUseCaseParams } from "./getConversationMessagesUseCase";
export const validateGetConversationMessagesUseCaseParams = (
	params: GetConversationMessagesUseCaseParams,
) => {
	// スキーマ定義
	const conversationIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		conversationId: conversationIdSchema,
	});

	return paramsSchema.parse(params);
};
