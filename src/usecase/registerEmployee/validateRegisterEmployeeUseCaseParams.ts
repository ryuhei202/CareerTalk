import { GenderEnum } from "@/domain/shared/Gender";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { z } from "zod";
import type { RegisterEmployeeParams } from "../../app/(site)/employee/create_profile/_actions/registerEmployeeAction";

export const validateRegisterEmployeeUseCaseParams = (
	params: RegisterEmployeeParams,
) => {
	// スキーマ定義
	const userIdSchema = z.string().trim().length(25);
	const nameSchema = z.string().trim().min(1).max(100);
	const companyCodeSchema = z.string().trim().length(8);
	const occupationIdSchema = z.number().int().positive();
	const genderSchema = z.nativeEnum(GenderEnum);
	const joiningDateSchema = z.date();
	const workLocationIdSchema = z.number().int().positive().optional();
	const hiringTypeSchema = z.nativeEnum(HiringTypeEnum).optional();
	const meetingMethodSchema = z.nativeEnum(MeetingMethodEnum).optional();
	const talkableTopicsSchema = z.string().trim().optional();
	const imageIdSchema = z.number().int().positive();

	const paramsSchema = z.object({
		userId: userIdSchema,
		name: nameSchema,
		companyCode: companyCodeSchema,
		occupationId: occupationIdSchema,
		gender: genderSchema,
		joiningDate: joiningDateSchema,
		workLocationId: workLocationIdSchema,
		hiringType: hiringTypeSchema,
		meetingMethod: meetingMethodSchema,
		talkableTopics: talkableTopicsSchema,
		imageId: imageIdSchema,
	});

	return paramsSchema.parse(params);
};
