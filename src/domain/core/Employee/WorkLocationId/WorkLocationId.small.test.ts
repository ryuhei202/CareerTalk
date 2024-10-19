import { describe, expect, test } from "vitest";
import { InvalidWorkLocationIdError, WorkLocationId } from "./WorkLocationId";

describe("WorkLocationId", () => {
  test("勤務地のIDを生成する", () => {
    const workLocationId = new WorkLocationId(1);
    expect(workLocationId.value).toBe(1);
  });

  test("勤務地が未設定の場合はundefinedが返される", () => {
    const workLocationId = new WorkLocationId(undefined);
    expect(workLocationId.value).toBeUndefined();
  });

  test("勤務地が不正な値の場合はInvalidWorkLocationIdErrorがスローされる", () => {
    expect(() => new WorkLocationId(0)).toThrow(InvalidWorkLocationIdError);
  });
});
