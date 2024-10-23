import { createSuccess } from "@/util/result";
import { CompanyRepository, FindAllCompanyResult, FindCompanyResult } from "./CompanyRepository";
import { companyDummies, companyDummy } from "../test/Company.dummy";

export class CompanyRepositoryDummy implements CompanyRepository {
  constructor(
    readonly findAllReturnValue?: FindAllCompanyResult,
    readonly findByIdReturnValue?: FindCompanyResult,
    readonly findByCodeReturnValue?: FindCompanyResult,
  ) {}

  async findAll(): Promise<FindAllCompanyResult> {
    return this.findAllReturnValue ?? createSuccess(companyDummies);
  }

  async findById(): Promise<FindCompanyResult> {
    return this.findByIdReturnValue ?? createSuccess(companyDummy);
  }

  async findByCode(): Promise<FindCompanyResult> {
    return this.findByCodeReturnValue ?? createSuccess(companyDummy);
  }
}
