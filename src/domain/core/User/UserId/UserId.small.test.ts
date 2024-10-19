import { describe, expect, test } from "vitest";
import { UserId, InvalidUserIdError } from "./UserId";

describe("UserId", () => {
  test("指定された値でUserIdを生成する", () => {
    const value = 'a'.repeat(24);
    const userId = new UserId(value);
    expect(userId.value).toBe(value);
  });

  test("100文字を超えるUserIdを生成するとInvalidUserIdErrorが投げられる", () => {
    const longValue = 'a'.repeat(101);
    expect(() => new UserId(longValue)).toThrow(InvalidUserIdError);
  });
});
