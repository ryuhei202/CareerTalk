import { describe, expect, test } from "vitest";
import { ZodError } from "zod";
import type { Message } from "../../Message/Message";
import { Conversation } from "../Conversation";
import { ConversationStatusEnum } from "../ConversationStatus";
import { conversationDummyParams } from "./Conversation.dummy";

describe("Conversation", () => {
	test("Conversationを生成する", () => {
		const conversation = Conversation.create(conversationDummyParams);

		expect(conversation.id).toBe(conversationDummyParams.id);
		expect(conversation.applicantId).toBe(conversationDummyParams.applicantId);
		expect(conversation.employeeId).toBe(conversationDummyParams.employeeId);
		expect(conversation.purposeId).toBe(conversationDummyParams.purposeId);
		expect(conversation.status).toBe(conversationDummyParams.status);
		expect(conversation.messages).toEqual(conversationDummyParams.messages);
	});

	test("不正な値でConversationを生成しようとするとエラーが発生する", () => {
		expect(() =>
			Conversation.create({ ...conversationDummyParams, id: "" }),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({ ...conversationDummyParams, applicantId: "" }),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({ ...conversationDummyParams, employeeId: "" }),
		).toThrowError(ZodError);

		expect(() =>
			Conversation.create({ ...conversationDummyParams, purposeId: 0 }),
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
});
