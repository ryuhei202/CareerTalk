import { Code } from "@/domain/core/Company/Code/Code";
import { Company } from "@/domain/core/Company/Company";
import { CompanyId } from "@/domain/core/Company/CompanyId/CompanyId";
import { CompanyName } from "@/domain/core/Company/CompanyName/CompanyName";
import { CompanyRepository, FindCompanyResult, SaveCompanyResult } from "@/domain/core/Company/CompanyRepository";
import { createSuccess } from "@/util/result";
import { PrismaClient } from "@prisma/client";

export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(companyId: number): Promise<FindCompanyResult> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (company == null) {
      return createSuccess(undefined);
    }

    const companyData = Company.reconstruct({
      id: new CompanyId(company.id),
      name: new CompanyName(company.name),
      code: new Code(company.code),
    });

    return createSuccess(companyData);
  }

  async save(company: Company): Promise<SaveCompanyResult> {
    await this.prisma.company.create({
      data: {
        id: company.id.value,
        name: company.name.value,
        code: company.code.value,
      },
    });

    return createSuccess(undefined);  
  }
}
