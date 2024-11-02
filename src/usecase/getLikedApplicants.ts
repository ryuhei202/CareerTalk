import "server-only";

import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import {
	type GetLikedApplicantsError,
	getLikedApplicants,
} from "@/domain/core/Applicant/services/getLikedApplicants";
import type { GenderLabel } from "@/domain/shared/Gender";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateGetLikedApplicantsUseCaseParams } from "./validateParams/validateGetLikedApplicantsUseCaseParams";

export type LikedApplicant = {
	userId: string;
	name: string;
	gender: GenderLabel;
	age?: number;
	yearsOfExperience: number;
	occupationName: string;
	selfIntroduction?: string;
	imageUrl?: string;
};

export type LikedApplicantResponse = {
	totalCount: number;
	applicants: LikedApplicant[];
};

export type GetLikedApplicantsUseCaseParams = {
	page: number;
	employeeUserId: string;
};

type GetLikedApplicantsUseCaseResult = Result<
	LikedApplicantResponse,
	undefined
>;

export const getLikedApplicantsUseCase = async (
	params: GetLikedApplicantsUseCaseParams,
): Promise<GetLikedApplicantsUseCaseResult> => {
	try {
		const validateResult = validateGetLikedApplicantsUseCaseParams(params);
		// いいねした転職希望者を取得して返却する
		const likedApplicantsResponse = await getLikedApplicants(validateResult);

		return createSuccess({
			message: "いいねした転職希望者の取得に成功しました",
			data: likedApplicantsResponse,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as GetLikedApplicantsError | ApplicantDomainError)
				.message,
			data: undefined,
		});
	}
};
