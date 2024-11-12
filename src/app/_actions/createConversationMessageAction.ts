"use server";

import { getServerSession } from "@/lib/auth";
import { createConversationMessageUseCase } from "@/usecase/createConversationMessage/createConversationMessageUseCase";
import { revalidatePath } from "next/cache";

export interface CreateConversationMessageParams {
	conversationId: string;
	messageId: string;
	partnerUserId: string;
	content: string;
	isApplicant: boolean;
}

export const createConversationMessageAction = async (
	params: CreateConversationMessageParams,
) => {
	const session = await getServerSession();
	if (!session) {
		return {
			success: false,
			message: "Unauthorized Error",
			data: undefined,
		};
	}

	const useCaseResult = await createConversationMessageUseCase({
		conversationId: params.conversationId,
		messageId: params.messageId,
		senderId: session.user.id,
		content: params.content,
	});

	if (useCaseResult.success) {
		revalidatePath(`/${params.isApplicant ? "applicant" : "employee"}/chat`);
		revalidatePath(
			`/${params.isApplicant ? "applicant" : "employee"}/chat/@dm/${params.partnerUserId}`,
		);
	} else {
		return {
			success: false,
			message: useCaseResult.message,
			data: undefined,
		};
	}
	return useCaseResult;
};
