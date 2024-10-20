import { describe, expect, test, vi } from "vitest";
import { Occupation } from "./Occupation";
import { ZodError } from "zod";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Occupation", () => {
  describe("Occupationを生成する", () => {
    const occupationId = 1;
    const occupationName = "エンジニア";

    test("正常にOccupationを生成できる", () => {
      const occupation = Occupation.create({
        id: occupationId,
        name: occupationName,
      });

      expect(occupation.id).toBe(occupationId);
      expect(occupation.name).toBe(occupationName);
    });

    test("不正なOccupationIdでOccupationを生成しようとするとエラーが発生する", () => {
      expect(() => Occupation.create({
        id: "test123456" as unknown as number,
        name: occupationName,
      })).toThrow(ZodError);
    });

    test("不正なOccupationNameでOccupationを生成しようとするとエラーが発生する", () => {
      expect(() => Occupation.create({
        id: occupationId,
        name: "",
      })).toThrow(ZodError);
    });
  });
});
