import type { UpdateApplicantForMyPageParams } from "@/app/(site)/applicant/my_page/edit/_actions/updateEmployeeForMyPageAction";
import { z } from "zod";

export const validateUpdateApplicantForMyPageUseCaseParams = (
	params: UpdateApplicantForMyPageParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const occupationIdSchema = z.number().int().positive();
	const selfIntroductionSchema = z.string().trim().optional();

	const paramsSchema = z.object({
		userId: userIdSchema,
		occupationId: occupationIdSchema,
		selfIntroduction: selfIntroductionSchema,
	});

	return paramsSchema.parse(params);
};
