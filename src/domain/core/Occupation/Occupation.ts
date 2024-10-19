import { Branded } from "@/util/brand";
import { z } from "zod";


/**
 * Occupation関連のバリデーションスキーマ
 */
export const occupationIdSchema = z.number().int().positive({ message: "IDは正の整数である必要があります" });
export const occupationNameSchema = z.string().min(1, { message: "名前は1文字以上で入力してください" }).max(100, { message: "名前は100文字以内で入力してください" });

export const occupationParamsSchema = z.object({
  id: occupationIdSchema,
  name: occupationNameSchema,
});

/**
 * Occupation関連の値
 * 値オブジェクトの代わりにbranded Typesとvalidationを使用する
 */
export type OccupationId = Branded<number, 'OccupationId'>;
export type OccupationName = Branded<string, 'OccupationName'>;

/**
 * Occupationパラメータ
 */
export type OccupationParams = {
  id: OccupationId;
  name: OccupationName;
}

/**
 * Occupationエンティティ
 * マスターデータのため、createメソッドは作成しない。
 */
export class Occupation {
  private constructor(
    private readonly _id: OccupationId,
    private readonly _name: OccupationName,
  ) {}

  static reconstruct(params: OccupationParams): Occupation {
    this.validate(params);
    return new Occupation(
      params.id,
      params.name,
    );
  }

  private static validate(params: OccupationParams): void {
    occupationParamsSchema.parse(params);
  }

  get id(): OccupationId {
    return this._id;
  }

  get name(): OccupationName {
    return this._name;
  }
}
