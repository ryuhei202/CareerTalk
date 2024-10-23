import { Company, CompanyParams } from "../Company";

/**
 * Companyのダミーデータ
 */
const companyId = 1;
const companyName = "テストカンパニー";
const companyCode = "12345678";

export const companyDummyParams: CompanyParams = {
  id: companyId,
  name: companyName,
  code: companyCode,
};
export const companyDummy = Company.create(companyDummyParams);

export const companyDummies = [
  companyDummy,
  Company.create({
    id: 2,
    name: "テストカンパニー2",
    code: "12345679",
  }),
  Company.create({
    id: 3,
    name: "テストカンパニー3",
    code: "12345670",
  }),
];
