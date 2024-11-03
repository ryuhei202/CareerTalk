"use server";

import { getServerSession } from "@/lib/auth";
import { handleDMRequestUseCase } from "@/usecase/handleDMRequest/handleDMRequestUseCase";
import { revalidatePath } from "next/cache";
import type { FormState } from "../_components/ApplicantCardContainer";

export interface HandleDMRequestParams {
	applicantUserId: string;
	employeeUserId: string;
	isApprove: boolean;
}

export async function handleDMRequestAction(
	_prevState: FormState,
	applicantUserId: string,
	isApprove: boolean,
) {
	const session = await getServerSession();
	if (!session) {
		return {
			success: false,
			message: "Unauthorized Error",
			data: undefined,
		};
	}

	const useCaseParams: HandleDMRequestParams = {
		applicantUserId,
		employeeUserId: session.user.id as string,
		isApprove,
	};

	const useCaseResult = await handleDMRequestUseCase(useCaseParams);

	if (!useCaseResult.success) {
		return {
			success: false,
			message: useCaseResult.message,
			data: undefined,
		};
	}

	// マッチングページのキャッシュを無効化
	revalidatePath("/employee/matches");

	return {
		success: true,
		message: useCaseResult.message,
		data: useCaseResult.data,
	};
}
