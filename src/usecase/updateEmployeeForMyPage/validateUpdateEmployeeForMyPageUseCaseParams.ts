import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { z } from "zod";
import type { UpdateEmployeeForMyPageParams } from "../../app/(site)/employee/my_page/edit/_actions/updateEmployeeForMyPageAction";

export const validateUpdateEmployeeForMyPageUseCaseParams = (
	params: UpdateEmployeeForMyPageParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const occupationIdSchema = z.number().int().positive();
	const workLocationIdSchema = z.number().int().positive().optional();
	const hiringTypeSchema = z.nativeEnum(HiringTypeEnum).optional();
	const meetingMethodSchema = z.nativeEnum(MeetingMethodEnum).optional();
	const selfIntroductionSchema = z.string().trim().optional();
	const talkableTopicsSchema = z.string().trim().optional();
	const careerDescriptionSchema = z.string().trim().optional();
	const jobDescriptionSchema = z.string().trim().optional();
	const joiningDescriptionSchema = z.string().trim().optional();
	const otherDescriptionSchema = z.string().trim().optional();

	const paramsSchema = z.object({
		userId: userIdSchema,
		occupationId: occupationIdSchema,
		workLocationId: workLocationIdSchema,
		hiringType: hiringTypeSchema,
		meetingMethod: meetingMethodSchema,
		selfIntroduction: selfIntroductionSchema,
		talkableTopics: talkableTopicsSchema,
		careerDescription: careerDescriptionSchema,
		jobDescription: jobDescriptionSchema,
		joiningDescription: joiningDescriptionSchema,
		otherDescription: otherDescriptionSchema,
	});

	return paramsSchema.parse(params);
};