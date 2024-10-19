
import { NamedError } from "@/util/error";
import { ValueObject } from "../../shared/ValueObject";

export class InvalidWorkLocationIdError extends NamedError {
  readonly name = 'InvalidWorkLocationIdError';

  constructor(message: string) {
    super(message);
  }
}

type WorkLocationIdValue = number | undefined;
export class WorkLocationId extends ValueObject<WorkLocationIdValue, 'WorkLocationId'> {
  private static readonly MIN_VALUE = 1;

  constructor(value: WorkLocationIdValue) {
    super(value);
  }

  protected validate(value: WorkLocationIdValue): void {
    if (value === undefined) {
      return;
    }
    if (value < WorkLocationId.MIN_VALUE) {
      throw new InvalidWorkLocationIdError('勤務地は1以上の整数である必要があります');
    }
  }
}
