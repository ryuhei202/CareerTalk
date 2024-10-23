import { describe, expect, test } from "vitest";
import { ZodError } from "zod";
import { Occupation } from "../Occupation";
import { occupationDummyParams } from "./Occupation.dummy";
describe("Occupation", () => {
	describe("Occupationを生成する", () => {
		test("正常にOccupationを生成できる", () => {
			const occupation = Occupation.create(occupationDummyParams);
			expect(occupation.id).toBe(occupationDummyParams.id);
			expect(occupation.name).toBe(occupationDummyParams.name);
		});

		test("不正なOccupationIdでOccupationを生成しようとするとエラーが発生する", () => {
			expect(() =>
				Occupation.create({
					...occupationDummyParams,
					id: "test123456" as unknown as number,
				}),
			).toThrow(ZodError);
		});

		test("不正なOccupationNameでOccupationを生成しようとするとエラーが発生する", () => {
			expect(() =>
				Occupation.create({ ...occupationDummyParams, name: "" }),
			).toThrow(ZodError);
		});
	});
});
