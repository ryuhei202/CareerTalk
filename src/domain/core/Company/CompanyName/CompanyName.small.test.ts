import { describe, expect, test } from "vitest";
import { InvalidCompanyNameError, CompanyName } from "./CompanyName";
describe("CompanyName", () => {
  test("正しい企業名でCompanyNameを生成する", () => {
    const name = new CompanyName("株式会社ABC");
    expect(name.value).toBe("株式会社ABC");
  });

  test("最小長以下でCompanyNameを生成するとInvalidCompanyNameErrorを投げる", () => {
    expect(() => new CompanyName("")).toThrow(InvalidCompanyNameError);
  });

  test("最大長以上でCompanyNameを生成するとInvalidCompanyNameErrorを投げる", () => {
    expect(() => new CompanyName("a".repeat(101))).toThrow(InvalidCompanyNameError);
  });
});
