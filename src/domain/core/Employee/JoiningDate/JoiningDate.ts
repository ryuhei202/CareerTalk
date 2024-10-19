import { ValueObject } from "../../shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidJoiningDateError extends NamedError {
  readonly name = 'InvalidJoiningDateError';

  constructor(message: string) {
    super(message);
  }
}

type JoiningDateValue = Date;
export class JoiningDate extends ValueObject<JoiningDateValue, 'JoiningDate'> {
  constructor(value: JoiningDateValue) {
    super(value);
  }

  protected validate(value: JoiningDateValue): void {
    if (!this.isValid(value)) {
      throw new InvalidJoiningDateError("無効な入社日です");
    }
  }

  private isValid(date: JoiningDateValue): boolean {
    const now = new Date();
    return date <= now;
  }

  getYearOfExperience(): number {
    const year = this.value.getFullYear();
    return new Date().getFullYear() - year + 1;
  }
}
