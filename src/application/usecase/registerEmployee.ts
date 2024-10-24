import type { CreatedEmployeeResponse } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import { createEmployee } from "@/domain/core/Employee/services/createEmployee";
import {
	InvalidRegisterEmployeeInputError,
	validateRegisterEmployeeInput,
} from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { ZodError } from "zod";

export interface RegisterEmployeeParams {
	userId: string;
	name: string;
	companyCode: string;
	occupationId: number;
	gender: string;
	birthday: Date;
	joiningDate: Date;
	imageUrl?: string;
	workLocationId?: number;
	hiringType?: string;
	meetingMethod?: string;
	selfIntroduction?: string;
	talkableTopics?: string;
}
type RegisterEmployeeUseCaseResult = Result<
	CreatedEmployeeResponse,
	InvalidRegisterEmployeeInputError | ZodError
>;

export type RegisterEmployeeUseCase = (
	params: RegisterEmployeeParams,
) => Promise<RegisterEmployeeUseCaseResult>;

export const registerEmployeeUseCase = async (
	params: RegisterEmployeeParams,
): Promise<RegisterEmployeeUseCaseResult> => {
	console.log({
		message: `${registerEmployeeUseCase.name}`,
		params,
	});
	try {
		// ドメインサービス① 現場社員登録パラメータのバリデーション
		const employee = await validateRegisterEmployeeInput(params);

		// ドメインサービス② 現場社員の登録
		const createdEmployee = await createEmployee(employee);

		if (createdEmployee == null) {
			console.error({
				message: "現場社員の登録に失敗しました",
				createdEmployee,
			});
			return createFailure(
				new InvalidRegisterEmployeeInputError("現場社員登録に失敗しました"),
			);
		}

		console.log({
			message: "現場社員の登録に成功しました",
			createdEmployee,
		});
		return createSuccess(createdEmployee.toJson());
	} catch (error) {
		console.error({
			message: "現場社員の登録に失敗しました",
			error,
		});
		return createFailure(error as InvalidRegisterEmployeeInputError | ZodError);
	}
};
