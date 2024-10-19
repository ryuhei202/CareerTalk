import { describe, expect, test } from "vitest";
import { SelfIntroduction, InvalidSelfIntroductionError } from "./SelfIntroduction";

describe("SelfIntroduction", () => {
  test("有効な自己紹介でインスタンスが生成されること", () => {
    const selfIntroduction = new SelfIntroduction("自己紹介");
    expect(selfIntroduction.value).toBe("自己紹介");
  });

  test("自己紹介が未設定の場合は空文字でインスタンスが生成されること", () => {
    const selfIntroduction = new SelfIntroduction();
    expect(selfIntroduction.value).toBe("");
  });

  test("最大長以上で自己紹介を生成するとInvalidSelfIntroductionErrorを投げる", () => {
    expect(() => new SelfIntroduction("a".repeat(1001))).toThrow(InvalidSelfIntroductionError);
  });
});
