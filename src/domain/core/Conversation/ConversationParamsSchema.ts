import { z } from "zod";
import { userIdSchema } from "../Applicant/ApplicantSchema";
import {
	ConversationPurposeEnum,
	ConversationStatusEnum,
} from "./ConversationEnum";
import { Message } from "./Message/Message";

/**
 * Conversation関連のバリデーションスキーマ
 */
export const conversationIdSchema = z.string().trim().length(25, {
	message: "無効な会話Idです。会話IDは25文字である必要があります",
});

export const applicantUserIdSchema = z.string().trim().length(25, {
	message: "無効な転職希望者Idです。転職希望者IDは25文字である必要があります",
});

export const purposeSchema = z.nativeEnum(ConversationPurposeEnum);
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
	applicantUserId: userIdSchema,
	employeeUserId: userIdSchema,
	purpose: purposeSchema,
	status: conversationStatusSchema,
	messages: messagesSchema,
});
