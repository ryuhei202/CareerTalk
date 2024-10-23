import { z } from "zod";

/**
 * WorkLocation関連のバリデーションスキーマ
 */
export const workLocationParamsSchema = z.object({
	id: z
		.number()
		.int()
		.positive({ message: "IDは正の整数である必要があります" }),
	name: z
		.string()
		.min(1, { message: "名前は1文字以上で入力してください" })
		.max(4, { message: "名前は4文字以内で入力してください" }),
});

/**
 * WorkLocationパラメータ
 */
type WorkLocationParams = {
	id: number;
	name: string;
};

/**
 * WorkLocationエンティティ
 */
export class WorkLocation {
	private constructor(
		private readonly _id: number,
		private readonly _name: string,
	) {}

	static create(params: WorkLocationParams): WorkLocation {
		WorkLocation.validate(params);
		return new WorkLocation(params.id, params.name);
	}

	private static validate(params: WorkLocationParams): void {
		workLocationParamsSchema.parse(params);
	}

	get id(): number {
		return this._id;
	}

	get name(): string {
		return this._name;
	}
}
