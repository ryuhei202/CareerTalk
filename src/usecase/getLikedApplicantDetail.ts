import type { GetLikedApplicantDetailParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/page";
import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import type { LikedApplicant } from "./getLikedApplicants";

import {
	type GetLikedApplicantDetailError,
	getLikedApplicantDetail,
} from "@/domain/core/Applicant/services/getLikedApplicantDetail";
import { validateGetLikedApplicantDetailUseCaseParams } from "./validateParams/validateGetLikedApplicantDetailUseCaseParams";

export type ApplicantDetailResponse = {
	applicant: LikedApplicant;
	likeReason: string;
	likeMessage?: string;
};

export type GetLikedApplicantDetailUseCaseResult = Result<
	ApplicantDetailResponse,
	undefined
>;

export const getLikedApplicantDetailUseCase = async (
	params: GetLikedApplicantDetailParams,
): Promise<GetLikedApplicantDetailUseCaseResult> => {
	try {
		const validateResult = validateGetLikedApplicantDetailUseCaseParams(params);

		const applicantDetail = await getLikedApplicantDetail(validateResult);

		return createSuccess({
			message: "いいねをしてくれた転職希望者の詳細の取得に成功しました",
			data: applicantDetail,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as GetLikedApplicantDetailError | ApplicantDomainError)
				.message,
			data: undefined,
		});
	}
};
