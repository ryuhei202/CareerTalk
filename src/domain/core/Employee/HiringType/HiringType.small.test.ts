import { describe, expect, test } from "vitest";
import { HiringType, HiringTypeEnum, InvalidHiringTypeError } from "./HiringType";

describe("HiringType", () => {
  test("HiringTypeを生成する", () => {
    const newGraduate = new HiringType(HiringTypeEnum.NEW_GRADUATE);
    const midCareer = new HiringType(HiringTypeEnum.MID_CAREER);

    expect(newGraduate.value).toBe(HiringTypeEnum.NEW_GRADUATE);
    expect(midCareer.value).toBe(HiringTypeEnum.MID_CAREER);
  });

  test("入社方法が未設定の場合はundefinedが返される", () => {
    const hiringType = new HiringType(undefined);
    expect(hiringType.value).toBeUndefined();
  });

  test("HiringTypeが不正な値の場合はInvalidHiringTypeErrorがスローされる", () => {
    expect(() => new HiringType("INVALID" as HiringTypeEnum)).toThrow(InvalidHiringTypeError);
  });

  test("toLabel()", () => {
    const newGraduate = new HiringType(HiringTypeEnum.NEW_GRADUATE);
    const midCareer = new HiringType(HiringTypeEnum.MID_CAREER);
    const undefinedHiringType = new HiringType(undefined);
    
    expect(newGraduate.toLabel()).toBe("新卒採用");
    expect(midCareer.toLabel()).toBe("中途採用");
    expect(undefinedHiringType.toLabel()).toBeUndefined();
  });
});
