import { Branded } from "@/util/brand";
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
 * Company関連の値
 * 値オブジェクトの代わりにbranded Typesとvalidationを使用する
 */
export type CompanyId = Branded<number, 'CompanyId'>;
export type CompanyName = Branded<string, 'CompanyName'>;
export type Code = Branded<string, 'Code'>;

/**
 * Companyパラメータ
 */
export type CompanyParams = {
  id: CompanyId;
  name: CompanyName;
  code: Code;
}

/**
 * Companyエンティティ
 * マスターデータのため、createメソッドは作成しない。
 */
export class Company {
  private constructor(
    private readonly _id: CompanyId,
    private readonly _name: CompanyName,
    private readonly _code: Code,
  ) {}

  static reconstruct(params: CompanyParams): Company {
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

  get id(): CompanyId {
    return this._id;
  }

  get name(): CompanyName {
    return this._name;
  }

  get code(): Code {
    return this._code;
  }
}
