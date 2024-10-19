import { Result } from "@/util/result";
import { Company } from "./Company";

export type FindAllCompanyResult = Result<Company[], never>;
export type FindCompanyResult = Result<Company | undefined, never>;
/**
 * CompanyRepository
 */
export interface CompanyRepository {
  findAll(): Promise<FindAllCompanyResult>;
  findById(companyId: number): Promise<FindCompanyResult>;
}
