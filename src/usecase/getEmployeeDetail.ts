import "server-only";

import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/detail/[employeeUserId]/page";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import {
	type GetEmployeeDetailError,
	getEmployeeDetail,
} from "@/domain/core/Employee/services/getEmployeeDetail";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import type { EmployeeDetailResponse } from "./dto/Employee/EmployeeDetailDto";
import { validateGetEmployeeDetailUseCaseParams } from "./validateParams/validateGetEmployeeDetailUseCaseParams";

export type GetEmployeeDetailUseCaseResult = Result<
	EmployeeDetailResponse,
	undefined
>;

export const getEmployeeDetailUseCase = async (
	params: GetEmployeeDetailParams,
): Promise<GetEmployeeDetailUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validateResult = validateGetEmployeeDetailUseCaseParams(params);
		// 現場社員の詳細を取得する
		const employeeDetail = await getEmployeeDetail(validateResult);

		return createSuccess({
			message: "現場社員の取得に成功しました",
			data: employeeDetail,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as GetEmployeeDetailError | EmployeeDomainError).message,
			data: undefined,
		});
	}
};
