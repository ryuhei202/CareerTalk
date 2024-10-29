import { createApplicant } from "@/domain/core/Applicant/services/createApplicant";
import {
	type InvalidRegisterApplicantInputError,
	validateRegisterApplicantInput,
} from "@/domain/core/Applicant/services/validateRegisterApplicantInput";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { ZodError } from "zod";

export interface RegisterApplicantParams {
	userId: string;
	name: string;
	occupationId: number;
	gender: string;
	birthday: Date;
	joiningDate: Date;
	imageUrl?: string;
	selfIntroduction?: string;
}
type RegisterApplicantUseCaseResult = Result<undefined, undefined>;

export type RegisterApplicantUseCase = (
	params: RegisterApplicantParams,
) => Promise<RegisterApplicantUseCaseResult>;

export const registerApplicantUseCase = async (
	params: RegisterApplicantParams,
): Promise<RegisterApplicantUseCaseResult> => {
	console.log({
		message: `${registerApplicantUseCase.name}`,
		params,
	});
	try {
		// ドメインサービス① 転職者登録パラメータのバリデーション
		const applicant = await validateRegisterApplicantInput(params);

		// ドメインサービス② 転職者の登録
		const mayBeCreatedApplicant = await createApplicant(applicant);

		if (mayBeCreatedApplicant == null) {
			return createFailure({
				message: "転職者登録に失敗しました",
				data: mayBeCreatedApplicant,
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
