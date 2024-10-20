import { describe, test, expect } from "vitest";
import { WorkLocation } from "./WorkLocation";
import { ZodError } from "zod";

describe("WorkLocation", () => {
  describe("WorkLocationを生成する", () => {
    const workLocationId = 1;
    const workLocationName = "北海道";

    test("正常にWorkLocationを生成できる", () => {
      const workLocation = WorkLocation.create({
        id: workLocationId,
        name: workLocationName,
      });

      expect(workLocation.id).toBe(workLocationId);
      expect(workLocation.name).toBe(workLocationName);
    });

    test("不正なWorkLocationIdでWorkLocationを生成しようとするとエラーが発生する", () => {
      expect(() => WorkLocation.create({
        id: "test123456" as unknown as number,
        name: workLocationName,
      })).toThrow(ZodError);
    });

    test("不正なWorkLocationNameでWorkLocationを生成しようとするとエラーが発生する", () => {
      expect(() => WorkLocation.create({
        id: workLocationId,
        name: "北海道鹿児島",
      })).toThrow(ZodError);
    });
  });
});
