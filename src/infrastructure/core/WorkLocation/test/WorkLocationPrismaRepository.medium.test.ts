import { workLocationDummy } from "@/domain/core/WorkLocation/test/WorkLocation.Dummy";
import { prisma } from "@/lib/prisma";
import { createSuccess } from "@/util/result";
import { beforeAll, describe, expect, test } from "vitest";
import { WorkLocationPrismaRepository } from "../WorkLocationPrismaRepository";
let repository: WorkLocationPrismaRepository;
beforeAll(async () => {
	repository = new WorkLocationPrismaRepository(prisma);
});

describe("WorkLocationPrismaRepository", () => {
	describe("findById", () => {
		test("取得対象の現場が存在しない場合、undefinedを返す", async () => {
			const result = await repository.findById(999);
			expect(result).toStrictEqual(createSuccess(undefined));
		});

		test("取得対象の現場が存在する場合、当該現場を返す", async () => {
			const result = await repository.findById(workLocationDummy.id);
			expect(result).toStrictEqual(createSuccess(workLocationDummy));
		});
	});
});
