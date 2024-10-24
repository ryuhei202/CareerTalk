import { init } from "@paralleldrive/cuid2";

export const createId = init({
	length: 25, // IDの長さを25文字に設定
});
