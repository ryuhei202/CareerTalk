import { z } from "zod";
import type { GetLikedApplicantsUseCaseParams } from "../getLikedApplicants";

export const validateGetLikedApplicantsUseCaseParams = (
	params: GetLikedApplicantsUseCaseParams,
) => {
	// スキーマ定義
	const pageSchema = z.number().int().positive();
	const employeeUserIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		page: pageSchema,
		employeeUserId: employeeUserIdSchema,
	});

	return paramsSchema.parse(params);
};
