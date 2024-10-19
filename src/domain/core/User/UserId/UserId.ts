import { ValueObject } from "../../shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidUserIdError extends NamedError {
  readonly name = 'InvalidUserIdError';

  constructor(message: string) {
    super(message);
  }
}

type UserIdValue = string;
export class UserId extends ValueObject<UserIdValue, 'UserId'> {
  // UserIdは、NextAuthとPrismaによって自動で作成されるため、柔軟な長さを許容する
  private static readonly MAX_LENGTH = 100;

  constructor(value: UserIdValue) {
    super(value);
  }

  protected validate(value: UserIdValue): void {
    if (value.length > UserId.MAX_LENGTH) {
      throw new InvalidUserIdError(`UserIdは${UserId.MAX_LENGTH}文字以下である必要があります`);
    }
  }
}