import { isReadSchema, messageParamsSchema } from "./MessageSchema";

/**
 * Messageのパラメータ
 */
export type MessageParams = {
	id: string;
	conversationId: string;
	senderId: string;
	content: string;
	isRead: boolean;
	createdAt: Date;
};

/**
 * Messageエンティティ
 */
export class Message {
	private constructor(
		private readonly _id: string,
		private readonly _conversationId: string,
		private readonly _senderId: string,
		private readonly _content: string,
		private _isRead: boolean,
		private readonly _createdAt: Date,
	) {}

	static create(params: MessageParams): Message {
		Message.validate(params);
		return new Message(
			params.id,
			params.conversationId,
			params.senderId,
			params.content,
			params.isRead,
			params.createdAt,
		);
	}

	private static validate(params: MessageParams): void {
		messageParamsSchema.parse(params);
	}

	changeIsRead(newIsRead: boolean): void {
		isReadSchema.parse(newIsRead);
		this._isRead = newIsRead;
	}

	get id(): string {
		return this._id;
	}

	get conversationId(): string {
		return this._conversationId;
	}

	get senderId(): string {
		return this._senderId;
	}

	get content(): string {
		return this._content;
	}

	get isRead(): boolean {
		return this._isRead;
	}

	get createdAt(): Date {
		return this._createdAt;
	}
}
