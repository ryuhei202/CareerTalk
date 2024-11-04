import { prisma } from "@/lib/prisma";
import type { GetConversationUseCaseParams } from "@/usecase/getConversations/getConversationUseCase";
import { NamedError } from "@/util/error";
import type {
	Applicant,
	Conversation,
	Employee,
	Message,
	User,
} from "@prisma/client";
import { ConversationStatusEnum } from "../ConversationEnum";

export type ValidatedResult = {
	user: User;
	conversations: (Conversation & {
		messages: Message[];
		employee: Employee & { user: User };
		applicant: Applicant & { user: User };
	})[];
};

export class ValidateGetConversationsInputError extends NamedError {
	name = "ValidateGetConversationsInputError";
}

export const validateGetConversationsInput = async (
	params: GetConversationUseCaseParams,
): Promise<ValidatedResult> => {
	const userId = params.userId;

	const [user, conversations] = await Promise.all([
		prisma.user.findUnique({
			where: {
				id: userId,
			},
		}),
		prisma.conversation.findMany({
			where: {
				OR: [{ applicantUserId: userId }, { employeeUserId: userId }],
				status: ConversationStatusEnum.APPROVED,
			},
			include: {
				employee: {
					include: {
						user: true,
					},
				},
				applicant: {
					include: {
						user: true,
					},
				},
				messages: true,
			},
		}),
	]);

	if (!user) {
		throw new ValidateGetConversationsInputError(
			"ユーザーが見つかりません。再度ログインしてください",
		);
	}

	if (conversations == null) {
		throw new ValidateGetConversationsInputError(
			"チャットの取得に失敗しました",
		);
	}

	return { user, conversations };
};
