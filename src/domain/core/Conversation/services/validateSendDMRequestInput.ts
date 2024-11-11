import type { SendDMRequestParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/actions/sendDMRequestAction";
import { createId } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Conversation } from "../Conversation";
import {
	ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../ConversationEnum";
import { Message } from "../Message/Message";

export class InvalidSendDMRequestInputError extends NamedError {
	readonly name = "InvalidSendDMRequestInputError";
}
export const validateSendDMRequestInput = async (
	params: SendDMRequestParams,
): Promise<Conversation> => {
	// 1つのクエリで必要なデータを取得
	const [applicant, employee, conversation] = await Promise.all([
		prisma.applicant.findUnique({
			where: { userId: params.applicantUserId },
		}),
		prisma.employee.findUnique({
			where: { userId: params.employeeUserId },
		}),
		prisma.conversation.findFirst({
			where: {
				applicant: { userId: params.applicantUserId },
				employee: { userId: params.employeeUserId },
			},
		}),
	]);

	if (!applicant) {
		throw new InvalidSendDMRequestInputError("ログインしてください");
	}
	if (!employee) {
		throw new InvalidSendDMRequestInputError("該当の社員が存在しません。");
	}
	if (conversation) {
		throw new InvalidSendDMRequestInputError("すでにいいねを送信しています");
	}

	if (
		!Object.values(ConversationPurposeEnum).includes(params.conversationPurpose)
	) {
		throw new InvalidSendDMRequestInputError("不正な選択肢です。");
	}

	// メッセージの作成
	let message: Message | undefined;
	if (params.message) {
		message = Message.create({
			id: createId(),
			conversationId: createId(),
			senderId: params.applicantUserId,
			content: params.message,
			isRead: false,
			createdAt: new Date(),
		});
	}

	// 会話の作成
	return Conversation.create({
		id: createId(),
		applicantUserId: params.applicantUserId,
		employeeUserId: params.employeeUserId,
		purpose: params.conversationPurpose,
		status: ConversationStatusEnum.PENDING,
		messages: message ? [message] : [],
	});
};
