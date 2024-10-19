import { UserId } from "./UserId/UserId";
import { UserName } from "./UserName/UserName";
import { Image } from "./Image/Image";
/**
 * Userエンティティ
 * 最初にNextAuthとPrismaによって自動で作成されるため、createメソッドは作成しない。
 */
export class User {
  private constructor(
    private readonly _id: UserId,
    private  _name: UserName,
    private  _image: Image,
  ) {}

  static create(params: {
    id: UserId;
    name: UserName;
    image: Image;
  }): User {
    return new User(
      params.id,
      params.name,
      params.image,
    );
  }
  static reconstruct(params: {
    id: UserId;
    name: UserName;
    image: Image;
  }): User {
    return new User(
      params.id,
      params.name,
      params.image,
    );
  }

  changeName(newName: UserName) {
    this._name = newName;
  }

  changeImage(newImage: Image) {
    this._image = newImage
  }

  get id(): UserId {
    return this._id;
  }

  get name(): UserName {
    return this._name;
  }

  get image(): Image {
    return this._image;
  }
}
