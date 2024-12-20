import type { RegisterApplicantParams } from "@/app/(site)/applicant/create_profile/_actions/registerApplicantAction";
import { GenderEnum } from "@/domain/shared/Gender";
import { z } from "zod";
export const validateRegisterApplicantUseCaseParams = (
	params: RegisterApplicantParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const nameSchema = z.string().trim().min(1).max(100);
	const occupationIdSchema = z.number().int().positive();
	const genderSchema = z.nativeEnum(GenderEnum);
	const joiningDateSchema = z.date();
	const birthdaySchema = z.date();
	const selfIntroductionSchema = z.string().trim().optional();
	const companySchema = z.string().trim().optional();
	const workHistorySchema = z.string().trim().optional();
	const educationSchema = z.string().trim().optional();
	const imageBase64Schema = z.string().trim().optional();

	const paramsSchema = z.object({
		userId: userIdSchema,
		name: nameSchema,
		occupationId: occupationIdSchema,
		gender: genderSchema,
		joiningDate: joiningDateSchema,
		birthday: birthdaySchema,
		selfIntroduction: selfIntroductionSchema,
		company: companySchema,
		workHistory: workHistorySchema,
		education: educationSchema,
		imageBase64: imageBase64Schema,
	});

	return paramsSchema.parse(params);
};
