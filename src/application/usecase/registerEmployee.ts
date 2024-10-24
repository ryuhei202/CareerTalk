import type { CreatedEmployeeResponse } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import type { CreateEmployee } from "@/domain/core/Employee/services/createEmployee";
import {
	InvalidRegisterEmployeeInputError,
	type ValidateRegisterEmployeeInput,
} from "@/domain/core/Employee/services/validateRegisterEmployeeInput";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { ZodError } from "zod";
import type { ITransactionManager } from "../shared/TransactionManager";

export interface RegisterEmployeeParams {
	userId: string;
	name: string;
	companyCode: string;
	occupationId: number;
	gender: string;
	birthday: Date;
	joiningDate: Date;
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

export const buildRegisterEmployeeUseCase =
	({
		validateRegisterEmployeeInput,
		createEmployee,
		transactionManager,
	}: {
		validateRegisterEmployeeInput: ValidateRegisterEmployeeInput;
		createEmployee: CreateEmployee;
		transactionManager: ITransactionManager;
	}): RegisterEmployeeUseCase =>
	async (params: RegisterEmployeeParams) => {
		console.log({
			message: `${buildRegisterEmployeeUseCase.name}`,
			params,
		});

		try {
			// 現場社員登録パラメータのバリデーション
			const employeeCommand = await validateRegisterEmployeeInput(params);

			// 現場社員の登録（トランザクション実行）
			const createdEmployee = await transactionManager.begin(async () => {
				return await createEmployee(employeeCommand);
			});

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
			return createFailure(
				error as InvalidRegisterEmployeeInputError | ZodError,
			);
		}
	};
