import type { SendDMRequestParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/actions/sendDMRequestAction";
import { ConversationPurposeEnum } from "@/domain/core/Conversation/ConversationEnum";
import { z } from "zod";

export const validateSendDMRequestParams = (
	params: SendDMRequestParams,
): SendDMRequestParams => {
	// スキーマ定義
	const applicantUserIdSchema = z.string().trim().length(25, {
		message: "無効な応募者IDです。転職希望者のIDは25文字である必要があります",
	});
	const employeeUserIdSchema = z.string().trim().length(25, {
		message: "無効な社員IDです。社員IDは25文字である必要があります",
	});
	const conversationPurposeSchema = z.nativeEnum(ConversationPurposeEnum, {
		message: "無効な会話目的です。",
	});
	const messageSchema = z
		.string()
		.trim()
		.min(1, {
			message: "メッセージは1文字以上である必要があります",
		})
		.max(1000, {
			message: "メッセージは1000文字以下である必要があります",
		})
		.optional();

	// パラメータスキーマ
	const paramsSchema = z.object({
		applicantUserId: applicantUserIdSchema,
		employeeUserId: employeeUserIdSchema,
		conversationPurpose: conversationPurposeSchema,
		message: messageSchema,
	});

	return paramsSchema.parse(params);
};
