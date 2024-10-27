"use server";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { StatusLabel } from "@/domain/shared/Status";
import { getServerSession } from "@/lib/auth";
import {
	type RegisterApplicantParams,
	registerApplicantUseCase,
} from "@/usecase/registerApplicant";
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
};

export async function registerApplicantAction(
	_prevState: FormState,
	formData: FormData,
) {
	console.log("ああああ");

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
	// 後で画像も入れれるようにする
	// const imageUrl = formData.get("imageUrl");

	const formDataObject = Object.fromEntries(formData.entries());

	if (!name || !occupationId || !gender || !joiningDate) {
		return {
			success: false,
			message: "必須項目を入力してください",
			data: formDataObject,
		};
	}

	const useCaseParams: RegisterApplicantParams = {
		userId: userId,
		name: name as string,
		occupationId: Number.parseInt(occupationId as string),
		gender: gender as string,
		birthday: new Date(birthday as string),
		joiningDate: new Date(joiningDate as string),
		selfIntroduction: (selfIntroduction as string) || undefined,
		// imageUrl: (imageUrl as string) || undefined,
	};

	console.log("useCaseParams", useCaseParams);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const useCaseResult = await registerApplicantUseCase(useCaseParams);
	console.log("useCaseResult", useCaseResult);
	if (useCaseResult.success) {
		redirect("/applicant/home");
	} else {
		return {
			success: false,
			message: useCaseResult.error.message,
			data: formDataObject,
		};
	}
}
