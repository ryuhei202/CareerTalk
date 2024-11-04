import { z } from "zod";
import type { GetConversationUseCaseParams } from "./getConversationUseCase";

export const validateGetConversationUseCaseParams = (
	params: GetConversationUseCaseParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		userId: userIdSchema,
	});

	return paramsSchema.parse(params);
};
