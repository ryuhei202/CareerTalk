import { describe, expect, test } from "vitest";
import { Birthday, InvalidBirthdayError } from "./Birthday";

describe("Birthday", () => {
  test("有効な生年月日でインスタンスが生成される", () => {
    const birthday = new Birthday(new Date("1990-01-01"));
    expect(birthday.value?.getFullYear()).toBe(1990);
    expect(birthday.value?.getMonth()).toBe(0);
    expect(birthday.value?.getDate()).toBe(1);
  });

  test("未設定の場合はundefinedが返される", () => {
    const birthday = new Birthday(undefined);
    expect(birthday.value).toBeUndefined();
  });

  test("無効な生年月日でエラーが投げられる", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(() => new Birthday(futureDate)).toThrow(InvalidBirthdayError);

    const tooOldDate = new Date();
    tooOldDate.setFullYear(tooOldDate.getFullYear() - 101);
    expect(() => new Birthday(tooOldDate)).toThrow(InvalidBirthdayError);
  });

  test("toString()", () => {
    const birthday = new Birthday(new Date("1990-01-01"));
    expect(birthday.toString()).toBe("1990-01-01");
  });

});
