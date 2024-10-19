import { Company } from "./Company";
import { brand } from "@/util/brand";


/**
 * Companyのダミーデータ
 */
const companyId = brand<number, "CompanyId">(1);
const companyName = brand<string, "CompanyName">("テスト企業");
const code = brand<string, "Code">("a".repeat(8));

export const companyDummy = Company.reconstruct({
  id: companyId,
  name: companyName,
  code: code,
});
