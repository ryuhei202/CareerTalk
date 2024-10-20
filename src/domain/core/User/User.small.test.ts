import { createId } from "@paralleldrive/cuid2";
import { User } from "./User";
import { describe, expect, test, vi } from "vitest";
import { ZodError } from "zod";
import { employeeDummy } from "../Employee/Employee.dummy";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("User", () => {
  const userId = createId();
  const userName = "testUser";
  const image = "https://example.com/image.png";
  describe("Userを生成する", () => {
    test("正常にUserを生成できる", () => {
      const user = User.create({
        id: userId,
      name: userName,
        image: image,
      });

      expect(user.id).toBe(userId);
      expect(user.name).toBe(userName);
      expect(user.image).toBe(image);
    });
  

  test("不正なUserIdでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.create({
      id: "",
      name: userName,
      image: image,
    })).toThrow(ZodError);

    expect(() => User.create({
      id: "a".repeat(101),
      name: userName,
      image: image,
    })).toThrow(ZodError);
  });

  test("不正なUserNameでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.create({
      id: userId,
      name: "",
      image: image,
    })).toThrow(ZodError);

    expect(() => User.create({
      id: userId,
      name: "a".repeat(101),
      image: image,
    })).toThrow(ZodError);
  });

  test("不正なUserImageでUserを生成しようとするとエラーが発生する", () => {
    expect(() => User.create({
      id: userId,
      name: userName,
      image: "aaa",
    })).toThrow(ZodError);
    });
  });

  describe("changeName", () => {
    test("正常にUserNameを変更できる", () => {
      const user = User.create({
        id: userId,
        name: userName,
        image: image,
      });
      const newUserName = "newUserName";

      expect(user.name).toBe(userName);
      user.changeName(newUserName);
      expect(user.name).toBe(newUserName);
    });

    test("不正なUserNameでUserNameを変更しようとするとエラーが発生する", () => {
      const user = User.create({
        id: userId,
        name: userName,
        image: image,
      });
      expect(() => user.changeName("")).toThrow(ZodError);
    });
  });

  describe("changeImage", () => {
    test("正常にUserImageを変更できる", () => {
      const user = User.create({
        id: userId,
        name: userName,
        image: image,
      });

      const newImage = "https://example.com/newImage.png";
  
      expect(user.image).toBe(image);
      user.changeImage(newImage);
      expect(user.image).toBe(newImage);
    });

    test("不正なUserImageでUserImageを変更しようとするとエラーが発生する", () => {
      const user = User.create({
        id: userId,
        name: userName,
        image: image,
      });
      expect(() => user.changeImage("aaa")).toThrow(ZodError);
    });
  });

  describe("employee", () => {
    test("正常にEmployeeを取得できる", () => {
      const user = User.create({
        id: userId,
        name: userName,
        image: image,
        employee: employeeDummy,
      });
      expect(user.employee).toBe(employeeDummy);
    });
  });

  // 転職者の実装待ち
  // describe("jobSeeker", () => {
  //   test("正常にJobSeekerを取得できる", () => {
  //     const user = User.create({
  //       id: userId,
  //       name: userName,
  //       image: image,
  //       jobSeeker: jobSeekerDummy,
  //     });
  //     expect(user.jobSeeker).toBe(jobSeekerDummy);
  //   });
  // });
});
