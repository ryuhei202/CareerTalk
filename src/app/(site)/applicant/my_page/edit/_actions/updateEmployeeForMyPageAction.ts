"use server";
import { getServerSession } from "@/lib/auth";
import {
	type UpdateApplicantUseCaseResult,
	updateApplicantForMyPageUseCase,
} from "@/usecase/updateApplicantForMyPage/updateApplicantForMyPageUseCase";
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { updateApplicantForMyPageSchema } from "../_schema/updateApplicantForMyPageSchema";

export type UpdateApplicantForMyPageActionResult = {
	result: UpdateApplicantUseCaseResult | null;
	submission: SubmissionResult<string[]>;
} | null;

export type UpdateApplicantForMyPageParams = {
	userId: string;
	occupationId: number;
	selfIntroduction?: string;
	joiningDate?: Date;
	workHistory?: string;
	company?: string;
	education?: string;
	imageBase64?: string;
};

export async function updateApplicantForMyPageAction(
	_prevState: UpdateApplicantForMyPageActionResult,
	formData: FormData,
): Promise<UpdateApplicantForMyPageActionResult> {
	const session = await getServerSession();
	if (!session) {
		redirect("/signin");
	}

	const submission = parseWithZod(formData, {
		schema: updateApplicantForMyPageSchema,
	});

	if (submission.status !== "success") {
		return {
			result: null,
			submission: submission.reply(),
		};
	}

	const userId = session.user.id;
	const occupationId = formData.get("occupation");
	const selfIntroduction = formData.get("selfIntroduction");
	const joiningDate = formData.get("joiningDate");
	const workHistory = formData.get("workHistory");
	const company = formData.get("company");
	const education = formData.get("education");
	const imageBase64 = formData.get("imageBase64");

	const applicantData: UpdateApplicantForMyPageParams = {
		userId: userId,
		occupationId: Number(occupationId),
		selfIntroduction: (selfIntroduction as string) ?? undefined,
		joiningDate: joiningDate ? new Date(joiningDate as string) : undefined,
		workHistory: (workHistory as string) ?? undefined,
		company: (company as string) ?? undefined,
		education: (education as string) ?? undefined,
		imageBase64: (imageBase64 as string) ?? undefined,
	};

	// TODO: Add updateEmployeeForMyPageUseCase call here
	const useCaseResult = await updateApplicantForMyPageUseCase(applicantData);

	if (useCaseResult.success) {
		redirect("/applicant/my_page");
	} else {
		return {
			result: useCaseResult,
			submission: submission.reply(),
		};
	}
}
