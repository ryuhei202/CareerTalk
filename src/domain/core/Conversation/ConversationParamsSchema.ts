import { z } from "zod";
import { employeeIdSchema } from "../Employee/EmployeeSchema";
import { Message } from "../Message/Message";
import { ConversationStatusEnum } from "./ConversationStatus";

/**
 * Conversation関連のバリデーションスキーマ
 */
export const conversationIdSchema = z.string().trim().length(25, {
	message: "無効な会話Idです。会話IDは25文字である必要があります",
});

export const applicantIdSchema = z.string().trim().length(25, {
	message: "無効な転職希望者Idです。転職希望者IDは25文字である必要があります",
});

export const purposeIdSchema = z.number().min(1, {
	message: "不正な目的Idです",
});
export const conversationStatusSchema = z.nativeEnum(ConversationStatusEnum);
// Messageクラスのインスタンスであることを確認
export const messagesSchema = z
	.custom<Message>((data): data is Message => {
		return data instanceof Message;
	})
	.array()
	.default([]);

export const conversationParamsSchema = z.object({
	id: conversationIdSchema,
	applicantId: applicantIdSchema,
	employeeId: employeeIdSchema,
	purposeId: purposeIdSchema,
	status: conversationStatusSchema,
	messages: messagesSchema,
});
