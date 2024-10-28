import { z } from "zod";
import type { GetEmployeeDetailParams } from "../page";

export const validateGetEmployeeDetailUseCaseParams = (
	params: GetEmployeeDetailParams,
) => {
	// スキーマ定義
	const employeeIdSchema = z.string().trim().length(25);

	// パラメータスキーマ
	const paramsSchema = z.object({
		employeeId: employeeIdSchema,
	});

	return paramsSchema.parse(params);
};
