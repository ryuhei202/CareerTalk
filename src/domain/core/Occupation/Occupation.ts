import { z } from "zod";

/**
 * Occupation関連のバリデーションスキーマ
 */
export const occupationIdSchema = z
	.number()
	.int()
	.positive({ message: "IDは正の整数である必要があります" });
export const occupationNameSchema = z
	.string()
	.min(1, { message: "名前は1文字以上で入力してください" })
	.max(100, { message: "名前は100文字以内で入力してください" });

export const occupationParamsSchema = z.object({
	id: occupationIdSchema,
	name: occupationNameSchema,
});

/**
 * Occupationパラメータ
 */
export type OccupationParams = {
	id: number;
	name: string;
};

/**
 * Occupationエンティティ
 * マスターデータのため、createメソッドは作成しない。
 */
export class Occupation {
	private constructor(
		private readonly _id: number,
		private readonly _name: string,
	) {}

	static create(params: OccupationParams): Occupation {
		Occupation.validate(params);
		return new Occupation(params.id, params.name);
	}

	private static validate(params: OccupationParams): void {
		occupationParamsSchema.parse(params);
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}
}
