import * as z from "zod";
export const updateApplicantForMyPageSchema = z.object({
	occupation: z.string().trim().min(1, {
		message: "職種は必須です",
	}),
	selfIntroduction: z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	workHistory: z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	education: z
		.string()
		.trim()
		.max(1000, {
			message: "1000文字以内で入力してください",
		})
		.optional(),
	company: z
		.string()
		.trim()
		.max(100, {
			message: "100文字以内で入力してください",
		})
		.optional(),
	joiningDate: z
		.string()
		.refine(
			(date) => {
				const selectedDate = new Date(date);
				const today = new Date();
				return selectedDate <= today;
			},
			{
				message: "社会人になった月は今日以前の日付を選択してください",
			},
		)
		.optional(),
	imageBase64: z.string().optional(),
});
