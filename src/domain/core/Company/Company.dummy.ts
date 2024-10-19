import { Company } from "./Company";
import { brand } from "@/util/brand";


/**
 * Companyのダミーデータ
 */
const companyId = brand<number, "CompanyId">(1);
const companyName = brand<string, "CompanyName">("テストカンパニー");
const code = brand<string, "Code">("12345678");

export const companyDummy = Company.reconstruct({
  id: companyId,
  name: companyName,
  code: code,
});

export const companyDummies = [
  companyDummy,
  Company.reconstruct({
    id: brand<number, "CompanyId">(2),
    name: brand<string, "CompanyName">("テストカンパニー2"),
    code: brand<string, "Code">("12345679"),
  }),
  Company.reconstruct({
    id: brand<number, "CompanyId">(3),
    name: brand<string, "CompanyName">("テストカンパニー3"),
    code: brand<string, "Code">("12345670"),
  }),
];
