import { messageDummy } from "../../Message/test/MessageDummy";
import { Conversation, type ConversationParams } from "../Conversation";
import { ConversationStatusEnum } from "../ConversationStatus";

/**
 * Conversationのダミーデータ
 */
export const conversationId = "conversationId00000000000";
export const applicantId = "applicantId00000000000000";
export const employeeId = "employeeId000000000000000";
export const purposeId = 1;
export const status = ConversationStatusEnum.PENDING;
export const messages = [messageDummy];

export const conversationDummyParams: ConversationParams = {
	id: conversationId,
	applicantId: applicantId,
	employeeId: employeeId,
	purposeId: purposeId,
	status: status,
	messages: messages,
};

export const conversationDummy = Conversation.create(conversationDummyParams);
