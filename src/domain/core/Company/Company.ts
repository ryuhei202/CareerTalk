import { CompanyName } from "./CompanyName/CompanyName";
import { Code } from "./Code/Code";
import { CompanyId } from "./CompanyId/CompanyId";

/**
 * Companyエンティティ
 */
export class Company {
  private constructor(
    private readonly _id: CompanyId,
    private readonly _name: CompanyName,
    private readonly _code: Code,
  ) {}

  static create(params: {
    id: CompanyId;
    name: CompanyName;
    code: Code;
  }): Company {
    return new Company(
      params.id,
      params.name,
      params.code,
    );
  }
  static reconstruct(params: {
    id: CompanyId;
    name: CompanyName;
    code: Code;
  }): Company {
    return new Company(
      params.id,
      params.name,
      params.code,
    );
  }

  get id(): CompanyId {
    return this._id;
  }

  get name(): CompanyName {
    return this._name;
  }

  get code(): Code {
    return this._code;
  }
}
