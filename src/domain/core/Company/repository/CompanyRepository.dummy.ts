import { createSuccess } from "@/util/result";
import { CompanyRepository, FindAllCompanyResult, FindCompanyResult } from "./CompanyRepository";
import { companyDummies, companyDummy } from "../Company.dummy";

export class CompanyRepositoryDummy implements CompanyRepository {
  constructor(
    readonly findAllReturnValue?: FindAllCompanyResult,
    readonly findByIdReturnValue?: FindCompanyResult,
    readonly findByCodeReturnValue?: FindCompanyResult,
  ) {}

  async findAll(): Promise<FindAllCompanyResult> {
    return this.findAllReturnValue ?? createSuccess(companyDummies);
  }

  async findById(_companyId: number): Promise<FindCompanyResult> {
    return this.findByIdReturnValue ?? createSuccess(companyDummy);
  }

  async findByCode(_companyCode: string): Promise<FindCompanyResult> {
    return this.findByCodeReturnValue ?? createSuccess(companyDummy);
  }
}
