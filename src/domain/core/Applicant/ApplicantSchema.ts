import { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { z } from "zod";
/**
 * Applicant関連のバリデーションスキーマ
 */

// 必須
export const nameSchema = z
	.string()
	.min(1, { message: "名前は1文字以上である必要があります" })
	.max(100, { message: "名前は100文字以下である必要があります" });
export const userIdSchema = z.string().length(25, {
	message: "無効なユーザーIdです。ユーザーIDは25文字である必要があります",
});
export const applicantIdSchema = z
	.string()
	.length(25, { message: "IDは25文字である必要があります" });

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
export const selfIntroductionSchema = z
	.string()
	.max(1000, { message: "自己紹介は1000文字以下である必要があります" })
	.optional();
export const selfCompanySchema = z
	.string()
	.max(100, { message: "企業名は100文字以下である必要があります" })
	.optional();
export const selfWorkHistorySchema = z
	.string()
	.max(1000, { message: "職務経歴は1000文字以下である必要があります" })
	.optional();
export const selfEducationSchema = z
	.string()
	.max(1000, { message: "学歴は1000文字以下である必要があります" })
	.optional();

export const applicantParamsSchema = z.object({
	id: applicantIdSchema,
	name: nameSchema,
	imageUrl: imageUrlSchema,
	userId: userIdSchema,
	occupationId: occupationIdSchema,
	gender: genderSchema,
	joiningDate: joiningDateSchema,
	status: statusSchema,
	birthday: birthdaySchema,
	selfIntroduction: selfIntroductionSchema,
});
