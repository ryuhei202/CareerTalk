import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidTalkableTopicsError extends NamedError {
  readonly name = 'InvalidTalkableTopicsError';

  constructor(message: string) {
    super(message);
  }
}

type TalkableTopicsValue = string;
export class TalkableTopics extends ValueObject<TalkableTopicsValue, 'TalkableTopics'> {
  private static readonly MAX_LENGTH = 1000;

  constructor(value: TalkableTopicsValue = '') {
    super(value);
  }

  protected validate(value: TalkableTopicsValue): void {
    if (value.length > TalkableTopics.MAX_LENGTH) {
      throw new InvalidTalkableTopicsError(`話せる内容は${TalkableTopics.MAX_LENGTH}文字以下である必要があります`);
    }
  }
}
