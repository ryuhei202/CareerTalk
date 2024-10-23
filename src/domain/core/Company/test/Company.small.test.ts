import { describe, expect, test, vi } from "vitest";
import { Company } from "../Company";
import { ZodError } from "zod";
import { companyDummyParams } from "./Company.dummy";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Company", () => {
  describe("Companyを生成する", () => {
    test("正常にCompanyを生成できる", () => {
      const company = Company.create(companyDummyParams);

      expect(company.id).toBe(companyDummyParams.id);
      expect(company.name).toBe(companyDummyParams.name);
      expect(company.code).toBe(companyDummyParams.code);
    });

    test("不正なCompanyIdでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({...companyDummyParams, id: 0})).toThrow(ZodError);
    });

    test("不正なCompanyNameでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({...companyDummyParams, name: ""})).toThrow(ZodError);

      expect(() => Company.create({...companyDummyParams, name: "a".repeat(101)})).toThrow(ZodError);
    });

    test("不正なCodeでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({...companyDummyParams, code: ""})).toThrow(ZodError);

      expect(() => Company.create({...companyDummyParams, code: "あいうえおかきく"})).toThrow(ZodError);
    });
  });
});
