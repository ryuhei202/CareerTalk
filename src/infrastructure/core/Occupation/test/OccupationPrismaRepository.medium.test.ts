import { describe, test, expect, beforeAll } from "vitest";
import { prisma } from "@/lib/prisma";
import { OccupationPrismaRepository } from "../OccupationPrismaRepository";
import { createSuccess } from "@/util/result";
import { occupationDummy } from "@/domain/core/Occupation/test/Occupation.dummy";

let repository: OccupationPrismaRepository;
beforeAll(async () => {
  repository = new OccupationPrismaRepository(prisma);
});

describe("OccupationPrismaRepository", () => {
  describe("findById", () => {
    test("取得対象の職種が存在しない場合、undefinedを返す", async () => {
      const result = await repository.findById(999);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("取得対象の職種が存在する場合、当該職種を返す", async () => {
      const result = await repository.findById(occupationDummy.id);
      expect(result).toStrictEqual(createSuccess(occupationDummy));
    });
  });
});