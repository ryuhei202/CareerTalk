import { createId } from "@paralleldrive/cuid2";
import { User } from "./User";
import { describe, expect, test, vi } from "vitest";
import { brand } from "@/util/brand";
import { ZodError } from "zod";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("User", () => {
  const userId = brand<string, "UserId">(createId());
  const userName = brand<string, "UserName">("testUser");
  const image = brand<string, "UserImage">("https://example.com/image.png");
  describe("Userを生成する", () => {
    test("正常にUserを生成できる", () => {
      const user = User.reconstruct({
        id: userId,
      name: userName,
        image: image,
      });

      expect(user.id).toBe(userId);
      expect(user.name).toBe(userName);
      expect(user.image).toBe(image);
    });
  

  test("不正なUserIdでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.reconstruct({
      id: brand<string, "UserId">(""),
      name: userName,
      image: image,
    })).toThrow(ZodError);
    expect(() => User.reconstruct({
      id: brand<string, "UserId">("a".repeat(101)),
      name: userName,
      image: image,
    })).toThrow(ZodError);
  });

  test("不正なUserNameでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.reconstruct({
      id: userId,
      name: brand<string, "UserName">(""),
      image: image,
    })).toThrow(ZodError);

    expect(() => User.reconstruct({
      id: userId,
      name: brand<string, "UserName">("a".repeat(101)),
      image: image,
    })).toThrow(ZodError);
  });

  test("不正なUserImageでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.reconstruct({
      id: userId,
      name: userName,
      image: brand<string, "UserImage">("aaa"),
    })).toThrow(ZodError);
    });
  });

  describe("changeName", () => {
    test("正常にUserNameを変更できる", () => {
      const user = User.reconstruct({
        id: userId,
        name: userName,
        image: image,
      });
      const newUserName = brand<string, "UserName">("newUserName");

      expect(user.name).toBe(userName);
      user.changeName(newUserName);
      expect(user.name).toBe(newUserName);
    });

    test("不正なUserNameでUserNameを変更しようとするとエラーが発生する", () => {
      const user = User.reconstruct({
        id: userId,
        name: userName,
        image: image,
      });
      expect(() => user.changeName(brand<string, "UserName">(""))).toThrow(ZodError);
    });
  });

  describe("changeImage", () => {
    test("正常にUserImageを変更できる", () => {
      const user = User.reconstruct({
        id: userId,
        name: userName,
        image: image,
      });

      const newImage = brand<string, "UserImage">("https://example.com/newImage.png");
  
      expect(user.image).toBe(image);
      user.changeImage(newImage);
      expect(user.image).toBe(newImage);
    });

    test("不正なUserImageでUserImageを変更しようとするとエラーが発生する", () => {
      const user = User.reconstruct({
        id: userId,
        name: userName,
        image: image,
      });
      expect(() => user.changeImage(brand<string, "UserImage">("aaa"))).toThrow(ZodError);
    });
  });
});
