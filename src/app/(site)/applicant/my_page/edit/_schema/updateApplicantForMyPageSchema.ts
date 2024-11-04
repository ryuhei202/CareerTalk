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
});
