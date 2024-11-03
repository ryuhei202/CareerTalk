import type { Conversation } from "@/domain/core/Conversation/Conversation";
import { prisma } from "@/lib/prisma";
import type { HandleDMRequestUseCaseResponse } from "./handleDMRequestUseCase";
import { HandledConversationDTO } from "./handledConversationDTO";

export const handleDMRequest = async (
	conversation: Conversation,
): Promise<HandleDMRequestUseCaseResponse> => {
	const updatedConversation = await prisma.$transaction(async (tx) => {
		return await tx.conversation.update({
			where: { id: conversation.id },
			data: { status: conversation.status },
		});
	});

	// ここをDTOに変換するようにする(statusを返したいから)
	const handledConversationDTO = new HandledConversationDTO(
		updatedConversation,
	);
	return handledConversationDTO.toJson();
};
