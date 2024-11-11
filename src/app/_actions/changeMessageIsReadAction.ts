"use server";

import { getServerSession } from "@/lib/auth";
import { changeMessageIsReadUseCase } from "@/usecase/changeMessageIsRead/changeMessageIsReadUseCase";
import { revalidatePath } from "next/cache";

export const changeMessageIsReadAction = async (
	conversationId: string,
	isApplicant: boolean,
	partnerUserId: string,
) => {
	const session = await getServerSession();
	if (!session) {
		return {
			success: false,
			message: "Unauthorized Error",
			data: undefined,
		};
	}

	const useCaseResult = await changeMessageIsReadUseCase({
		conversationId,
		userId: session.user.id,
	});

	if (useCaseResult.success) {
		revalidatePath(`/${isApplicant ? "applicant" : "employee"}/chat`);
		revalidatePath(
			`/${isApplicant ? "applicant" : "employee"}/chat/@dm/${partnerUserId}`,
		);
	} else {
		return {
			success: false,
			message: useCaseResult.message,
			data: undefined,
		};
	}

	return useCaseResult;
};
