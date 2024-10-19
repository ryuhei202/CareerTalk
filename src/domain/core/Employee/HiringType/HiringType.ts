import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidHiringTypeError extends NamedError {
  readonly name = 'InvalidHiringTypeError';

  constructor(message: string) {
    super(message);
  }
}
export enum HiringTypeEnum {
  NEW_GRADUATE = "NEW_GRADUATE",
  MID_CAREER = "MID_CAREER",
}

export type HiringTypeLabel = "新卒採用" | "中途採用";

type HiringTypeValue = HiringTypeEnum | undefined;
export class HiringType extends ValueObject<HiringTypeValue, "HiringType"> {
  constructor(value: HiringTypeValue) {
    super(value);
  }

  protected validate(value: HiringTypeValue): void {
    if (value == null) {
      return;
    }
    if (!Object.values(HiringTypeEnum).includes(value)) {
      throw new InvalidHiringTypeError("無効な採用タイプです");
    }
  }

  toLabel(): HiringTypeLabel | undefined {
    if (this.value == null) {
      return undefined;
    }

    switch (this.value) {
      case HiringTypeEnum.NEW_GRADUATE:
        return "新卒採用";
      case HiringTypeEnum.MID_CAREER:
        return "中途採用";
    }
  }
}
