import { describe, test, expect, beforeAll } from "vitest";
import { prisma } from "@/lib/prisma";
import { CompanyPrismaRepository } from "../CompanyPrismaRepository";
import { createSuccess } from "@/util/result";
import { companyDummy } from "@/domain/core/Company/test/Company.dummy";

let repository: CompanyPrismaRepository;
beforeAll(async () => {
  repository = new CompanyPrismaRepository(prisma);
});

describe("CompanyPrismaRepository", () => {
  describe("findById", () => {
    test("取得対象の企業が存在しない場合、undefined を返す", async () => {
      const result = await repository.findById(999999);
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("企業が存在する場合、企業を返す", async () => {
      const result = await repository.findById(companyDummy.id);
      expect(result).toStrictEqual(createSuccess(companyDummy));
    });
  });

  describe("findByCode", () => {
    test("取得対象の企業が存在しない場合、undefined を返す", async () => {
      const result = await repository.findByCode("999999");
      expect(result).toStrictEqual(createSuccess(undefined));
    });

    test("企業が存在する場合、企業を返す", async () => {
      const result = await repository.findByCode(companyDummy.code);
      expect(result).toStrictEqual(createSuccess(companyDummy));
    });
  });
});

