import type { HandleDMRequestParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/_actions/handleDMRequestAction";
import { prisma } from "@/lib/prisma";
import { NamedError } from "@/util/error";
import { Conversation } from "../Conversation";
import {
	type ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../ConversationEnum";
import { Message } from "../Message/Message";
export class InvalidHandleDMRequestInputError extends NamedError {
	readonly name = "InvalidHandleDMRequestInputError";
}
export const validateHandleDMRequestInput = async (
	params: HandleDMRequestParams,
): Promise<Conversation> => {
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
				status: ConversationStatusEnum.PENDING,
			},
			include: {
				messages: true,
			},
		}),
	]);

	if (!applicant) {
		throw new InvalidHandleDMRequestInputError("ログインしてください");
	}

	if (!employee) {
		throw new InvalidHandleDMRequestInputError("該当の社員が存在しません。");
	}

	if (!conversation) {
		throw new InvalidHandleDMRequestInputError("DMリクエストが存在しません。");
	}

	// 存在するMessageの作成
	let messages: Message[] | undefined;
	if (conversation.messages.length > 0) {
		messages = conversation.messages.map((message) =>
			Message.create({
				id: message.id,
				conversationId: message.conversationId,
				senderId: message.senderId,
				content: message.content,
				isRead: message.isRead,
			}),
		);
	}

	// 会話の作成
	const conversationEntity = Conversation.create({
		id: conversation.id,
		applicantUserId: conversation.applicantUserId,
		employeeUserId: conversation.employeeUserId,
		purpose: conversation.purpose as ConversationPurposeEnum,
		status: conversation.status as ConversationStatusEnum,
		messages: messages ?? [],
	});

	// DMリクエストの承認・拒否のステータス更新
	const newStatus = params.isApprove
		? ConversationStatusEnum.APPROVED
		: ConversationStatusEnum.REJECTED;

	conversationEntity.changeStatus(newStatus);

	return conversationEntity;
};
