import "server-only";

import type { RegisterEmployeeParams } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import { createEmployee } from "@/domain/core/Employee/services/createEmployee";
import {
	type InvalidRegisterEmployeeInputError,
	validateRegisterEmployeeInput,
} from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateRegisterEmployeeUseCaseParams } from "./validateRegisterEmployeeUseCaseParams";

type RegisterEmployeeUseCaseResult = Result<undefined, undefined>;

export const registerEmployeeUseCase = async (
	params: RegisterEmployeeParams,
): Promise<RegisterEmployeeUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams = validateRegisterEmployeeUseCaseParams(params);
		// ドメインサービス① 現場社員登録インプットのバリデーション
		const employee = await validateRegisterEmployeeInput(validatedParams);

		// ドメインサービス② 現場社員の登録
		const createdEmployee = await createEmployee(employee);

		if (createdEmployee == null) {
			return createFailure({
				message: "現場社員の登録に失敗しました",
				data: createdEmployee,
			});
		}

		return createSuccess({
			message: "現場社員の登録に成功しました",
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
				error as InvalidRegisterEmployeeInputError | EmployeeDomainError
			).message,
			data: undefined,
		});
	}
};
