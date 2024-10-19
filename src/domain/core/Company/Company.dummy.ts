import { Company } from "./Company";
import { CompanyId } from "./CompanyId/CompanyId";
import { CompanyName } from "./CompanyName/CompanyName";
import { Code } from "./Code/Code";

export const companyDummy = Company.create({
  id: new CompanyId(1),
  name: new CompanyName("テスト企業"),
  code: new Code("a".repeat(8)),
});
