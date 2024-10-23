import { z } from "zod";
import type { Employee } from "../Employee/Employee";

/**
 * User関連のバリデーションスキーマ
 */
export const userIdSchema = z
	.string()
	.max(100, { message: "IDは100文字以内の必要があります" })
	.min(1, { message: "IDは1文以上の必要があります。" }); // useIdはprismaとNextAuthによって自動で入れられるため、柔軟性を持たせておく
export const userNameSchema = z
	.string()
	.min(1, { message: "名前は1文字以上で入力してください" })
	.max(100, { message: "名前は100文字以内で入力してください" });
export const userImageSchema = z
	.string()
	.url({ message: "画像URLは有効なURLで入力してください" });

export const userParamsSchema = z.object({
	id: userIdSchema,
	name: userNameSchema,
	image: userImageSchema,
});

/**
 * Userパラメータ
 */
type UserParams = {
	id: string;
	name?: string;
	image?: string;
	employee?: Employee; // 現場社員エンティティ
	jobSeeker?: unknown; // 転職希望エンティティ（未実装）
};

/**
 * Userエンティティ
 */
export class User {
	private constructor(
		private readonly _id: string,
		private _name?: string,
		private _image?: string,
		private readonly _employee?: Employee,
		private readonly _jobSeeker?: unknown, // 転職希望エンティティ（未実装）
	) {}

	static create(params: UserParams): User {
		User.validate(params);
		return new User(
			params.id,
			params.name,
			params.image,
			params.employee,
			params.jobSeeker,
		);
	}

	private static validate(params: UserParams): void {
		userParamsSchema.parse(params);
	}

	changeName(newName: string) {
		userNameSchema.parse(newName);
		this._name = newName;
	}

	changeImage(newImage: string) {
		userImageSchema.parse(newImage);
		this._image = newImage;
	}

	get id(): string {
		return this._id;
	}

	get name(): string | undefined {
		return this._name;
	}

	get image(): string | undefined {
		return this._image;
	}

	get employee(): Employee | undefined {
		return this._employee;
	}
	get jobSeeker(): unknown | undefined {
		return this._jobSeeker;
	}
}
