import "server-only";

import type { UpdateEmployeeForMyPageParams } from "@/app/(site)/employee/my_page/edit/_actions/updateEmployeeForMyPageAction";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import { updateEmployeeForMyPage } from "@/domain/core/Employee/services/updateEmployeeForMyPage";
import {
	type InvalidUpdateEmployeeForMyPageInputError,
	validateUpdateEmployeeForMyPageInput,
} from "@/domain/core/Employee/services/validateUpdateEmployeeForMyPageInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateUpdateEmployeeForMyPageUseCaseParams } from "./validateUpdateEmployeeForMyPageUseCaseParams";

export type UpdateEmployeeUseCaseResult = Result<undefined, undefined>;

export const updateEmployeeForMyPageUseCase = async (
	params: UpdateEmployeeForMyPageParams,
): Promise<UpdateEmployeeUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams =
			validateUpdateEmployeeForMyPageUseCaseParams(params);

		// ドメインサービス① 現場社員登録インプットのバリデーション
		const employee =
			await validateUpdateEmployeeForMyPageInput(validatedParams);

		// ドメインサービス② 現場社員の登録
		const updatedEmployee = await updateEmployeeForMyPage(employee);

		if (updatedEmployee == null) {
			return createFailure({
				message: "現場社員の更新に失敗しました",
				data: updatedEmployee,
			});
		}

		return createSuccess({
			message: "現場社員の更新に成功しました",
			data: undefined,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (
				error as InvalidUpdateEmployeeForMyPageInputError | EmployeeDomainError
			).message,
			data: undefined,
		});
	}
};
