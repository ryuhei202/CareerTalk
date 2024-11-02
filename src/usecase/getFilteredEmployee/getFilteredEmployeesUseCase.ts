import "server-only";

import type {
	Company,
	Occupation,
	SearchEmployeeParams,
	WorkLocation,
} from "@/app/(site)/applicant/search_employees/page";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import {
	type FilterEmployeeError,
	filterEmployees,
} from "@/domain/core/Employee/services/filterEmployee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import type { MeetingMethodLabel } from "@/domain/shared/MeetingMethod";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateGetFilteredEmployeeUseCaseParams } from "./validateGetFilteredEmployeeUseCaseParams";
export type FilteredEmployee = {
	userId: string;
	name: string;
	company: Company;
	occupation: Occupation;
	gender: GenderLabel;
	yearsOfExperience: number;
	age?: number;
	imageUrl?: string;
	workLocation?: WorkLocation;
	hiringType?: HiringTypeLabel;
	meetingMethod?: MeetingMethodLabel;
	selfIntroduction?: string;
	talkableTopics?: string;
};

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
		// パラメータのバリデーション
		const validatedParams = validateGetFilteredEmployeeUseCaseParams(params);
		// 現場社員のフィルタリングして返却する
		const filteredEmployeeResponse = await filterEmployees(validatedParams);

		return createSuccess({
			message: "現場社員の取得に成功しました",
			data: filteredEmployeeResponse,
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
