import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidStatusError extends NamedError {
  readonly name = 'InvalidStatusError';

  constructor(message: string) {
    super(message);
  }
}

export enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type StatusLabel = "審査中" | "承認済み" | "拒否";

type StatusValue = StatusEnum;
export class Status extends ValueObject<StatusValue, "Status"> {
  constructor(value: StatusValue = StatusEnum.PENDING) {
    super(value);
  }

  protected validate(value: StatusValue): void {
    if (!Object.values(StatusEnum).includes(value)) {
      throw new InvalidStatusError("無効なステータスです");
    }
  }

  toLabel(): StatusLabel {
    switch (this._value) {
      case StatusEnum.PENDING:
        return "審査中";
      case StatusEnum.APPROVED:
        return "承認済み";
      case StatusEnum.REJECTED:
        return "拒否";
    }
  }
}
