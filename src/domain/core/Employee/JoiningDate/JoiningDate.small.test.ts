import { describe, expect, test, vi } from "vitest";
import { JoiningDate, InvalidJoiningDateError } from "./JoiningDate";

vi.mock("@/util/date", () => ({
  getCurrentDate: () => new Date("2024-10-01"),
}));

describe("JoiningDate", () => {
  test("有効な入社日でインスタンスが生成されること", () => {
    const date = new Date("2023-10-01");
    const joiningDate = new JoiningDate(date);

    expect(joiningDate.value).toEqual(date);
  });

  test("現在日より未来の日付でInvalidJoiningDateErrorがスローされること", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(() => new JoiningDate(
      futureDate)).toThrow(InvalidJoiningDateError);
  });

  test("getYearOfExperience()が正しい経験年数を返すこと", () => {
    const mockDate = new Date("2024-10-01");
    vi.setSystemTime(mockDate);
    
    const joiningDate = new JoiningDate(new Date("2021-01-01"));
    
    expect(joiningDate.getYearOfExperience()).toBe(4);

    vi.useRealTimers();
  });
});
