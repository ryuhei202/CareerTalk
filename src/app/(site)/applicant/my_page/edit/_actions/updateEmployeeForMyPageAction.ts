"use server";
import { getApplicantUserId } from "@/lib/auth";
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
};

export async function updateApplicantForMyPageAction(
	_prevState: UpdateApplicantForMyPageActionResult,
	formData: FormData,
): Promise<UpdateApplicantForMyPageActionResult> {
	const submission = parseWithZod(formData, {
		schema: updateApplicantForMyPageSchema,
	});

	if (submission.status !== "success") {
		return {
			result: null,
			submission: submission.reply(),
		};
	}
	const applicantData: UpdateApplicantForMyPageParams = {
		userId: (await getApplicantUserId()) as string,
		occupationId: Number(formData.get("occupation")),
		selfIntroduction: formData.get("selfIntroduction") as string | undefined,
		joiningDate: formData.get("joiningDate")
			? new Date(formData.get("joiningDate") as string)
			: undefined,
		workHistory: formData.get("workHistory") as string | undefined,
		company: formData.get("company") as string | undefined,
		education: formData.get("education") as string | undefined,
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
