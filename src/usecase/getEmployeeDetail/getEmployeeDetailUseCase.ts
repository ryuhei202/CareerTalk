import "server-only";

import type { GetEmployeeDetailParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/page";
import type { EmployeeDomainError } from "@/domain/core/Employee/Employee";
import {
	type GetEmployeeDetailError,
	getEmployeeDetail,
} from "@/domain/core/Employee/services/getEmployeeDetail";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import type { Occupation, WorkLocation } from "./EmployeeDetailDTO";
import { validateGetEmployeeDetailUseCaseParams } from "./validateGetEmployeeDetailUseCaseParams";

export type EmployeeDetailResponse = {
	userId: string;
	name: string;
	companyName: string;
	occupation: Occupation | undefined;
	yearsOfExperience: number;
	gender: GenderLabel;
	talkableTopics: string;
	careerDescription: string;
	jobDescription: string;
	joiningDescription: string;
	otherDescription: string;
	hiringType: HiringTypeLabel | "";
	workLocation: WorkLocation | undefined;
	imageUrl: string;
	meetingMethod: string;
	barkerMessage: string;
};

export type GetEmployeeDetailUseCaseResult = Result<
	EmployeeDetailResponse,
	undefined
>;

export const getEmployeeDetailUseCase = async (
	params: GetEmployeeDetailParams,
): Promise<GetEmployeeDetailUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams = validateGetEmployeeDetailUseCaseParams(params);
		// 現場社員の詳細を取得する
		const employeeDetail = await getEmployeeDetail(validatedParams);

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
