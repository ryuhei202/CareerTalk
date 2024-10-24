"use server";
import type { FormState } from "@/app/(site)/employee/create_profile/_components/CreateEmplpyeeProfileContainer";
import {
	type RegisterEmployeeParams,
	registerEmployeeUseCase,
} from "@/application/usecase/registerEmployee";
import type { GenderLabel } from "@/domain/shared/Gender";
import type { HiringTypeLabel } from "@/domain/shared/HiringType";
import type { MeetingMethodLabel } from "@/domain/shared/MeetingMethod";
import type { StatusLabel } from "@/domain/shared/Status";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export type CreatedEmployeeResponse = {
	id: string;
	name: string;
	userId: string;
	companyId: number;
	occupationId: number;
	gender: GenderLabel;
	yearsOfExperience: number;
	status: StatusLabel;
	age?: number;
	imageUrl?: string;
	workLocationId?: number;
	hiringType?: HiringTypeLabel;
	meetingMethod?: MeetingMethodLabel;
	selfIntroduction?: string;
	talkableTopics?: string;
};

export async function registerEmployeeAction(
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
	const companyCode = formData.get("companyCode");
	const occupationId = formData.get("occupation");
	const gender = formData.get("gender");
	const birthday = formData.get("birthday");
	const joiningDate = formData.get("joinDate");
	const workLocationId = formData.get("workLocation");
	const hiringType = formData.get("hiringType");
	const meetingMethod = formData.get("meetingMethod");
	const selfIntroduction = formData.get("selfIntroduction");
	const talkableTopics = formData.get("talkableTopics");
	// 後で画像も入れれるようにする
	// const imageUrl = formData.get("imageUrl");

	const formDataObject = Object.fromEntries(formData.entries());

	if (!name || !companyCode || !occupationId || !gender || !joiningDate) {
		return {
			success: false,
			message: "必須項目を入力してください",
			data: formDataObject,
		};
	}

	const useCaseParams: RegisterEmployeeParams = {
		userId: userId,
		name: name as string,
		companyCode: companyCode as string,
		occupationId: Number.parseInt(occupationId as string),
		gender: gender as string,
		birthday: new Date(birthday as string),
		joiningDate: new Date(joiningDate as string),
		workLocationId: workLocationId
			? Number.parseInt(workLocationId as string)
			: undefined,
		hiringType: (hiringType as string) || undefined,
		meetingMethod: (meetingMethod as string) || undefined,
		selfIntroduction: (selfIntroduction as string) || undefined,
		talkableTopics: (talkableTopics as string) || undefined,
		// imageUrl: (imageUrl as string) || undefined,
	};

	console.log("useCaseParams", useCaseParams);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const useCaseResult = await registerEmployeeUseCase(useCaseParams);
	console.log("useCaseResult", useCaseResult);
	if (useCaseResult.success) {
		redirect("/employee/home");
	} else {
		return {
			success: false,
			message: useCaseResult.error.message,
			data: formDataObject,
		};
	}
}
