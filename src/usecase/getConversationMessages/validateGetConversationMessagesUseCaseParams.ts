import { z } from "zod";
import type { GetConversationMessagesUseCaseParams } from "./getConversationMessagesUseCase";
export const validateGetConversationMessagesUseCaseParams = (
	params: GetConversationMessagesUseCaseParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const partnerUserIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		userId: userIdSchema,
		partnerUserId: partnerUserIdSchema,
	});

	return paramsSchema.parse(params);
};
