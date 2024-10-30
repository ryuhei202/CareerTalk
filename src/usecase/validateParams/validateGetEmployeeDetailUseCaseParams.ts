import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/detail/[employeeUserId]/page";
import { z } from "zod";

export const validateGetEmployeeDetailUseCaseParams = (
	params: GetEmployeeDetailParams,
) => {
	// スキーマ定義
	const employeeUserIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		employeeUserId: employeeUserIdSchema,
	});

	return paramsSchema.parse(params);
};
