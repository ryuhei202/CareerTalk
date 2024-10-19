import { createId } from "@paralleldrive/cuid2";
import { brand } from "@/util/brand";
import { User } from "./User";
;

/**
 * Userのダミーデータ
 */
const userId = brand<string, "UserId">(createId());
const userName = brand<string, "UserName">("テストユーザー");
const userImage = brand<string, "UserImage">("https://example.com/image.jpg");

export const userDummy = User.reconstruct({
  id: userId,
  name: userName,
  image: userImage,
});
