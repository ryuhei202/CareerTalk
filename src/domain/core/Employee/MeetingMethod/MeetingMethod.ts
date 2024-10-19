import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidMeetingMethodError extends NamedError {
  readonly name = 'InvalidMeetingMethodError';

  constructor(message: string) {
    super(message);
  }
}

export enum MeetingMethodEnum {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BOTH = "BOTH",
}

export type MeetingMethodLabel = "オンライン" | "オフライン" | "オンライン/オフライン";

type MeetingMethodValue = MeetingMethodEnum | undefined;
export class MeetingMethod extends ValueObject<MeetingMethodValue, "MeetingMethod"> {
  constructor(value: MeetingMethodValue) {
    super(value);
  }

  protected validate(value: MeetingMethodValue): void {
    if (value == null) {
      return;
    }
    if (!Object.values(MeetingMethodEnum).includes(value)) {
      throw new InvalidMeetingMethodError("無効な訪問方法です");
    }
  }

  toLabel(): MeetingMethodLabel | undefined {
    if (this.value == null) {
      return undefined;
    }
    switch (this.value) {
      case MeetingMethodEnum.ONLINE:
        return "オンライン";
      case MeetingMethodEnum.OFFLINE:
        return "オフライン";
      case MeetingMethodEnum.BOTH:
        return "オンライン/オフライン";
    }
  }
}
