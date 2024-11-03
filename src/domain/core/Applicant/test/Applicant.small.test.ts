import { GenderEnum } from "@/domain/shared/Gender";
import { StatusEnum } from "@/domain/shared/Status";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ZodError } from "zod";
import { Applicant } from "../Applicant";
import { applicantDummyParams } from "./Applicant.dummy";
describe("Applicant", () => {
	test("Applicantを生成する", () => {
		const applicant = Applicant.create(applicantDummyParams);

		expect(applicant.id).toBe(applicantDummyParams.id);
		expect(applicant.userId).toBe(applicantDummyParams.userId);
		expect(applicant.name).toBe(applicantDummyParams.name);
		expect(applicant.occupationId).toBe(applicantDummyParams.occupationId);
		expect(applicant.gender).toBe(applicantDummyParams.gender);
		expect(applicant.joiningDate).toBe(applicantDummyParams.joiningDate);
		expect(applicant.status).toBe(applicantDummyParams.status);
		expect(applicant.imageUrl).toBe(applicantDummyParams.imageUrl);
		expect(applicant.birthday).toBe(applicantDummyParams.birthday);
		expect(applicant.selfIntroduction).toBe(
			applicantDummyParams.selfIntroduction,
		);
	});

	test("未設定のプロパティはundefinedを返す", () => {
		const applicant = Applicant.create({
			...applicantDummyParams,
			imageUrl: undefined,
			birthday: undefined,
			selfIntroduction: undefined,
		});

		expect(applicant.id).toBe(applicantDummyParams.id);
		expect(applicant.userId).toBe(applicantDummyParams.userId);
		expect(applicant.name).toBe(applicantDummyParams.name);
		expect(applicant.occupationId).toBe(applicantDummyParams.occupationId);
		expect(applicant.gender).toBe(applicantDummyParams.gender);
		expect(applicant.joiningDate).toBe(applicantDummyParams.joiningDate);
		expect(applicant.status).toBe(applicantDummyParams.status);
		// 未設定のプロパティはundefinedを返す
		expect(applicant.imageUrl).toBeUndefined();
		expect(applicant.birthday).toBeUndefined();
		expect(applicant.selfIntroduction).toBeUndefined();
	});

	test("不正な値でApplicantを生成しようとするとエラーが発生する", () => {
		// 不正なid
		expect(() => Applicant.create({ ...applicantDummyParams, id: "" })).toThrow(
			ZodError,
		);

		// 不正なname
		expect(() =>
			Applicant.create({ ...applicantDummyParams, name: "" }),
		).toThrow(ZodError);

		// 不正なname(100文字以上)
		expect(() =>
			Applicant.create({ ...applicantDummyParams, name: "a".repeat(101) }),
		).toThrow(ZodError);
	});

	// 不正なuserId
	expect(() =>
		Applicant.create({ ...applicantDummyParams, userId: "" }),
	).toThrow(ZodError);

	// 不正なoccupationId
	expect(() =>
		Applicant.create({ ...applicantDummyParams, occupationId: 0 }),
	).toThrow(ZodError);

	// 不正なgender
	expect(() =>
		Applicant.create({
			...applicantDummyParams,
			gender: "invalid" as GenderEnum,
		}),
	).toThrow(ZodError);

	// 不正なjoiningDate
	expect(() =>
		Applicant.create({
			...applicantDummyParams,
			joiningDate: new Date("invalid"),
		}),
	).toThrow(ZodError);

	// 不正なstatus
	expect(() =>
		Applicant.create({
			...applicantDummyParams,
			status: "invalid" as StatusEnum,
		}),
	).toThrow(ZodError);

	// 不正なimageUrl
	expect(() =>
		Applicant.create({ ...applicantDummyParams, imageUrl: "あああ" }),
	).toThrow(ZodError);

	// 不正なbirthday
	expect(() =>
		Applicant.create({
			...applicantDummyParams,
			birthday: new Date("2999-01-01"),
		}),
	).toThrow(ZodError);

	// 不正なselfIntroduction
	expect(() =>
		Applicant.create({
			...applicantDummyParams,
			selfIntroduction: "a".repeat(1001),
		}),
	).toThrow(ZodError);

	describe("changeName", () => {
		test("正常にnameを変更できる", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				name: "テスト太郎",
			});

			expect(applicant.name).toBe("テスト太郎");
			applicant.changeName("テスト次郎");
			expect(applicant.name).toBe("テスト次郎");
		});

		test("不正なnameでnameを変更しようとするとエラーが発生する", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				name: "テスト太郎",
			});

			expect(applicant.name).toBe("テスト太郎");
			expect(() => applicant.changeName("")).toThrow(ZodError);
		});
	});

	describe("changeOccupationId", () => {
		test("正常にoccupationIdを変更できる", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				occupationId: 1,
			});

			expect(applicant.occupationId).toBe(1);
			applicant.changeOccupationId(2);
			expect(applicant.occupationId).toBe(2);
		});

		test("不正なoccupationIdでoccupationIdを変更しようとするとエラーが発生する", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				occupationId: 1,
			});

			expect(applicant.occupationId).toBe(1);
			expect(() => applicant.changeOccupationId(0)).toThrow(ZodError);
		});
	});

	describe("changeImageUrl", () => {
		test("正常にimageUrlを変更できる", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				imageUrl: "https://example.com/image.png",
			});

			expect(applicant.imageUrl).toBe("https://example.com/image.png");
			applicant.changeImageUrl("https://example.com/image2.png");
			expect(applicant.imageUrl).toBe("https://example.com/image2.png");
		});

		test("不正なimageUrlでimageUrlを変更しようとするとエラーが発生する", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				imageUrl: "https://example.com/image.png",
			});

			expect(applicant.imageUrl).toBe("https://example.com/image.png");
			expect(() => applicant.changeImageUrl("あああ")).toThrow(ZodError);
		});
	});

	describe("changeSelfIntroduction", () => {
		test("正常にselfIntroductionを変更できる", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				selfIntroduction: "自己紹介",
			});

			expect(applicant.selfIntroduction).toBe("自己紹介");
			applicant.changeSelfIntroduction("自己紹介2");
			expect(applicant.selfIntroduction).toBe("自己紹介2");
		});

		test("不正なselfIntroductionでselfIntroductionを変更しようとするとエラーが発生する", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				selfIntroduction: "自己紹介",
			});

			expect(applicant.selfIntroduction).toBe("自己紹介");
			expect(() => applicant.changeSelfIntroduction("a".repeat(1001))).toThrow(
				ZodError,
			);
		});
	});

	describe("toGenderLabel", () => {
		test("正常にgenderLabelを返す", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				gender: GenderEnum.MALE,
			});

			expect(applicant.toGenderLabel()).toBe("男性");
		});
	});

	describe("toStatusLabel", () => {
		test("正常にstatusLabelを返す", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				status: StatusEnum.PENDING,
			});

			expect(applicant.toStatusLabel()).toBe("審査中");
		});
	});

	describe("getAge", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});
		test("正常にageを返す", () => {
			vi.setSystemTime(new Date("2024-10-19"));
			const applicant = Applicant.create({
				...applicantDummyParams,
				birthday: new Date("1999-01-01"),
			});

			expect(applicant.getAge()).toBe(25);
		});

		test("同じ月の誕生日で既に誕生日が来ている場合", () => {
			vi.setSystemTime(new Date("2024-10-19"));
			const applicant = Applicant.create({
				...applicantDummyParams,
				birthday: new Date("1999-10-15"),
			});

			expect(applicant.getAge()).toBe(25);
		});

		test("同じ月の誕生日でまだ誕生日が来ていない場合", () => {
			vi.setSystemTime(new Date("2024-10-19"));
			const applicant = Applicant.create({
				...applicantDummyParams,
				birthday: new Date("1999-10-25"),
			});

			expect(applicant.getAge()).toBe(24);
		});

		test("誕生日の場合", () => {
			vi.setSystemTime(new Date("2024-10-19"));
			const applicant = Applicant.create({
				...applicantDummyParams,
				birthday: new Date("1999-10-19"),
			});

			expect(applicant.getAge()).toBe(25);
		});

		test("未設定のbirthdayでageを返すとundefinedを返す", () => {
			const applicant = Applicant.create({
				...applicantDummyParams,
				birthday: undefined,
			});

			expect(applicant.getAge()).toBeUndefined();
		});
	});
});
