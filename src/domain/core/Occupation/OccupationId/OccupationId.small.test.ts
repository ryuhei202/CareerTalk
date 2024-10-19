import { describe, expect, test, vi } from "vitest";
import { OccupationId, InvalidOccupationIdError } from "./OccupationId";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("OccupationId", () => {
  test("有効な職種IDでインスタンスが生成されること", () => {
    const occupationId = new OccupationId(1);
    expect(occupationId.value).toBe(1);
  });

  test("指定された値でOccupationIdを生成する", () => {
    const value = 1;
    const occupationId = new OccupationId(value);
    expect(occupationId.value).toBe(value);
  });

  test("24文字以外のOccupationIdを生成するとInvalidOccupationIdErrorが投げられる", () => {
    const value = 0;
    expect(() => new OccupationId(value)).toThrow(InvalidOccupationIdError);
  });
});
