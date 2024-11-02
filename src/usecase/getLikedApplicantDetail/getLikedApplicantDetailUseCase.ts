import type { GetLikedApplicantDetailParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/page";
import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";

import {
	type GetLikedApplicantDetailError,
	getLikedApplicantDetail,
} from "@/domain/core/Applicant/services/getLikedApplicantDetail";
import type { LikedApplicant } from "../getLikedApplicants/getLikedApplicantsUseCase";
import { validateGetLikedApplicantDetailUseCaseParams } from "./validateGetLikedApplicantDetailUseCaseParams";

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
		const validatedParams =
			validateGetLikedApplicantDetailUseCaseParams(params);

		const applicantDetail = await getLikedApplicantDetail(validatedParams);

		return createSuccess({
			message: "いいねをしてくれた転職希望者の詳細の取得に成功しました",
			data: applicantDetail,
		});
	} catch (error) {
		console.error("error", error);
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
