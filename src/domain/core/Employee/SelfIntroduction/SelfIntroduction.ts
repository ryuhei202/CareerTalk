import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidSelfIntroductionError extends NamedError {
  readonly name = 'InvalidSelfIntroductionError';

  constructor(message: string) {
    super(message);
  }
}

type SelfIntroductionValue = string;
export class SelfIntroduction extends ValueObject<SelfIntroductionValue, "SelfIntroduction"> {
  private static readonly MAX_LENGTH = 1000;

  constructor(value: SelfIntroductionValue = '') {
    super(value);
  }

  protected validate(value: SelfIntroductionValue): void {
    if (value.length > SelfIntroduction.MAX_LENGTH) {
      throw new InvalidSelfIntroductionError(`自己紹介は${SelfIntroduction.MAX_LENGTH}文字以下である必要があります`);
    }
  }
}
