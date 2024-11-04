import { type Result, createFailure, createSuccess } from "@/util/result";
import "server-only";
import { getConversations } from "@/domain/core/Conversation/services/getConversations";
import { getZodErrorMessages } from "@/util/error";
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
	lastMessage: string;
	lastMessageAt: Date;
	unreadMessageCount: number;
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
		const conversations = await getConversations(validatedParams);

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
			message: "チャットの取得に失敗しました",
			data: undefined,
		});
	}
};
