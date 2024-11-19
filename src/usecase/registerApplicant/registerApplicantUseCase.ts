import "server-only";

import type { RegisterApplicantParams } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import { createApplicant } from "@/domain/core/Applicant/services/createApplicant";
import {
	type InvalidRegisterApplicantInputError,
	validateRegisterApplicantInput,
} from "@/domain/core/Applicant/services/validateRegisterApplicantInput";
import { createStorageRepository } from "@/infrastructure/external/Storage/StorageRepository";
import { type Result, createFailure, createSuccess } from "@/util/result";
import type { ZodError } from "zod";
import { validateRegisterApplicantUseCaseParams } from "./validateRegisterApplicantUseCaseParams";

type RegisterApplicantUseCaseResult = Result<undefined, undefined>;

export type RegisterApplicantUseCase = (
	params: RegisterApplicantParams,
) => Promise<RegisterApplicantUseCaseResult>;

const storageRepository = createStorageRepository({
	bucketName: process.env.AWS_BUCKET_NAME || "",
});

export const registerApplicantUseCase = async (
	params: RegisterApplicantParams,
): Promise<RegisterApplicantUseCaseResult> => {
	try {
		// パラメータのバリデーション
		const validatedParams = validateRegisterApplicantUseCaseParams(params);

		// ドメインサービス① 転職者登録インプットのバリデーション
		const applicant = await validateRegisterApplicantInput(validatedParams);

		// S3に画像をアップロードし、画像URLを更新する
		if (validatedParams.imageBase64) {
			const imageUrl = await storageRepository.saveImage({
				userId: validatedParams.userId,
				imageData: validatedParams.imageBase64,
			});
			applicant.changeImageUrl(`${process.env.CLOUDFRONT_URL}/${imageUrl}`);
		}

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
