import { describe, expect, test } from "vitest";
import { Gender, GenderEnum, InvalidGenderError } from "./Gender";

describe("Gender", () => {
  test("有効な性別でインスタンスが生成されること", () => {
    const maleGender = new Gender(GenderEnum.MALE);
    const femaleGender = new Gender(GenderEnum.FEMALE);
    const otherGender = new Gender(GenderEnum.OTHER);
    const preferNotToSayGender = new Gender(GenderEnum.PREFER_NOT_TO_SAY);

    expect(maleGender.value).toBe(GenderEnum.MALE);
    expect(femaleGender.value).toBe(GenderEnum.FEMALE);
    expect(otherGender.value).toBe(GenderEnum.OTHER);
    expect(preferNotToSayGender.value).toBe(GenderEnum.PREFER_NOT_TO_SAY);
  });

  test("性別が未設定の場合、undefinedが返されること", () => {
    const gender = new Gender(undefined);
    expect(gender.value).toBeUndefined();
  });

  test("無効な性別でエラーが投げられること", () => {
    const invalidGenderValue = "invalid" as GenderEnum;
    expect(() => new Gender(invalidGenderValue)).toThrow(InvalidGenderError);
  });

  test("toLabel()", () => {
    const maleGender = new Gender(GenderEnum.MALE);
    const femaleGender = new Gender(GenderEnum.FEMALE);
    const otherGender = new Gender(GenderEnum.OTHER);
    const preferNotToSayGender = new Gender(GenderEnum.PREFER_NOT_TO_SAY);

    expect(maleGender.toLabel()).toBe("男性");
    expect(femaleGender.toLabel()).toBe("女性");
    expect(otherGender.toLabel()).toBe("その他");
    expect(preferNotToSayGender.toLabel()).toBe("回答しない");
  });
});

