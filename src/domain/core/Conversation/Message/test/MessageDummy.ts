import { Message, type MessageParams } from "../Message";

/**
 * Messageのダミーデータ
 */
const messageId = "messageId0000000000000000";
const conversationId = "conversationId00000000000";
const senderId = "employeeId000000000000000";
const content = "テストメッセージ";
const isRead = false;

export const messageDummyParams: MessageParams = {
	id: messageId,
	conversationId: conversationId,
	senderId: senderId,
	content: content,
	isRead: isRead,
};

export const messageDummy = Message.create(messageDummyParams);

export const messageDummy2 = Message.create({
	id: "messageId0000000000000001",
	conversationId: conversationId,
	senderId: senderId,
	content: "テストメッセージ2",
	isRead: isRead,
});
