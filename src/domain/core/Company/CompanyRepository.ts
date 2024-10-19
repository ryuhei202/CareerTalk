import { Result } from "@/util/result";
import { Company } from "./Company";

export type FindCompanyResult = Result<Company | undefined, never>;
export type SaveCompanyResult = Result<void, never>;
export interface CompanyRepository {
  save(company: Company): Promise<SaveCompanyResult>;
  findById(companyId: number): Promise<FindCompanyResult>;
}
