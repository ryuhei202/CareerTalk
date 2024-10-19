import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidGenderError extends NamedError {
  readonly name = 'InvalidGenderError';

  constructor(message: string) {
    super(message);
  }
}

export enum GenderEnum {
  OTHER = "OTHER",
  MALE = "MALE",
  FEMALE = "FEMALE",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export type GenderLabel = "その他" | "男性" | "女性" | "回答しない";

type GenderValue = GenderEnum | undefined;
export class Gender extends ValueObject<GenderValue, "Gender"> {
  constructor(value: GenderValue) {
    super(value);
  }

  protected validate(value: GenderValue): void {
    if (value == null) {
      return;
    }
    if (!Object.values(GenderEnum).includes(value)) {
      throw new InvalidGenderError("無効な性別です");
    }
  }

  toLabel(): GenderLabel | undefined {
    if (this._value == null) {
      return undefined;
    }
    switch (this._value) {
      case GenderEnum.OTHER:
        return "その他";
      case GenderEnum.MALE:
        return "男性";
      case GenderEnum.FEMALE:
        return "女性";
      case GenderEnum.PREFER_NOT_TO_SAY:
        return "回答しない";
    }
  }
}


