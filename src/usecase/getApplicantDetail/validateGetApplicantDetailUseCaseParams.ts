import { z } from "zod";
export type GetApplicantDetailParams = {
	applicantUserId: string;
};

export const validateGetApplicantDetailUseCaseParams = (
	params: GetApplicantDetailParams,
) => {
	// スキーマ定義
	const applicantUserIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		applicantUserId: applicantUserIdSchema,
	});

	return paramsSchema.parse(params);
};
