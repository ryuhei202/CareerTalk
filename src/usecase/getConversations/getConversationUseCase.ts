import "server-only";
import type { ConversationDomainError } from "@/domain/core/Conversation/Conversation";
import {
	type GetConversationsError,
	getConversations,
} from "@/domain/core/Conversation/services/getConversations";
import { validateGetConversationsInput } from "@/domain/core/Conversation/services/validateGetConversationsInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateGetConversationUseCaseParams } from "./validateGetConversationUseCaseParams";

export type GetConversationUseCaseParams = {
	userId: string;
};

export type MatchedConversation = {
	id: string;
	PartnerUserId: string;
	PartnerName: string;
	PartnerImageURL: string;
	lastMessage: string | undefined;
	lastMessageAt: Date;
	hasUnreadMessage: boolean;
};

export type GetConversationsUseCaseResponse = MatchedConversation[];

type GetConversationUseCaseResult = Result<
	GetConversationsUseCaseResponse,
	undefined
>;

export const getConversationUseCase = async (
	params: GetConversationUseCaseParams,
): Promise<GetConversationUseCaseResult> => {
	try {
		const validatedParams = validateGetConversationUseCaseParams(params);
		const validatedResult =
			await validateGetConversationsInput(validatedParams);
		const conversations = await getConversations(validatedResult);

		return createSuccess({
			message: "チャットの取得に成功しました",
			data: conversations,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as GetConversationsError | ConversationDomainError)
				.message,
			data: undefined,
		});
	}
};
