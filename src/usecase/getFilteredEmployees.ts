import type {
	FilteredEmployee,
	SearchEmployeeParams,
} from "@/app/(site)/applicant/search_employees/page";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import {
	type FilterEmployeeError,
	filterEmployees,
} from "@/domain/core/Employee/services/filterEmployee";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";

export type SearchEmployeeResponse = {
	totalCount: number;
	employees: FilteredEmployee[];
};

export type SearchEmployeeUseCaseResult = Result<
	SearchEmployeeResponse,
	undefined
>;

export const getFilteredEmployeesUseCase = async (
	params: SearchEmployeeParams,
): Promise<SearchEmployeeUseCaseResult> => {
	try {
		// 現場社員のフィルタリングして返却する
		const filteredEmployeeDtos = await filterEmployees(params);

		return createSuccess({
			message: "現場社員の取得に成功しました",
			data: filteredEmployeeDtos,
		});
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as FilterEmployeeError | EmployeeDomainError).message,
			data: undefined,
		});
	}
};
