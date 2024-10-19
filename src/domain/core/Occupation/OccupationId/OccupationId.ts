import { createId } from "@paralleldrive/cuid2";
import { ValueObject } from "../../shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidOccupationIdError extends NamedError {
  readonly name = 'InvalidOccupationIdError';

  constructor(message: string) {
    super(message);
  }
}

type OccupationIdValue = number;
export class OccupationId extends ValueObject<OccupationIdValue, 'OccupationId'> {
  private static readonly MIN_VALUE = 1;

  constructor(value: OccupationIdValue) {
    super(value);
  }

  protected validate(value: OccupationIdValue): void {
    if (value < OccupationId.MIN_VALUE) {
      throw new InvalidOccupationIdError(`職種のIDは${OccupationId.MIN_VALUE}以上である必要があります`);
    }
  }
}

