import { Branded } from "@/util/brand";
import { z } from "zod";

/**
 * User関連のバリデーションスキーマ
 */
export const userIdSchema = z.string().max(100, { message: "IDは100文字以内の必要があります" }).min(1, { message: "IDは1文以上の必要があります。" }); // useIdはprismaとNextAuthによって自動で入れられるため、柔軟性を持たせておく
export const userNameSchema = z.string().min(1, { message: "名前は1文字以上で入力してください" }).max(100, { message: "名前は100文字以内で入力してください" });
export const userImageSchema = z.string().url({ message: "画像URLは有効なURLで入力してください" });

export const userParamsSchema = z.object({
  id: userIdSchema,
  name: userNameSchema,
  image: userImageSchema,
});

/**
 * User関連の値
 * 値オブジェクトの代わりにbranded Typesとvalidationを使用する
 */
export type UserId = Branded<string, 'UserId'>;
export type UserName = Branded<string, 'UserName'>;
export type UserImage = Branded<string, 'UserImage'>;

/**
 * Userパラメータ
 */
type UserParams = {
  id: UserId;
  name?: UserName;
  image?: UserImage;
}

/**
 * Userエンティティ
 * 最初にNextAuthとPrismaによって自動で作成されるため、createメソッドは作成しない。
 */
export class User {
  private constructor(
    private readonly _id: UserId,
    private  _name?: UserName,
    private  _image?: UserImage,
  ) {}

  static reconstruct(params: UserParams): User {
    this.validate(params);
    return new User(
      params.id,
      params.name,
      params.image,
    );
  }

  private static validate(params: UserParams): void {
    userParamsSchema.parse(params);
  }

  changeName(newName: UserName) {
    userNameSchema.parse(newName);
    this._name = newName;
  }

  changeImage(newImage: UserImage) {
    userImageSchema.parse(newImage);
    this._image = newImage
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName | undefined{
    return this._name;
  }

  get image(): UserImage | undefined {
    return this._image;
  }
}
