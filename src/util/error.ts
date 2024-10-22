export abstract class NamedError extends Error {
  abstract readonly name: string;

  /**
   * Nominal Typing を行うためのフィールド
   *
   * @see https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping
   * @see https://scrapbox.io/mrsekut-p/branded_types
   */
  readonly __namedErrorBrand = Symbol('NamedError');
}
