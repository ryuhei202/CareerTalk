import { z } from "zod";
import { conversationIdSchema } from "../Conversation/ConversationParamsSchema";

/**
 * Message関連のバリデーションスキーマ
 */
export const messageIdSchema = z.string().trim().length(25, {
	message: "無効なメッセージIdです。メッセージIDは25文字である必要があります",
});
export const senderIdSchema = z.string().trim().length(25, {
	message: "無効な送信者Idです。送信者IDは25文字である必要があります",
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
export const isReadSchema = z.boolean();

export const messageParamsSchema = z.object({
	id: messageIdSchema,
	conversationId: conversationIdSchema,
	senderId: senderIdSchema,
	content: contentSchema,
	isRead: isReadSchema,
});
