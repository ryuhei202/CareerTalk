import "server-only";

import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import {
	type GetApplicantDetailError,
	getApplicantDetail,
} from "@/domain/core/Applicant/services/getApplicantDetail";
import type { GenderLabel } from "@/domain/shared/Gender";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { Occupation } from "@prisma/client";
import { ZodError } from "zod";
import {
	type GetApplicantDetailParams,
	validateGetApplicantDetailUseCaseParams,
} from "./validateGetApplicantDetailUseCaseParams";
export type ApplicantDetailResponse = {
	userId: string;
	name: string;
	occupation: Occupation | undefined;
	gender: GenderLabel;
	imageUrl: string;
	selfIntroduction: string;
};

export type GetApplicantDetailUseCaseResult = Result<
	ApplicantDetailResponse,
	undefined
>;

export const getApplicantDetailUseCase = async (
	params: GetApplicantDetailParams,
): Promise<GetApplicantDetailUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams = validateGetApplicantDetailUseCaseParams(params);
		// 現場社員の詳細を取得する
		const employeeDetail = await getApplicantDetail(validatedParams);

		return createSuccess({
			message: "転職者の取得に成功しました",
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
			message: (error as GetApplicantDetailError | ApplicantDomainError)
				.message,
			data: undefined,
		});
	}
};
