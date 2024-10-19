import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidCompanyNameError extends NamedError {
  readonly name = 'InvalidCompanyNameError';

  constructor(message: string) {
    super(message);
  }
}

type CompanyNameValue = string;
export class CompanyName extends ValueObject<CompanyNameValue, 'CompanyName'> {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 100;

  constructor(value: CompanyNameValue) {
    super(value);
  }

  protected validate(value: CompanyNameValue): void {
    if (value.length < CompanyName.MIN_LENGTH || value.length > CompanyName.MAX_LENGTH) {
      throw new InvalidCompanyNameError(`企業名は${CompanyName.MIN_LENGTH}文字以上${CompanyName.MAX_LENGTH}文字以下である必要があります`);
    }
  }
}
