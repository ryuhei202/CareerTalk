declare const brandSymbol: unique symbol;

/**
 * TypeScript で Nominal Typing を行うためのユーティリティ型
 *
 * @see https://zenn.dev/okunokentaro/articles/01gmpkp9gzfyr1za5wvrxt0vy6
 * @see https://twitter.com/mattpocockuk/status/1625173884885401600
 */
export type Branded<T, TBrand extends string> = T & {
  [brandSymbol]: TBrand;
};

export const brand = <T, TBrand extends string>(value: T): Branded<T, TBrand> =>
  value as Branded<T, TBrand>;
