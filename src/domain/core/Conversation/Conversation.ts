import {
	conversationParamsSchema,
	conversationStatusSchema,
} from "./ConversationParamsSchema";
import type { ConversationStatusEnum } from "./ConversationStatus";
import type { Message } from "./Message/Message";
import { messageParamsSchema } from "./Message/MessageSchema";

export type ConversationParams = {
	id: string;
	applicantUserId: string;
	employeeUserId: string;
	purposeId: number;
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
		private readonly _purposeId: number,
		private _status: ConversationStatusEnum,
		private readonly _messages: Message[], // Messageエンティティ
	) {}

	static create(params: ConversationParams): Conversation {
		Conversation.validate(params);
		return new Conversation(
			params.id,
			params.applicantUserId,
			params.employeeUserId,
			params.purposeId,
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

	get id(): string {
		return this._id;
	}

	get applicantUserId(): string {
		return this._applicantUserId;
	}

	get employeeUserId(): string {
		return this._employeeUserId;
	}

	get purposeId(): number {
		return this._purposeId;
	}

	get status(): ConversationStatusEnum {
		return this._status;
	}

	get messages(): Message[] {
		return [...this._messages];
	}
}
