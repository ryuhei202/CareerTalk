import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import * as z from "zod";
export const updateEmployeeSchema = z.object({
	occupation: z.string().trim().min(1, {
		message: "職種は必須です",
	}),
	workLocation: z
		.string()
		.trim()
		.min(1, {
			message: "勤務地を入力してください",
		})
		.optional(),
	hiringType: z
		.nativeEnum(HiringTypeEnum, {
			errorMap: () => ({
				message: "雇用形態を選択してください",
			}),
		})
		.optional(),
	selfIntroduction: z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	talkableTopics: z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	meetingMethod: z
		.nativeEnum(MeetingMethodEnum, {
			errorMap: () => ({
				message: "面談方法を選択してください",
			}),
		})
		.nullable(),
	careerDescription: z
		.string()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	jobDescription: z
		.string()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	joiningDescription: z
		.string()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	otherDescription: z
		.string()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	barkerMessage: z
		.string()
		.max(50, {
			message: "50文字以内で入力してください",
		})
		.optional(),
});
