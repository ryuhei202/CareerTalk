import { createId } from "@paralleldrive/cuid2";
import { ValueObject } from "../../shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidCompanyIdError extends NamedError {
  readonly name = 'InvalidCompanyIdError';

  constructor(message: string) {
    super(message);
  }
}

type CompanyIdValue = number;
export class CompanyId extends ValueObject<CompanyIdValue, 'CompanyId'> {
  private static readonly MIN_LENGTH = 1;

  constructor(value: CompanyIdValue ) {
    super(value);
  }

  protected validate(value: CompanyIdValue): void {
    if (value < CompanyId.MIN_LENGTH) {
      throw new InvalidCompanyIdError(`CompanyIdは${CompanyId.MIN_LENGTH}以上の整数である必要があります`);
    }
  }
}