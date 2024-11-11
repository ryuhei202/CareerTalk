import {
	type UpdateMessageIsReadError,
	updateMessageIsRead,
} from "@/domain/core/Conversation/Message/services/updateMessageIsRead";
import { getZodErrorMessages } from "@/util/error";
import { createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateChangeMessageIsReadUseCaseParams } from "./validateChangeMessageIsReadUseCaseParams";

export interface ChangeMessageIsReadParams {
	conversationId: string;
	userId: string;
}
export const changeMessageIsReadUseCase = async (
	params: ChangeMessageIsReadParams,
) => {
	try {
		const validatedParams = validateChangeMessageIsReadUseCaseParams(params);
		await updateMessageIsRead(validatedParams);

		return createSuccess({
			message: "メッセージの既読状態の更新に成功しました",
			data: undefined,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (error as UpdateMessageIsReadError).message,
			data: undefined,
		});
	}
};
