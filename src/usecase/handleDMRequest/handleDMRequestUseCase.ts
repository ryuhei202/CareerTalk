import "server-only";
import type { HandleDMRequestParams } from "@/app/(site)/employee/matches/detail/[applicantUserId]/_actions/handleDMRequestAction";
import type { ConversationDomainError } from "@/domain/core/Conversation/Conversation";
import type { ConversationStatusEnum } from "@/domain/core/Conversation/ConversationEnum";
import {
	type InvalidHandleDMRequestInputError,
	validateHandleDMRequestInput,
} from "@/domain/core/Conversation/services/validateHandleDMRequestInput";
import { getZodErrorMessages } from "@/util/error";
import { type Result, createFailure, createSuccess } from "@/util/result";
import { ZodError } from "zod";
import { handleDMRequest } from "./handleDMRequest";
import { validateHandleDMRequestParams } from "./validateHandleDMRequestParams";

export interface HandleDMRequestUseCaseResponse {
	conversationStatus: ConversationStatusEnum;
}
type HandleDMRequestUseCaseResult = Result<
	HandleDMRequestUseCaseResponse,
	undefined
>;
export const handleDMRequestUseCase = async (
	params: HandleDMRequestParams,
): Promise<HandleDMRequestUseCaseResult> => {
	try {
		// パラメーターのバリデーション
		const validatedParams = await validateHandleDMRequestParams(params);

		// ドメインサービス1 インプットのバリデーション
		const validatedDMRequest =
			await validateHandleDMRequestInput(validatedParams);

		// ドメインサービス2 DMリクエストの承認
		const handledDMRequest = await handleDMRequest(validatedDMRequest);
		if (handledDMRequest == null) {
			return createFailure({
				message: "DMリクエストの処理に失敗しました",
				data: undefined,
			});
		}

		return createSuccess({
			message: "DMリクエストの処理に成功しました",
			data: handledDMRequest,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			return createFailure({
				message: getZodErrorMessages(error),
				data: undefined,
			});
		}
		return createFailure({
			message: (
				error as InvalidHandleDMRequestInputError | ConversationDomainError
			).message,
			data: undefined,
		});
	}
};
