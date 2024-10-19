import { describe, test, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { OccupationPrismaRepository } from "./OccupationPrismaRepository";
import { createSuccess } from "@/util/result";
import { occupationDummy } from "@/domain/core/Occupation/Occupation.dummy";

beforeEach(async () => {
  await prisma.occupation.deleteMany({
    where: { id: occupationDummy.id.value },
  });
});

afterAll(async () => {
  await prisma.occupation.deleteMany({
    where: { id: occupationDummy.id.value },
  });
});
describe("OccupationPrismaRepository", () => {
  let repository: OccupationPrismaRepository;
  beforeAll(async () => {
    repository = new OccupationPrismaRepository(prisma);
  });

  describe("findById", () => {
    test("テーブルが空の場合、undefinedを返す", async () => {
      const id = 1
      const result = await repository.findById(id);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象の職種が存在しない場合、undefinedを返す", async () => {
      // 取得対象でない職種を保存する
      await repository.save(occupationDummy);

      const result = await repository.findById(2);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象の職種が存在する場合、当該職種を返す", async () => {
      // 取得対象の職種を保存する
      await repository.save(occupationDummy);
      const result = await repository.findById(occupationDummy.id.value);
      console.log(result);
      
      expect(result).toStrictEqual(createSuccess(occupationDummy));
    });
  });

  describe("save", () => {
    test("職種を保存する", async () => {
      const result = await repository.save(occupationDummy);
      expect(result).toStrictEqual(createSuccess(undefined));

      // 保存されていることを確認
      const { data: savedOccupation } = await repository.findById(occupationDummy.id.value);
      expect(savedOccupation).toStrictEqual(occupationDummy);
    });
  });
});
