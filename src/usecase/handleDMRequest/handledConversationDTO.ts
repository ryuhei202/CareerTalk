import type { ConversationStatusEnum } from "@/domain/core/Conversation/ConversationEnum";
import type { Conversation } from "@prisma/client";
import type { HandleDMRequestUseCaseResponse } from "./handleDMRequestUseCase";

export class HandledConversationDTO {
	public readonly conversationStatus: ConversationStatusEnum;
	constructor(conversation: Conversation) {
		this.conversationStatus = conversation.status as ConversationStatusEnum;
	}

	toJson(): HandleDMRequestUseCaseResponse {
		return {
			conversationStatus: this.conversationStatus,
		};
	}
}
