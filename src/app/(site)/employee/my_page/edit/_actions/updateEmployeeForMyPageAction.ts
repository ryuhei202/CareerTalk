"use server";
import { getEmployeeUserId } from "@/lib/auth";
import { updateEmployeeForMyPageUseCase } from "@/usecase/updateEmployeeForMyPage/updateEmployeeForMyPageUseCase";
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { updateEmployeeSchema } from "../_schema/updateEmployeeSchema";

export type UpdateEmployeeForMyPageActionResult = {
	success: boolean;
	message: string;
	submission: SubmissionResult<string[]>;
};

export type UpdateEmployeeForMyPageParams = {
	userId: string;
	occupationId: number; // stringからnumberに変更
	hiringType?: string;
	workLocationId?: number; // 追加
	meetingMethod?: string;
	talkableTopics?: string;
	selfIntroduction?: string;
	careerDescription?: string;
	jobDescription?: string;
	joiningDescription?: string;
	otherDescription?: string;
};

export async function updateEmployeeForMyPageAction(
	prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: updateEmployeeSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const employeeData: UpdateEmployeeForMyPageParams = {
		userId: (await getEmployeeUserId()) as string,
		occupationId: Number(formData.get("occupation")), // occupationからoccupationIdに変更し、Number型に変換
		hiringType: formData.get("hiringType") as string | undefined,
		workLocationId: formData.get("workLocation")
			? Number(formData.get("workLocation"))
			: undefined,
		meetingMethod: formData.get("meetingMethod") as string | undefined,
		talkableTopics: formData.get("talkableTopics") as string | undefined,
		selfIntroduction: formData.get("selfIntroduction") as string | undefined,
		careerDescription: formData.get("careerDescription") as string | undefined,
		jobDescription: formData.get("jobDescription") as string | undefined,
		joiningDescription: formData.get("joiningDescription") as
			| string
			| undefined,
		otherDescription: formData.get("otherDescription") as string | undefined,
	};

	// TODO: Add updateEmployeeForMyPageUseCase call here
	const useCaseResult = await updateEmployeeForMyPageUseCase(employeeData);

	if (useCaseResult.success) {
		redirect("/employee/my_page");
	} else {
		return submission.reply();
	}
}
