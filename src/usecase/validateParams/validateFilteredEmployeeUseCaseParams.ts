import type { SearchEmployeeParams } from "@/app/(site)/applicant/search_employees/page";
import { applicantUserIdSchema } from "@/domain/core/Conversation/ConversationParamsSchema";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { z } from "zod";

export const validateFilteredEmployeeUseCaseParams = (
	params: SearchEmployeeParams,
) => {
	// スキーマ定義
	const pageSchema = z.number().int().min(1);
	const companyIdSchema = z.number().int().positive().optional();
	const occupationIdSchema = z.number().int().positive().optional();
	const yearsOfExperienceSchema = z
		.object({
			min: z.number().int(),
			max: z.number().int(),
		})
		.optional();
	const hiringTypeSchema = z.nativeEnum(HiringTypeEnum).optional();
	const meetingMethodSchema = z.nativeEnum(MeetingMethodEnum).optional();

	// パラメータスキーマ
	const paramsSchema = z.object({
		page: pageSchema,
		filter: z.object({
			companyId: companyIdSchema,
			occupationId: occupationIdSchema,
			yearsOfExperience: yearsOfExperienceSchema,
			hiringType: hiringTypeSchema,
			meetingMethod: meetingMethodSchema,
		}),
		applicantUserId: applicantUserIdSchema,
	});

	// バリデーション実行
	return paramsSchema.parse(params);
};
