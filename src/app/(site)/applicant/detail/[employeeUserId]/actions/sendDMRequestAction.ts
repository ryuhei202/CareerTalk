"use server";

import { getServerSession } from "@/lib/auth";
import { sendDMRequestUseCase } from "@/usecase/sendDMRequestUseCase";
import { revalidatePath } from "next/cache";
import type { FormState } from "../../../create_profile/_components/CreateApplicantProfileContainer";

export interface SendDMRequestParams {
	employeeUserId: string;
	applicantUserId: string;
	conversationPurposeId: number;
	message?: string;
}

export async function sendDMRequestAction(
	_prevState: FormState,
	employeeUserId: string,
	formData: FormData,
) {
	const session = await getServerSession();
	if (!session) {
		return {
			success: false,
			message: "Unauthorized Error",
			data: undefined,
		};
	}

	const conversationPurposeId = formData.get("conversationPurposeId");
	const message = formData.get("message");
	const formDataObject = Object.fromEntries(formData.entries());

	const useCaseParams: SendDMRequestParams = {
		applicantUserId: session.user.id as string,
		employeeUserId: employeeUserId as string,
		conversationPurposeId: Number.parseInt(conversationPurposeId as string),
		message: (message as string) || undefined,
	};

	console.log("useCaseParams", useCaseParams);
	const useCaseResult = await sendDMRequestUseCase(useCaseParams);

	console.log("useCaseResult", useCaseResult);
	if (!useCaseResult.success) {
		return {
			success: false,
			message: useCaseResult.message,
			data: formDataObject,
		};
	}

	// 検索ページのキャッシュを無効化
	revalidatePath("/applicant/search_employees");

	return {
		success: true,
		message: useCaseResult.message,
		data: formDataObject,
	};
}
