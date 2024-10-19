import { describe, expect, test } from "vitest";
import { TalkableTopics, InvalidTalkableTopicsError } from "./TalkableTopics";

describe("TalkableTopics", () => {
  test("有効な話せる内容でインスタンスが生成されること", () => {
    const talkableTopics = new TalkableTopics("働き方について");
    expect(talkableTopics.value).toBe("働き方について");
  });

  test("話せる内容が未設定の場合は空文字でインスタンスが生成されること", () => {
    const talkableTopics = new TalkableTopics();
    expect(talkableTopics.value).toBe("");
  });

  test("最大長以上で話せる内容を生成するとInvalidTalkableTopicsErrorを投げる", () => {
    expect(() => new TalkableTopics("a".repeat(1001))).toThrow(InvalidTalkableTopicsError);
  });
});
