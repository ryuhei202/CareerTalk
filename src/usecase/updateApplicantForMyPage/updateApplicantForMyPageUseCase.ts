import "server-only";

import type { UpdateApplicantForMyPageParams } from "@/app/(site)/applicant/my_page/edit/_actions/updateEmployeeForMyPageAction";
import type { ApplicantDomainError } from "@/domain/core/Applicant/Applicant";
import { updateApplicantForMyPage } from "@/domain/core/Applicant/services/updateApplicantForMyPage";
import {
	type InvalidUpdateApplicantForMyPageInputError,
	validateUpdateApplicantForMyPageInput,
} from "@/domain/core/Applicant/services/validateUpdateEmployeeForMyPageInput";
import { createStorageRepository } from "@/infrastructure/external/Storage/StorageRepository";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateUpdateApplicantForMyPageUseCaseParams } from "./validateUpdateApplicantForMyPageUseCaseParams";

export type UpdateApplicantUseCaseResult = Result<undefined, undefined>;

const storageRepository = createStorageRepository({
	bucketName: process.env.AWS_BUCKET_NAME || "",
});

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

		// S3に画像をアップロードし、画像URLを更新する
		if (validatedParams.imageBase64) {
			const imageUrl = await storageRepository.saveImage({
				userId: validatedParams.userId,
				imageData: validatedParams.imageBase64,
			});
			applicant.changeImageUrl(`${process.env.CLOUDFRONT_URL}/${imageUrl}`);
		}

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
