import { User } from "./User";


/**
 * Userのダミーデータ
 */
export const userDummy = User.create({
  id: "cm28rzvjg0000t87kop9wo6jc",
  name: "テストユーザー",
  image: "https://example.com/image.png",
});

// export const userDummyWithEmployee = User.create({
//   id: userId,
//   name: userName,
//   image: userImage,
//   employee: employeeDummy,
// });
