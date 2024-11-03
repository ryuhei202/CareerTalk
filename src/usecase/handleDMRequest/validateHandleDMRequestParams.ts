import type { HandleDMRequestParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/_actions/handleDMRequestAction";
import { z } from "zod";

export const validateHandleDMRequestParams = (
	params: HandleDMRequestParams,
): HandleDMRequestParams => {
	// スキーマ定義
	const applicantUserIdSchema = z.string().trim().length(25, {
		message: "無効な応募者IDです。転職希望者のIDは25文字である必要があります",
	});
	const employeeUserIdSchema = z.string().trim().length(25, {
		message: "無効な社員IDです。社員IDは25文字である必要があります",
	});
	const isApproveSchema = z.boolean();

	// パラメータスキーマ
	const paramsSchema = z.object({
		applicantUserId: applicantUserIdSchema,
		employeeUserId: employeeUserIdSchema,
		isApprove: isApproveSchema,
	});

	return paramsSchema.parse(params);
};
