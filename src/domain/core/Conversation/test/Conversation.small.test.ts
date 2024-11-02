import { describe, expect, test } from "vitest";
import { ZodError } from "zod";
import { Conversation } from "../Conversation";
import {
	ConversationPurposeEnum,
	ConversationStatusEnum,
} from "../ConversationEnum";
import type { Message } from "../Message/Message";
import { messageDummy, messageDummy2 } from "../Message/test/MessageDummy";
import { conversationDummyParams } from "./Conversation.dummy";

describe("Conversation", () => {
	test("Conversationを生成する", () => {
		const conversation = Conversation.create(conversationDummyParams);

		expect(conversation.id).toBe(conversationDummyParams.id);
		expect(conversation.applicantUserId).toBe(
			conversationDummyParams.applicantUserId,
		);
		expect(conversation.employeeUserId).toBe(
			conversationDummyParams.employeeUserId,
		);
		expect(conversation.purpose).toBe(conversationDummyParams.purpose);
		expect(conversation.status).toBe(conversationDummyParams.status);
		expect(conversation.messages).toEqual(conversationDummyParams.messages);
	});

	test("不正な値でConversationを生成しようとするとエラーが発生する", () => {
		expect(() =>
			Conversation.create({ ...conversationDummyParams, id: "" }),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({
				...conversationDummyParams,
				applicantUserId: "",
			}),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({
				...conversationDummyParams,
				employeeUserId: "",
			}),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({
				...conversationDummyParams,
				purpose: "invalid" as ConversationPurposeEnum,
			}),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({
				...conversationDummyParams,
				status: "invalid" as ConversationStatusEnum,
			}),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({
				...conversationDummyParams,
				messages: ["test" as unknown as Message],
			}),
		).toThrowError(ZodError);
	});

	describe("changeStatus", () => {
		test("承認待ち→承認済み", () => {
			const conversation = Conversation.create({
				...conversationDummyParams,
				status: ConversationStatusEnum.PENDING,
			});

			expect(conversation.status).toBe(ConversationStatusEnum.PENDING);
			conversation.changeStatus(ConversationStatusEnum.APPROVED);
			expect(conversation.status).toBe(ConversationStatusEnum.APPROVED);
		});

		test("承認待ち→拒否", () => {
			const conversation = Conversation.create({
				...conversationDummyParams,
				status: ConversationStatusEnum.PENDING,
			});

			expect(conversation.status).toBe(ConversationStatusEnum.PENDING);
			conversation.changeStatus(ConversationStatusEnum.REJECTED);
			expect(conversation.status).toBe(ConversationStatusEnum.REJECTED);
		});

		test("承認済み→拒否", () => {
			const conversation = Conversation.create({
				...conversationDummyParams,
				status: ConversationStatusEnum.APPROVED,
			});

			expect(conversation.status).toBe(ConversationStatusEnum.APPROVED);
			conversation.changeStatus(ConversationStatusEnum.REJECTED);
			expect(conversation.status).toBe(ConversationStatusEnum.REJECTED);
		});
	});

	describe("addMessage", () => {
		test("メッセージを追加する", () => {
			const conversation = Conversation.create(conversationDummyParams);
			expect(conversation.messages.length).toBe(1);
			conversation.addMessage(messageDummy2);
			expect(conversation.messages.length).toBe(2);
			expect(conversation.messages[1].id).toBe(messageDummy2.id);
			expect(conversation.messages[1].content).toBe(messageDummy2.content);
		});
	});

	describe("getLatestMessage", () => {
		test("最新メッセージを取得する", () => {
			const params = {
				...conversationDummyParams,
				messages: [messageDummy],
			};
			const conversation = Conversation.create(params);
			expect(conversation.messages.length).toBe(1);
			expect(conversation.getLatestMessage()).toEqual(params.messages[0]);
		});
	});

	describe("toPurposeLabel", () => {
		test("話してみたいと思った理由を取得できる", () => {
			const conversation = Conversation.create({
				...conversationDummyParams,
				purpose: ConversationPurposeEnum.INTERESTED_IN_RECRUITMENT,
			});
			expect(conversation.toPurposeLabel()).toBe("募集内容に興味がある");
		});
	});
});
