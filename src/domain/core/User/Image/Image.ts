import { ValueObject } from "@/domain/core/shared/ValueObject";
import { NamedError } from "@/util/error";

export class InvalidImageError extends NamedError {
  readonly name = 'InvalidImageError';

  constructor(message: string) {
    super(message);
  }
}

type ImageValue = string | undefined;
export class Image extends ValueObject<ImageValue, 'Image'> {
  private static readonly MIN_LENGTH = 1;
  private static readonly VALID_PROTOCOLS = ['https://', 'http://'];

  constructor(value: ImageValue ) {
    super(value);
  }

  protected validate(value: ImageValue): void {
    if (value == undefined) {
      return;
    }
    if (value.length < Image.MIN_LENGTH) {
      throw new InvalidImageError(`画像URLは少なくとも${Image.MIN_LENGTH}文字以上である必要があります`);
    }
    if (!this.isValidUrl(value)) {
      throw new InvalidImageError('無効な画像URLです');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return Image.VALID_PROTOCOLS.some(protocol => url.startsWith(protocol));
    } catch {
      return false;
    }
  }
}
