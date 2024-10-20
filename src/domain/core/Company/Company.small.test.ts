import { describe, expect, test, vi } from "vitest";
import { Company } from "./Company";
import { brand } from "@/util/brand";
import { ZodError } from "zod";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Company", () => {
  describe("Companyを生成する", () => {
    const companyId = 1;
    const companyName = "testCompany";
    const code = "testCode";

    test("正常にCompanyを生成できる", () => {
      const company = Company.create({
        id: companyId,
        name: companyName,
        code: code,
      });

      expect(company.id).toBe(companyId);
      expect(company.name).toBe(companyName);
      expect(company.code).toBe(code);
    });

    test("不正なCompanyIdでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({
        id: 0,
        name: companyName,
        code: code,
      })).toThrow(ZodError);
    });

    test("不正なCompanyNameでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({
        id: companyId,
        name: "",
        code: code,
      })).toThrow(ZodError);

      expect(() => Company.create({
        id: companyId,
        name: "a".repeat(101),
        code: code,
      })).toThrow(ZodError);
    });

    test("不正なCodeでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.create({
        id: companyId,
        name: companyName,
        code: "",
      })).toThrow(ZodError);
      
      expect(() => Company.create({
        id: companyId,
        name: companyName,
        code: "あいうえおかきく", // 全角八文字
      })).toThrow(ZodError);
    });
  });
});
