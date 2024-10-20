import { Company } from "./Company";

/**
 * Companyのダミーデータ
 */
export const companyDummy = Company.create({
  id: 1,
  name: "テストカンパニー",
  code: "12345678",
});

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
