import { describe, expect, test } from "vitest";
import { ZodError } from "zod";
import { employeeDummy } from "../../Employee/test/Employee.dummy";
import { User } from "../User";
import { userDummyParams, userDummyWithEmployee } from "./User.dummy";

describe("User", () => {
	describe("Userを生成する", () => {
		test("正常にUserを生成できる", () => {
			const user = User.create(userDummyParams);

			expect(user.id).toBe(userDummyParams.id);
			expect(user.name).toBe(userDummyParams.name);
			expect(user.image).toBe(userDummyParams.image);
		});

		test("不正なUserIdでUserを生成しようとするとエラーが発生する", () => {
			expect(() =>
				User.create({
					...userDummyParams,
					id: "",
				}),
			).toThrow(ZodError);

			expect(() =>
				User.create({
					...userDummyParams,
					id: "a".repeat(101),
				}),
			).toThrow(ZodError);
		});

		test("不正なUserNameでUserを生成しようとするとエラーが発生する", () => {
			expect(() =>
				User.create({
					...userDummyParams,
					name: "",
				}),
			).toThrow(ZodError);

			expect(() =>
				User.create({
					...userDummyParams,
					name: "a".repeat(101),
				}),
			).toThrow(ZodError);
		});

		test("不正なUserImageでUserを生成しようとするとエラーが発生する", () => {
			expect(() =>
				User.create({
					...userDummyParams,
					image: "aaa",
				}),
			).toThrow(ZodError);
		});
	});

	describe("changeName", () => {
		test("正常にUserNameを変更できる", () => {
			const user = User.create({ ...userDummyParams, name: "テストユーザー" });
			const newUserName = "newUserName";

			expect(user.name).toBe("テストユーザー");
			user.changeName(newUserName);
			expect(user.name).toBe(newUserName);
		});

		test("不正なUserNameでUserNameを変更しようとするとエラーが発生する", () => {
			const user = User.create({ ...userDummyParams, name: "テストユーザー" });
			expect(() => user.changeName("")).toThrow(ZodError);
		});
	});

	describe("changeImage", () => {
		test("正常にUserImageを変更できる", () => {
			const user = User.create({
				...userDummyParams,
				image: "https://example.com/image.png",
			});
			const newImage = "https://example.com/newImage.png";

			expect(user.image).toBe("https://example.com/image.png");
			user.changeImage(newImage);
			expect(user.image).toBe(newImage);
		});

		test("不正なUserImageでUserImageを変更しようとするとエラーが発生する", () => {
			const user = User.create({
				...userDummyParams,
				image: "https://example.com/image.png",
			});
			expect(() => user.changeImage("aaa")).toThrow(ZodError);
		});
	});

	describe("従業員として登録されている場合", () => {
		test("従業員を取得できる", () => {
			const user = User.create(userDummyWithEmployee);
			expect(user.id).toBe(userDummyParams.id);
			expect(user.name).toBe(userDummyParams.name);
			expect(user.image).toBe(userDummyParams.image);
			expect(user.employee).toBe(employeeDummy);
		});
	});
});
