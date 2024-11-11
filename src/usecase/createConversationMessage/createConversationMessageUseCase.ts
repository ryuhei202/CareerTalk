import {
	type CreateConversationMessageError,
	createConversationMessage,
} from "@/domain/core/Conversation/Message/services/createConversationMessage";
import { validateCreateConversationMessageUseCaseParams } from "./validateCreateConversationMessageUseCaseParams";
import "server-only";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import type { ConversationMessage } from "../getConversationMessages/getConversationMessagesUseCase";
export interface CreateConversationMessageUseCaseParams {
	conversationId: string;
	senderId: string;
	content: string;
}

type CreateConversationMessageUseCaseResult = Result<
	ConversationMessage,
	undefined
>;

export const createConversationMessageUseCase = async (
	params: CreateConversationMessageUseCaseParams,
): Promise<CreateConversationMessageUseCaseResult> => {
	try {
		const validatedParams =
			validateCreateConversationMessageUseCaseParams(params);
		const createdMessage = await createConversationMessage(validatedParams);

		if (createdMessage == null) {
			return createFailure({
				message: "メッセージの作成に失敗しました",
				data: undefined,
			});
		}

		return createSuccess({
			message: "メッセージの作成に成功しました",
			data: createdMessage,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as CreateConversationMessageError).message,
			data: undefined,
		});
	}
};
