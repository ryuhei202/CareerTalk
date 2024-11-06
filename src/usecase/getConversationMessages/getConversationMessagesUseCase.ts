import {
	type GetConversationMessagesError,
	getConversationMessages,
} from "@/domain/core/Conversation/Message/services/getConversationMessages";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateGetConversationMessagesUseCaseParams } from "./validateGetConversationMessagesUseCaseParams";

export interface GetConversationMessagesUseCaseParams {
	conversationId: string;
}

export type ConversationMessage = {
	id: string;
	content: string;
	senderId: string;
	isRead: boolean;
	createdAt: Date;
};

export type GetConversationMessagesUseCaseResponse = ConversationMessage[];

export const getConversationMessagesUseCase = async (
	params: GetConversationMessagesUseCaseParams,
): Promise<Result<GetConversationMessagesUseCaseResponse, undefined>> => {
	try {
		console.log("params", params);
		const validatedParams =
			validateGetConversationMessagesUseCaseParams(params);
		const messages = await getConversationMessages(validatedParams);

		if (messages === null) {
			return createFailure({
				message: "チャットの取得に失敗しました",
				data: messages,
			});
		}

		return createSuccess({
			message: "チャットの取得に成功しました",
			data: messages,
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
