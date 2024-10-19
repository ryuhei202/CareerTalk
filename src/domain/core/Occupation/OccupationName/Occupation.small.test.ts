import { describe, expect, test } from "vitest";
import { InvalidOccupationNameError, OccupationName } from "./OccupationName";

describe("Occupation", () => {
  test("正しい職種名でOccupationを生成する", () => {
    const name = new OccupationName("エンジニア");
    expect(name.value).toBe("エンジニア");
  });

  test("最小長以下でOccupationNameを生成するとInvalidOccupationNameErrorを投げる", () => {
    expect(() => new OccupationName("")).toThrow(InvalidOccupationNameError);
  });

  test("最大長以上でOccupationNameを生成するとInvalidOccupationNameErrorを投げる", () => {
    expect(() => new OccupationName("a".repeat(101))).toThrow(InvalidOccupationNameError);
  });
});
