import { NamedError } from "@/util/error";
import {
	ConversationPurposeEnum,
	type ConversationPurposeLabel,
	type ConversationStatusEnum,
} from "./ConversationEnum";
import {
	conversationParamsSchema,
	conversationStatusSchema,
} from "./ConversationParamsSchema";
import type { Message } from "./Message/Message";
import { messageParamsSchema } from "./Message/MessageSchema";

export class ConversationDomainError extends NamedError {
	readonly name = "ConversationDomainError";
}

export type ConversationParams = {
	id: string;
	applicantUserId: string;
	employeeUserId: string;
	purpose: ConversationPurposeEnum;
	status: ConversationStatusEnum;
	messages: Message[];
};

/**
 * Conversationエンティティ
 */
export class Conversation {
	private constructor(
		private readonly _id: string,
		private readonly _applicantUserId: string,
		private readonly _employeeUserId: string,
		private readonly _purpose: ConversationPurposeEnum,
		private _status: ConversationStatusEnum,
		private readonly _messages: Message[], // Messageエンティティ
	) {}

	static create(params: ConversationParams): Conversation {
		Conversation.validate(params);
		return new Conversation(
			params.id,
			params.applicantUserId,
			params.employeeUserId,
			params.purpose,
			params.status,
			params.messages,
		);
	}

	private static validate(params: ConversationParams): void {
		conversationParamsSchema.parse(params);
	}

	changeStatus(newStatus: ConversationStatusEnum): void {
		conversationStatusSchema.parse(newStatus);
		this._status = newStatus;
	}

	addMessage(newMessage: Message): void {
		messageParamsSchema.parse(newMessage);
		this._messages.push(newMessage);
	}

	getLatestMessage(): Message | undefined {
		return this._messages[this._messages.length - 1];
	}

	toPurposeLabel(): ConversationPurposeLabel {
		switch (this._purpose) {
			case ConversationPurposeEnum.INTERESTED_IN_RECRUITMENT:
				return "募集内容に興味がある";
			case ConversationPurposeEnum.INTERESTED_IN_PERSON:
				return "募集している人に興味がある";
			case ConversationPurposeEnum.INTERESTED_IN_COMPANY:
				return "募集している会社・部署に興味がある";
			case ConversationPurposeEnum.OTHER:
				return "その他（他に話したい事がある）";
			default:
				throw new ConversationDomainError("無効な目的です");
		}
	}

	get id(): string {
		return this._id;
	}

	get applicantUserId(): string {
		return this._applicantUserId;
	}

	get employeeUserId(): string {
		return this._employeeUserId;
	}

	get purpose(): ConversationPurposeEnum {
		return this._purpose;
	}

	get status(): ConversationStatusEnum {
		return this._status;
	}

	get messages(): Message[] {
		return [...this._messages];
	}
}
