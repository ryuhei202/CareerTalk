import { GenderEnum } from "@/domain/shared/Gender";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { StatusEnum } from "@/domain/shared/Status";
import { z } from "zod";
/**
 * Employee関連のバリデーションスキーマ
 */

// 必須
export const nameSchema = z
	.string()
	.min(1, { message: "名前は1文字以上である必要があります" })
	.max(100, { message: "名前は100文字以下である必要があります" });
export const userIdSchema = z.string().length(25, {
	message: "無効なユーザーIdです。ユーザーIDは25文字である必要があります",
});
export const employeeIdSchema = z
	.string()
	.length(25, { message: "IDは25文字である必要があります" });

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
export const selfIntroductionSchema = z
	.string()
	.max(1000, { message: "自己紹介は1000文字以下である必要があります" })
	.optional();
export const talkableTopicsSchema = z
	.string()
	.max(1000, { message: "話せる内容は1000文字以下である必要があります" })
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
	selfIntroduction: selfIntroductionSchema,
	talkableTopics: talkableTopicsSchema,
});
