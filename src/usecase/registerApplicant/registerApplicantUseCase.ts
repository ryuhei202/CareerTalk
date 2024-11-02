import "server-only";

import type { RegisterApplicantParams } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import { createApplicant } from "@/domain/core/Applicant/services/createApplicant";
import {
	type InvalidRegisterApplicantInputError,
	validateRegisterApplicantInput,
} from "@/domain/core/Applicant/services/validateRegisterApplicantInput";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { ZodError } from "zod";
import { validateRegisterApplicantUseCaseParams } from "./validateRegisterApplicantUseCaseParams";

type RegisterApplicantUseCaseResult = Result<undefined, undefined>;

export type RegisterApplicantUseCase = (
	params: RegisterApplicantParams,
) => Promise<RegisterApplicantUseCaseResult>;

export const registerApplicantUseCase = async (
	params: RegisterApplicantParams,
): Promise<RegisterApplicantUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams = validateRegisterApplicantUseCaseParams(params);

		// ドメインサービス① 転職者登録インプットのバリデーション
		const applicant = await validateRegisterApplicantInput(validatedParams);

		// ドメインサービス② 転職者の登録
		const createdApplicant = await createApplicant(applicant);

		if (createdApplicant == null) {
			return createFailure({
				message: "転職者登録に失敗しました",
				data: createdApplicant,
			});
		}

		return createSuccess({
			message: "転職者登録に成功しました",
			data: undefined,
		});
	} catch (error) {
		return createFailure({
			message: (error as InvalidRegisterApplicantInputError | ZodError).message,
			data: undefined,
		});
	}
};
