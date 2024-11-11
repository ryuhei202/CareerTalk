"use server";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { StatusLabel } from "@/domain/shared/Status";
import { getServerSession } from "@/lib/auth";
import { registerApplicantUseCase } from "@/usecase/registerApplicant/registerApplicantUseCase";
import { redirect } from "next/navigation";
import type { FormState } from "../_components/CreateApplicantProfileContainer";

export type CreatedApplicantResponse = {
	id: string;
	name: string;
	userId: string;
	occupationId: number;
	gender: GenderLabel;
	yearsOfExperience: number;
	status: StatusLabel;
	age?: number;
	imageUrl?: string;
	selfIntroduction?: string;
	company?: string;
	workHistory?: string;
	education?: string;
};

export interface RegisterApplicantParams {
	userId: string;
	name: string;
	occupationId: number;
	gender: string;
	birthday: Date;
	joiningDate: Date;
	imageUrl?: string;
	selfIntroduction?: string;
	company?: string;
	workHistory?: string;
	education?: string;
}

export async function registerApplicantAction(
	_prevState: FormState,
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

	const userId = session.user.id;
	const name = formData.get("name");
	const occupationId = formData.get("occupation");
	const gender = formData.get("gender");
	const birthday = formData.get("birthday");
	const joiningDate = formData.get("joinDate");
	const selfIntroduction = formData.get("selfIntroduction");
	const company = formData.get("company");
	const workHistory = formData.get("workHistory");
	const education = formData.get("education");
	// 後で画像も入れれるようにする
	// const imageUrl = formData.get("imageUrl");
	const formDataObject = Object.fromEntries(formData.entries());

	const useCaseParams: RegisterApplicantParams = {
		userId: userId,
		name: name as string,
		occupationId: Number.parseInt(occupationId as string),
		gender: gender as string,
		birthday: new Date(birthday as string),
		joiningDate: new Date(joiningDate as string),
		selfIntroduction: (selfIntroduction as string) || undefined,
		company: (company as string) || undefined,
		workHistory: (workHistory as string) || undefined,
		education: (education as string) || undefined,

		// imageUrl: (imageUrl as string) || undefined,
	};

	// ここ
	const useCaseResult = await registerApplicantUseCase(useCaseParams);

	if (useCaseResult.success) {
		redirect("/applicant/search_employees");
	} else {
		return {
			success: false,
			message: useCaseResult.message,
			data: formDataObject,
		};
	}
}
