import type { GetLikedApplicantDetailParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/page";
import { z } from "zod";

export const validateGetLikedApplicantDetailUseCaseParams = (
	params: GetLikedApplicantDetailParams,
) => {
	// スキーマ定義
	const applicantUserIdSchema = z.string().trim().length(25);
	const employeeUserIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		applicantUserId: applicantUserIdSchema,
		employeeUserId: employeeUserIdSchema,
	});

	return paramsSchema.parse(params);
};
