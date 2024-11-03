"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { updateEmployeeSchema } from "../_schema/updateEmployeeSchema";

export interface RegisterEmployeeParams {
	occupationId: number;
	hiringType?: string;
	workLocationId?: number;
	meetingMethod?: string;
	talkableTopics?: string;
	selfIntroduction?: string;
}

export async function updateEmployeeAction(
	prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: updateEmployeeSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const employeeData: RegisterEmployeeParams = {
		occupationId: Number(formData.get("occupationId")),
		hiringType: formData.get("hiringType") as string | undefined,
		workLocationId: formData.get("workLocationId")
			? Number(formData.get("workLocationId"))
			: undefined,
		meetingMethod: formData.get("meetingMethod") as string | undefined,
		talkableTopics: formData.get("talkableTopics") as string | undefined,
		selfIntroduction: formData.get("selfIntroduction") as string | undefined,
	};

	redirect("/employee/my_page");
}
