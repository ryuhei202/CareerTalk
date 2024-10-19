import { brand } from "@/util/brand";
import { User } from "./User";
;

/**
 * Userのダミーデータ
 */
const userId = brand<string, "UserId">("cm28rzvjg0000t87kop9wo6jc");
const userName = brand<string, "UserName">("テストユーザー");
const userImage = brand<string, "UserImage">("https://example.com/image.png");

export const userDummy = User.reconstruct({
  id: userId,
  name: userName,
  image: userImage,
});
