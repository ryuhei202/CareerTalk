
import { Company } from "@/domain/core/Company/Company";
import { CompanyRepository, FindAllCompanyResult, FindCompanyResult } from "@/domain/core/Company/CompanyRepository";
import { brand } from "@/util/brand";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<FindAllCompanyResult> {
    const companies = await this.prisma.company.findMany();
    const companyData = companies.map((company) => {
      return Company.reconstruct({
        id: brand<number, "CompanyId">(company.id),
        name: brand<string, "CompanyName">(company.name),
        code: brand<string, "Code">(company.code),
      });
    });
    return createSuccess(companyData);
  }

  async findById(companyId: number): Promise<FindCompanyResult> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (company == null) {
      return createSuccess(undefined);
    }

    const companyData = Company.reconstruct({
      id: brand<number, "CompanyId">(company.id),
      name: brand<string, "CompanyName">(company.name),
      code: brand<string, "Code">(company.code),
    });

    return createSuccess(companyData);
  }
}
