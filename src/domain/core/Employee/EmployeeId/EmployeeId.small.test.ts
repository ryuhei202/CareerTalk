import { describe, expect, test, vi } from "vitest";
import { EmployeeId, InvalidEmployeeIdError } from "./EmployeeId";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("EmployeeId", () => {
  test("デフォルトの値でEmployeeIdを生成する", () => {
    const employeeId = new EmployeeId();
    expect(employeeId.value).toBe('testCuIdWithExactLength0');
  });

  test("指定された値でEmployeeIdを生成する", () => {
    const value = 'a'.repeat(24);
    const employeeId = new EmployeeId(value);
    expect(employeeId.value).toBe(value);
  });

  test("24文字以外のEmployeeIdを生成するとInvalidEmployeeIdErrorが投げられる", () => {
    const longValue = 'a'.repeat(25);
    expect(() => new EmployeeId(longValue)).toThrow(InvalidEmployeeIdError);
  });
});
