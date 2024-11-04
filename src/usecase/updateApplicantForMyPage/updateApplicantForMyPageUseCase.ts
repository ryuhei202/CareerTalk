import "server-only";

import type { UpdateApplicantForMyPageParams } from "@/app/(site)/applicant/my_page/edit/_actions/updateEmployeeForMyPageAction";
import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import { updateApplicantForMyPage } from "@/domain/core/Applicant/services/updateApplicantForMyPage";
import {
	type InvalidUpdateApplicantForMyPageInputError,
	validateUpdateApplicantForMyPageInput,
} from "@/domain/core/Applicant/services/validateUpdateEmployeeForMyPageInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateUpdateApplicantForMyPageUseCaseParams } from "./validateUpdateApplicantForMyPageUseCaseParams";

export type UpdateApplicantUseCaseResult = Result<undefined, undefined>;

export const updateApplicantForMyPageUseCase = async (
	params: UpdateApplicantForMyPageParams,
): Promise<UpdateApplicantUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams =
			validateUpdateApplicantForMyPageUseCaseParams(params);

		// ドメインサービス① 転職者登録インプットのバリデーション
		const applicant =
			await validateUpdateApplicantForMyPageInput(validatedParams);

		// ドメインサービス② 転職者の登録
		const updatedApplicant = await updateApplicantForMyPage(applicant);

		if (updatedApplicant == null) {
			return createFailure({
				message: "転職者の更新に失敗しました",
				data: updatedApplicant,
			});
		}

		return createSuccess({
			message: "転職者の更新に成功しました",
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
				error as
					| InvalidUpdateApplicantForMyPageInputError
					| ApplicantDomainError
			).message,
			data: undefined,
		});
	}
};
