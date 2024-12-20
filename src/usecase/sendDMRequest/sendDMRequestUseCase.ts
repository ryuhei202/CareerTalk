import "server-only";
import type { SendDMRequestParams } from "@/app/(site)/applicant/search_employees/detail/[employeeUserId]/actions/sendDMRequestAction";
import { createConversation } from "@/domain/core/Conversation/services/createConversation";
import {
	type InvalidSendDMRequestInputError,
	validateSendDMRequestInput,
} from "@/domain/core/Conversation/services/validateSendDMRequestInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { validateSendDMRequestParams } from "./validateSendDMRequestParams";

type SendDMRequestUseCaseResult = Result<undefined, undefined>;
export const sendDMRequestUseCase = async (
	params: SendDMRequestParams,
): Promise<SendDMRequestUseCaseResult> => {
	try {
		// パラメーターのバリデーション
		const validatedParams = await validateSendDMRequestParams(params);

		// ドメインサービス1 インプットのバリデーション
		const validatedConversation =
			await validateSendDMRequestInput(validatedParams);

		// ドメインサービス2 DMリクエストの送信
		const createdConversation = await createConversation(validatedConversation);
		if (createdConversation == null) {
			return createFailure({
				message: "DMリクエストの送信に失敗しました",
				data: undefined,
			});
		}

		return createSuccess({
			message: "DMリクエストの送信に成功しました",
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
			message: (error as InvalidSendDMRequestInputError).message,
			data: undefined,
		});
	}
};
