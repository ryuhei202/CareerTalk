import { z } from "zod";
import { userIdSchema } from "../../Applicant/ApplicantSchema";

/**
 * Message関連のバリデーションスキーマ
 */
export const messageIdSchema = z.string().trim().length(25, {
	message: "無効なメッセージIdです。メッセージIDは25文字である必要があります",
});
export const conversationIdSchema = z.string().trim().length(25, {
	message: "無効な会話Idです。会話IDは25文字である必要があります",
});

export const contentSchema = z
	.string()
	.trim()
	.min(1, {
		message: "メッセージは1文字以上である必要があります",
	})
	.max(1000, {
		message: "メッセージは1000文字以下である必要があります",
	});

export const createdAtSchema = z.date();
export const isReadSchema = z.boolean();

export const messageParamsSchema = z.object({
	id: messageIdSchema,
	conversationId: conversationIdSchema,
	senderId: userIdSchema,
	content: contentSchema,
	isRead: isReadSchema,
	createdAt: createdAtSchema,
});
