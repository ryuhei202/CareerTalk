import {
	type GetConversationMessagesError,
	getConversationMessages,
} from "@/domain/core/Conversation/Message/services/getConversationMessages";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateGetConversationMessagesUseCaseParams } from "./validateGetConversationMessagesUseCaseParams";
import "server-only";
export interface GetConversationMessagesUseCaseParams {
	userId: string;
	partnerUserId: string;
}

export interface ConversationMessage {
	id: string;
	content: string;
	senderId: string;
	isRead: boolean;
	createdAt: Date;
}

export interface PartnerUser {
	id: string;
	name: string;
	image: string;
}

export type GetConversationMessagesUseCaseResponse = {
	conversationId: string;
	partnerUser: PartnerUser;
	messages: ConversationMessage[];
};

export const getConversationMessagesUseCase = async (
	params: GetConversationMessagesUseCaseParams,
): Promise<Result<GetConversationMessagesUseCaseResponse, undefined>> => {
	try {
		const validatedParams =
			validateGetConversationMessagesUseCaseParams(params);
		const result = await getConversationMessages(validatedParams);

		if (result === null) {
			return createFailure({
				message: "チャットの取得に失敗しました",
				data: undefined,
			});
		}

		return createSuccess({
			message: "チャットの取得に成功しました",
			data: result,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as GetConversationMessagesError).message,
			data: undefined,
		});
	}
};
