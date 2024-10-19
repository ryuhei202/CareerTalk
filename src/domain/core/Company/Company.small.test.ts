import { describe, expect, test, vi } from "vitest";
import { Company } from "./Company";
import { brand } from "@/util/brand";
import { ZodError } from "zod";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Company", () => {
  describe("Companyを生成する", () => {
    const companyId = brand<number, "CompanyId">(1);
    const companyName = brand<string, "CompanyName">("testCompany");
    const code = brand<string, "Code">("testCode");

    test("正常にCompanyを生成できる", () => {
      const company = Company.reconstruct({
        id: companyId,
        name: companyName,
        code: code,
      });

      expect(company.id).toBe(companyId);
      expect(company.name).toBe(companyName);
      expect(company.code).toBe(code);
    });

    test("不正なCompanyIdでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.reconstruct({
        id: brand<number, "CompanyId">(0),
        name: companyName,
        code: code,
      })).toThrow(ZodError);
    });

    test("不正なCompanyNameでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.reconstruct({
        id: companyId,
        name: brand<string, "CompanyName">(""),
        code: code,
      })).toThrow(ZodError);

      expect(() => Company.reconstruct({
        id: companyId,
        name: brand<string, "CompanyName">("a".repeat(101)),
        code: code,
      })).toThrow(ZodError);
    });

    test("不正なCodeでCompanyを生成しようとするとエラーが発生する", () => {
      expect(() => Company.reconstruct({
        id: companyId,
        name: companyName,
        code: brand<string, "Code">(""),
      })).toThrow(ZodError);
      
      expect(() => Company.reconstruct({
        id: companyId,
        name: companyName,
        code: brand<string, "Code">("あいうえおかきく"), // 全角八文字
      })).toThrow(ZodError);
    });
  });
});
