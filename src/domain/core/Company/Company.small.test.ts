import { describe, expect, test, vi } from "vitest";
import { Company } from "./Company";
import { CompanyId } from "./CompanyId/CompanyId";
import { CompanyName } from "./CompanyName/CompanyName";
import { Code } from "./Code/Code";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Company", () => {
  test("Companyを生成する", () => {
    const companyId = new CompanyId(1);
    const companyName = new CompanyName("testCompany");
    const code = new Code("testCode");

    const company = Company.reconstruct({
      id: companyId,
      name: companyName,
      code: code,
    });

    expect(company.id.equals(companyId)).toBeTruthy();
    expect(company.name.equals(companyName)).toBeTruthy();
    expect(company.code.equals(code)).toBeTruthy();
  });

  test("Companyを作成する", () => {
    const companyId = new CompanyId(1);
    const companyName = new CompanyName("テスト企業");
    const code = new Code("a".repeat(8));

    const company = Company.create({
      id: companyId,
      name: companyName,
      code: code,
    });

    expect(company.id.equals(companyId)).toBeTruthy();
    expect(company.name.equals(companyName)).toBeTruthy();
    expect(company.code.equals(code)).toBeTruthy();
  });
});
