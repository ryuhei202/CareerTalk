import type { ZodError } from "zod";

export abstract class NamedError extends Error {
	abstract readonly name: string;

	/**
	 * Nominal Typing を行うためのフィールド
	 *
	 * @see https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping
	 * @see https://scrapbox.io/mrsekut-p/branded_types
	 */
	readonly __namedErrorBrand = Symbol("NamedError");
}

/**
 * Zodのエラーメッセージを取得する
 * @param error Zodのエラー
 * @returns エラーメッセージ
 * @see https://zod.dev/ERROR_HANDLING?id=a-demonstrative-example
 * errorの配列の中のmessageをjoinして返却する
 */
export const getZodErrorMessages = (error: ZodError): string => {
	return error.errors.map((e) => e.message).join(", ");
};
