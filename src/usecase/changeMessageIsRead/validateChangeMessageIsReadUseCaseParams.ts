import type { ChangeMessageIsReadParams } from "@/usecase/changeMessageIsRead/changeMessageIsReadUseCase";
import { z } from "zod";
export const validateChangeMessageIsReadUseCaseParams = (
	params: ChangeMessageIsReadParams,
) => {
	// スキーマ定義
	const conversationIdSchema = z.string().trim().length(25);
	const userIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		conversationId: conversationIdSchema,
		userId: userIdSchema,
	});

	return paramsSchema.parse(params);
};
