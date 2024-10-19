import { describe, expect, test, vi } from "vitest";
import { Occupation } from "./Occupation";
import { OccupationId } from "./OccupationId/OccupationId";
import { OccupationName } from "./OccupationName/OccupationName";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Occupation", () => {
  test("Occupationを生成する", () => {
    const occupationId = new OccupationId(1);
    const occupationName = new OccupationName("エンジニア");

    const occupation = Occupation.reconstruct({
      id: occupationId,
      name: occupationName,
    });

    expect(occupation.id.equals(occupationId)).toBeTruthy();
    expect(occupation.name.equals(occupationName)).toBeTruthy();
  });

  test("Occupationを作成する", () => {
    const occupation = Occupation.create({
      id: new OccupationId(1),
      name: new OccupationName("エンジニア"),
    });

    expect(occupation.id.equals(new OccupationId(1))).toBeTruthy();
    expect(occupation.name.equals(new OccupationName("エンジニア"))).toBeTruthy();
  });
});
