import { describe, expect, test, vi } from "vitest";
import { CompanyId, InvalidCompanyIdError } from "./CompanyId";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("CompanyId", () => {
  test("デフォルトの値でCompanyIdを生成する", () => {
    const companyId = new CompanyId(1);
    expect(companyId.value).toBe(1);
  });
  
    test("指定された値でCompanyIdを生成する", () => {
      const value = 1;
      const companyId = new CompanyId(value);
      expect(companyId.value).toBe(value);
    });

  test("1未満のCompanyIdを生成するとInvalidCompanyIdErrorが投げられる", () => {
    const value = 0;
    expect(() => new CompanyId(value)).toThrow(InvalidCompanyIdError);
  });
});
