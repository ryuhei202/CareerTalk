import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidOccupationNameError extends NamedError {
  readonly name = 'InvalidOccupationNameError';

  constructor(message: string) {
    super(message);
  }
}

type OccupationNameValue = string;
export class OccupationName extends ValueObject<OccupationNameValue, 'OccupationName'> {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 100;
  
  constructor(value: OccupationNameValue) {
    super(value);
  }
  
  protected validate(value: OccupationNameValue): void {
    if (value.length < OccupationName.MIN_LENGTH || value.length > OccupationName.MAX_LENGTH) {
      throw new InvalidOccupationNameError(`職種名は${OccupationName.MIN_LENGTH}文字以上${OccupationName.MAX_LENGTH}文字以下である必要があります`);
    }
  }
}

