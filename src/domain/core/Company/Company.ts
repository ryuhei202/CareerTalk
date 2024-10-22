import { z } from "zod";

/**
 * Company関連のバリデーションスキーマ
 */
export const companyIdSchema = z.number().int().positive({ message: "IDは正の整数である必要があります" });
export const companyNameSchema = z.string().min(1, { message: "名前は1文字以上で入力してください" }).max(100, { message: "名前は100文字以内で入力してください" });
export const codeSchema = z.string().regex(/^[a-zA-Z0-9]{8}$/, { message: "コードは8文字の半角英数字で入力してください" });

export const companyParamsSchema = z.object({
  id: companyIdSchema,
  name: companyNameSchema,
  code: codeSchema,
});

/**
 * Companyパラメータ
 */
export type CompanyParams = {
  id: number;
  name: string;
  code: string;
}

/**
 * Companyエンティティ
 * マスターデータのため、createメソッドは作成しない。
 */
export class Company {
  private constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _code: string,
  ) {}

  static create(params: CompanyParams): Company {
    this.validate(params);
    return new Company(
      params.id,
      params.name,
      params.code,
    );
  }

  private static validate(params: CompanyParams): void {
    companyParamsSchema.parse(params);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }
}
