import { Result } from "@/util/result";
import { Company } from "./Company";

export type FindCompanyResult = Result<Company | undefined, never>;

/**
 * CompanyRepository
 */
export interface ICompanyRepository {
  findById(companyId: number): Promise<FindCompanyResult>;
}
