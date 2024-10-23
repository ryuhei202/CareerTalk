import { describe, test, expect } from "vitest";
import { WorkLocation } from "../WorkLocation";
import { ZodError } from "zod";
import { workLocationDummyParams } from "./WorkLocation.Dummy";

describe("WorkLocation", () => {
  describe("WorkLocationを生成する", () => {
    test("正常にWorkLocationを生成できる", () => {
      const workLocation = WorkLocation.create(workLocationDummyParams);
      expect(workLocation.id).toBe(workLocationDummyParams.id);
      expect(workLocation.name).toBe(workLocationDummyParams.name);
    });

    test("不正なWorkLocationIdでWorkLocationを生成しようとするとエラーが発生する", () => {
      expect(() => WorkLocation.create({ ...workLocationDummyParams, id: "test123456" as unknown as number })).toThrow(ZodError);
    });

    test("不正なWorkLocationNameでWorkLocationを生成しようとするとエラーが発生する", () => {
      expect(() => WorkLocation.create({ ...workLocationDummyParams, name: "北海道鹿児島" })).toThrow(ZodError);
    });
  });
});
