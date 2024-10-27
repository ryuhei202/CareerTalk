import type { CreatedApplicantResponse } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import { createApplicant } from "@/domain/core/Applicant/services/createApplicant";
import {
	InvalidRegisterApplicantInputError,
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
type RegisterApplicantUseCaseResult = Result<
	CreatedApplicantResponse,
	InvalidRegisterApplicantInputError | ZodError
>;

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
		const createdApplicant = await createApplicant(applicant);

		if (createdApplicant == null) {
			console.error({
				message: "転職者の登録に失敗しました",
				createdApplicant,
			});
			return createFailure(
				new InvalidRegisterApplicantInputError("転職者登録に失敗しました"),
			);
		}

		console.log({
			message: "転職者の登録に成功しました",
			createdApplicant,
		});
		return createSuccess(createdApplicant.toJson());
	} catch (error) {
		console.error({
			message: "転職者の登録に失敗しました",
			error,
		});
		return createFailure(
			error as InvalidRegisterApplicantInputError | ZodError,
		);
	}
};
