import type { SendDMRequestParams } from "@/app/(site)/applicant/detail/[employeeUserId]/actions/sendDMRequestAction";
import { z } from "zod";

export const validateSendDMRequestParams = (
	params: SendDMRequestParams,
): SendDMRequestParams => {
	// スキーマ定義
	const applicantUserIdSchema = z.string().trim().length(25, {
		message: "無効な応募者IDです。応募者IDは25文字である必要があります",
	});
	const employeeUserIdSchema = z.string().trim().length(25, {
		message: "無効な社員IDです。社員IDは25文字である必要があります",
	});
	const conversationPurposeIdSchema = z.number().int().positive({
		message: "無効な会話目的IDです。会話目的IDは正の整数である必要があります",
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
		conversationPurposeId: conversationPurposeIdSchema,
		message: messageSchema,
	});

	return paramsSchema.parse(params);
};
