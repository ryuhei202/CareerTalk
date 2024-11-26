import { GenderEnum } from "@/domain/shared/Gender";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { z } from "zod";

/**
 * Employee関連のバリデーションスキーマ
 */
export const employeeIdSchema = z.string().trim().length(25, {
	message: "無効な従業員Idです。従業員IDは25文字である必要があります",
});
export const nameSchema = z
	.string()
	.trim()
	.min(1, { message: "名前は1文字以上である必要があります" })
	.max(100, { message: "名前は100文字以下である必要があります" });
export const userIdSchema = z.string().trim().length(25, {
	message: "無効なユーザーIdです。ユーザーIDは25文字である必要があります",
});

export const companyIdSchema = z
	.number()
	.min(1, { message: "不正な企業Idです" });
export const occupationIdSchema = z
	.number()
	.min(1, { message: "不正な職種Idです" });
export const genderSchema = z.nativeEnum(GenderEnum, {
	message: "無効な性別です",
});
export const joiningDateSchema = z.date().refine(
	(date) => {
		const now = new Date();
		return date <= now;
	},
	{ message: "無効な入社日です" },
);
export const statusSchema = z.nativeEnum(StatusEnum);

// 以下必須ではない項目
export const imageUrlSchema = z
	.string()
	.trim()
	.url({ message: "無効な画像URLです" })
	.optional();
export const birthdaySchema = z
	.date()
	.refine(
		(date) => {
			const now = new Date();
			const minDate = new Date(
				now.getFullYear() - 100,
				now.getMonth(),
				now.getDate(),
			);
			return date <= now && date >= minDate;
		},
		{ message: "無効な生年月日です" },
	)
	.optional();
export const workLocationIdSchema = z
	.number()
	.min(1, { message: "不正な勤務地Idです" })
	.optional();

export const hiringTypeSchema = z
	.nativeEnum(HiringTypeEnum, { message: "無効な入社方法です" })
	.optional();
export const meetingMethodSchema = z
	.nativeEnum(MeetingMethodEnum, { message: "無効な訪問方法です" })
	.optional();
export const talkableTopicsSchema = z
	.string()
	.trim()
	.max(1000, { message: "話せることは1000文字以下である必要があります" })
	.optional();
export const careerDescriptionSchema = z
	.string()
	.trim()
	.max(1000, { message: "経歴は1000文字以下である必要があります" })
	.optional();
export const jobDescriptionSchema = z
	.string()
	.trim()
	.max(1000, { message: "職務内容は1000文字以下である必要があります" })
	.optional();
export const joiningDescriptionSchema = z
	.string()
	.trim()
	.max(1000, { message: "入社説明は1000文字以下である必要があります" })
	.optional();
export const otherDescriptionSchema = z
	.string()
	.trim()
	.max(1000, { message: "その他は1000文字以下である必要があります" })
	.optional();
export const barkerMessageSchema = z
	.string()
	.trim()
	.max(50, { message: "呼び込みメッセージは50文字以下である必要があります" })
	.optional();

export const employeeParamsSchema = z.object({
	id: employeeIdSchema,
	name: nameSchema,
	imageUrl: imageUrlSchema,
	userId: userIdSchema,
	companyId: companyIdSchema,
	occupationId: occupationIdSchema,
	gender: genderSchema,
	joiningDate: joiningDateSchema,
	status: statusSchema,
	birthday: birthdaySchema,
	workLocationId: workLocationIdSchema,
	hiringType: hiringTypeSchema,
	meetingMethod: meetingMethodSchema,
	talkableTopics: talkableTopicsSchema,
	careerDescription: careerDescriptionSchema,
	jobDescription: jobDescriptionSchema,
	joiningDescription: joiningDescriptionSchema,
	otherDescription: otherDescriptionSchema,
	barkerMessage: barkerMessageSchema,
});
