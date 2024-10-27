"use server";
import type { FormState } from "@/app/(site)/employee/create_profile/_components/CreateEmplopyeeProfileContainer";
import { getServerSession } from "@/lib/auth";
import { registerEmployeeUseCase } from "@/usecase/registerEmployee";
import { getZodErrorMessages } from "@/util/error";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { validateRegisterEmployeeUseCaseParams } from "../_util/validateRegisterEmployeeUseCaseParams";

export interface RegisterEmployeeParams {
	userId: string;
	name: string;
	companyCode: string;
	occupationId: number;
	gender: string;
	joiningDate: Date;
	birthday?: Date;
	imageUrl?: string;
	workLocationId?: number;
	hiringType?: string;
	meetingMethod?: string;
	selfIntroduction?: string;
	talkableTopics?: string;
}

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
	const joiningDate = formData.get("joinDate");
	const birthday = formData.get("birthday");
	const workLocationId = formData.get("workLocation");
	const hiringType = formData.get("hiringType");
	const meetingMethod = formData.get("meetingMethod");
	const selfIntroduction = formData.get("selfIntroduction");
	const talkableTopics = formData.get("talkableTopics");
	// const imageUrl = formData.get("imageUrl"); // 後で画像も入れれるようにする

	const formDataObject = Object.fromEntries(formData.entries());

	const useCaseParams: RegisterEmployeeParams = {
		userId: userId,
		name: name as string,
		companyCode: companyCode as string,
		occupationId: Number.parseInt(occupationId as string),
		gender: gender as string,
		joiningDate: new Date(joiningDate as string),
		birthday: birthday ? new Date(birthday as string) : undefined,
		workLocationId: workLocationId
			? Number.parseInt(workLocationId as string)
			: undefined,
		hiringType: (hiringType as string) || undefined,
		meetingMethod: (meetingMethod as string) || undefined,
		selfIntroduction: (selfIntroduction as string) || undefined,
		talkableTopics: (talkableTopics as string) || undefined,
		// imageUrl: (imageUrl as string) || undefined,
	};

	// パラメーターのバリデーション
	try {
		validateRegisterEmployeeUseCaseParams(useCaseParams);
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				success: false,
				message: getZodErrorMessages(error),
				data: formDataObject,
			};
		}
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const useCaseResult = await registerEmployeeUseCase(useCaseParams);

	if (useCaseResult.success) {
		redirect("/employee/home");
	} else {
		return {
			success: false,
			message: useCaseResult.message,
			data: formDataObject,
		};
	}
}
