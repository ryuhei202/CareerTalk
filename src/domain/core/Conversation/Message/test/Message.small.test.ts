import { describe, expect, test } from "vitest";
import { ZodError } from "zod";
import { Message } from "../Message";
import { messageDummyParams } from "./MessageDummy";

describe("Message", () => {
	test("Messageを生成する", () => {
		const message = Message.create(messageDummyParams);

		expect(message.id).toBe(messageDummyParams.id);
		expect(message.conversationId).toBe(messageDummyParams.conversationId);
		expect(message.senderId).toBe(messageDummyParams.senderId);
		expect(message.content).toBe(messageDummyParams.content);
		expect(message.isRead).toBe(messageDummyParams.isRead);
	});

	test("不正な値でMessageを生成しようとするとエラーが発生する", () => {
		// 不正なid
		expect(() => Message.create({ ...messageDummyParams, id: "" })).toThrow(
			ZodError,
		);

		// 不正なconversationId
		expect(() =>
			Message.create({ ...messageDummyParams, conversationId: "" }),
		).toThrow(ZodError);

		// 不正なsenderId
		expect(() =>
			Message.create({ ...messageDummyParams, senderId: "" }),
		).toThrow(ZodError);

		// 不正なcontent(1文字未満)
		expect(() =>
			Message.create({ ...messageDummyParams, content: "" }),
		).toThrow(ZodError);

		// 不正なcontent(1001文字以上)
		expect(() =>
			Message.create({ ...messageDummyParams, content: "a".repeat(1001) }),
		).toThrow(ZodError);
		// 不正なisRead
		expect(() =>
			Message.create({
				...messageDummyParams,
				isRead: "invalid" as unknown as boolean,
			}),
		).toThrow(ZodError);
	});

	describe("changeIsRead", () => {
		test("正常にisReadを変更できる", () => {
			const message = Message.create({
				...messageDummyParams,
				isRead: false,
			});

			expect(message.isRead).toBe(false);
			message.changeIsRead(true);
			expect(message.isRead).toBe(true);
		});
	});
});
