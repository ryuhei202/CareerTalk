import { describe, expect, test } from "vitest";
import { InvalidUserNameError, UserName } from "./UserName";

describe("UserName", () => {
  test("正しい名前でUserNameを生成する", () => {
    const name = new UserName("John Doe");
    expect(name.value).toBe("John Doe");
  });

  test("最小長以下でUserNameを生成するとInvalidUserNameErrorを投げる", () => {
    expect(() => new UserName("")).toThrow(InvalidUserNameError);
  });

  test("最大長以上でUserNameを生成するとInvalidUserNameErrorを投げる", () => {
    expect(() => new UserName("a".repeat(101))).toThrow(InvalidUserNameError);
  });
});
