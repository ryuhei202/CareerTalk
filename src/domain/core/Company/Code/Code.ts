import { NamedError } from "@/util/error";
import { ValueObject } from "../../shared/ValueObject";

export class InvalidCodeError extends NamedError {
  readonly name = 'InvalidCodeError';

  constructor(message: string) {
    super(message);
  }
}

type CodeValue = string;
export class Code extends ValueObject<CodeValue, 'Code'> {
  private static readonly LENGTH = 8;

  constructor(value: CodeValue) {
    super(value);
  }

  protected validate(value: CodeValue): void {
    if (value.length !== Code.LENGTH) {
      throw new InvalidCodeError(`Codeは${Code.LENGTH}文字である必要があります`);
    }
  }
}
