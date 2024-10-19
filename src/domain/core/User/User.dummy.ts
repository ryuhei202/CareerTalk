import { createId } from "@paralleldrive/cuid2";
import { UserId } from "./UserId/UserId";
import { User } from "./User";
import { UserName } from "./UserName/UserName";
import { Image } from "./Image/Image";

export const userDummy = User.create({
  id: new UserId(createId()),
  name: new UserName("テストユーザー"),
  image: new Image("https://example.com/image.jpg"),
});
