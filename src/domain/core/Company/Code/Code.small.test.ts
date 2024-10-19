import { describe, expect, test, vi } from "vitest";
import { Code, InvalidCodeError } from "./Code";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Code", () => {
  test("正しい値でCodeを生成する", () => {
    const value = "A".repeat(8);
    const code = new Code(value);
    expect(code.value).toBe(value);
  });

  test("8文字以外の無効な値でCodeを生成するとInvalidCodeErrorを投げる", () => {
    expect(() => new Code("A".repeat(7))).toThrow(InvalidCodeError);
    expect(() => new Code("A".repeat(9))).toThrow(InvalidCodeError);
  });
});
