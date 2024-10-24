import type { Result } from "@/util/result";
import type { Company } from "../Company";

export type FindCompanyResult = Result<Company | undefined, never>;
/**
 * CompanyRepository
 */
export interface CompanyRepository {
	findById(companyId: number): Promise<FindCompanyResult>;
	findByCode(companyCode: string): Promise<FindCompanyResult>;
}
