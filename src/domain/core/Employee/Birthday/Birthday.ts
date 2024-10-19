import { ValueObject } from "../../shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidBirthdayError extends NamedError {
  readonly name = 'InvalidBirthdayError';

  constructor(message: string) {
    super(message);
  }
}

type BirthdayValue = Date | undefined;
export class Birthday extends ValueObject<BirthdayValue, 'Birthday'> {
  constructor(value: BirthdayValue) {
    super(value);
  }

  protected validate(value: BirthdayValue): void {
    if (value == null) {
      return;
    }

    if (!this.isValid(value)) {
      throw new InvalidBirthdayError('無効な生年月日です');
    }
  }

  private isValid(date: Date): boolean {
    const now = new Date();
    const minDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
    return date <= now && date >= minDate;
  }

  toString(): string {
    return this.value?.toISOString().split('T')[0] ?? '';
  }
}
