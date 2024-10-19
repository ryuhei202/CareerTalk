import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidUserNameError extends NamedError {
  readonly name = 'InvalidUserNameError';

  constructor(message: string) {
    super(message);
  }
}

type UserNameValue = string | undefined;
export class UserName extends ValueObject<UserNameValue, 'UserName'> {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 100;

  constructor(value: UserNameValue = "") {
    super(value);
  }

  protected validate(value: UserNameValue): void {
    if (value == undefined) {
      return;
    }
    if (value.length < UserName.MIN_LENGTH || value.length > UserName.MAX_LENGTH) {
      throw new InvalidUserNameError(`名前は${UserName.MIN_LENGTH}文字以上${UserName.MAX_LENGTH}文字以下である必要があります`);
    }
   }
  }
