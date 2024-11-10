import type { UpdateApplicantForMyPageParams } from "@/app/(site)/applicant/my_page/edit/_actions/updateEmployeeForMyPageAction";
import { z } from "zod";

export const validateUpdateApplicantForMyPageUseCaseParams = (
	params: UpdateApplicantForMyPageParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const occupationIdSchema = z.number().int().positive();
	const selfIntroductionSchema = z.string().trim().optional();
	const workHistorySchema = z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional();
	const educationSchema = z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional();
	const companySchema = z
		.string()
		.trim()
		.max(100, {
			message: "100文字以内で入力してください",
		})
		.optional();
	const joiningDateSchema = z.date().optional();

	const paramsSchema = z.object({
		userId: userIdSchema,
		occupationId: occupationIdSchema,
		selfIntroduction: selfIntroductionSchema,
		joiningDate: joiningDateSchema,
		workHistory: workHistorySchema,
		company: companySchema,
		education: educationSchema,
	});
	return paramsSchema.parse(params);
};
