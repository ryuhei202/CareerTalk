import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import * as z from "zod";
export const updateEmployeeSchema = z.object({
	occupation: z.string().trim().min(1, {
		message: "職種は必須です",
	}),
	workLocation: z.string().trim().optional(),
	hiringType: z.nativeEnum(HiringTypeEnum).optional(),
	selfIntroduction: z.string().trim().optional(),
	talkableTopics: z.string().trim().optional(),
	meetingMethod: z.nativeEnum(MeetingMethodEnum).nullable(),
	careerDescription: z.string().optional(),
	jobDescription: z.string().optional(),
	joiningDescription: z.string().optional(),
	otherDescription: z.string().optional(),
});
