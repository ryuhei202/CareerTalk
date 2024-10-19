import { createId } from "@paralleldrive/cuid2";
import { NamedError } from "@/util/error";
import { ValueObject } from "../../shared/ValueObject";

export class InvalidEmployeeIdError extends NamedError {
  readonly name = 'InvalidEmployeeIdError';

  constructor(message: string) {
    super(message);
  }
}

type EmployeeIdValue = string;
export class EmployeeId extends ValueObject<EmployeeIdValue, 'EmployeeId'> {
  private static readonly LENGTH = 24;

  constructor(value: EmployeeIdValue = createId()) {
    super(value);
  }

  protected validate(value: EmployeeIdValue): void {
    if (value.length !== EmployeeId.LENGTH) {
      throw new InvalidEmployeeIdError(`EmployeeIdは${EmployeeId.LENGTH}文字である必要があります`);
    }
  }
}
