
import { Company } from "@/domain/core/Company/Company";
import { CompanyRepository, FindAllCompanyResult, FindCompanyResult } from "@/domain/core/Company/repository/CompanyRepository";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<FindAllCompanyResult> {
    const companies = await this.prisma.company.findMany();
    const companyData = companies.map((company) => {
      return Company.create({
        id: company.id,
        name: company.name,
        code: company.code,
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

    const companyData = Company.create({
      id: company.id,
      name: company.name,
      code: company.code,
    });

    return createSuccess(companyData);
  }

  async findByCode(companyCode: string): Promise<FindCompanyResult> {
    const company = await this.prisma.company.findUnique({
      where: { code: companyCode },
    });
    if (company == null) {
      return createSuccess(undefined);
    }

    const companyData = Company.create({
      id: company.id,
      name: company.name,
      code: company.code,
    });
    return createSuccess(companyData);
  }
}