import { Conversation, type ConversationParams } from "../Conversation";
import {
	ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../ConversationEnum";
import { messageDummy } from "../Message/test/MessageDummy";

/**
 * Conversationのダミーデータ
 */
export const conversationId = "conversationId00000000000";
export const applicantUserId = "applicantUserId0000000000";
export const employeeUserId = "employeeUserId00000000000";
export const purpose = ConversationPurposeEnum.INTERESTED_IN_RECRUITMENT;
export const status = ConversationStatusEnum.PENDING;
export const messages = [messageDummy];

export const conversationDummyParams: ConversationParams = {
	id: conversationId,
	applicantUserId: applicantUserId,
	employeeUserId: employeeUserId,
	purpose: purpose,
	status: status,
	messages: messages,
};

export const conversationDummy = Conversation.create(conversationDummyParams);
