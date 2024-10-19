import { createId } from "@paralleldrive/cuid2";
import { User } from "./User";
import { describe, expect, test, vi } from "vitest";
import { UserId } from "./UserId/UserId";
import { UserName } from "./UserName/UserName";
import { Image } from "./Image/Image";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("User", () => {
  const userId = createId();
  const userName = "testUser"
  const image = "https://example.com/image.png"

  test("Userを生成する", () => {
    const user = User.reconstruct({
      id: new UserId(userId),
      name: new UserName(userName),
      image: new Image(image),
    });

    expect(user.id.equals(new UserId(userId))).toBe(true);
    expect(user.name.equals(new UserName(userName))).toBe(true);
    expect(user.image.equals(new Image(image))).toBe(true);
  });

  test("Userを作成する", () => {
    const user = User.create({
      id: new UserId(userId),
      name: new UserName(userName),
      image: new Image(image),
    });

    expect(user.id.equals(new UserId(userId))).toBe(true);
    expect(user.name.equals(new UserName(userName))).toBe(true);
    expect(user.image.equals(new Image(image))).toBe(true);
  });

  test("changeName", () => {
    const user = User.reconstruct({
      id: new UserId(userId),
      name: new UserName(userName),
      image: new Image(image),
    });
    const newUserName = "newUserName";

    expect(user.name.equals(new UserName(userName))).toBe(true);
    user.changeName(new UserName(newUserName));
    expect(user.name.equals(new UserName(newUserName))).toBe(true);
  });

  test("changeImage", () => {
    const user = User.reconstruct({
      id: new UserId(userId),
      name: new UserName(userName),
      image: new Image(image),
    });
    const newImage = "https://example.com/newImage.png"

    expect(user.image.equals(new Image(image))).toBe(true);
    user.changeImage(new Image(newImage));
    expect(user.image.equals(new Image(newImage))).toBe(true);
  });
});
