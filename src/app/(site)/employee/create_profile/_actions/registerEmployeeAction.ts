"use server"

import { FormState } from "@/app/(site)/employee/create_profile/_components/CreateEmplpyeeProfileContainer";
import { RegisterEmployeeParams, RegisterEmployeeUseCase } from "@/application/usecase/registerEmployee";
import { registerContainer } from "@/di/container";
import { REGISTER_EMPLOYEE_USE_CASE } from "@/di/container/usecase";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerEmployeeAction(
  _prevState: FormState,
  formData: FormData
) {
  const session = await getServerSession();
  if (!session) {
    return { 
      success: false,
      message: "Unauthorized Error",
      data: undefined
    };
  }
  const userId = session.user.id;
  const container = registerContainer();
  const useCase = container.get<RegisterEmployeeUseCase>(
      REGISTER_EMPLOYEE_USE_CASE
    );

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

  const formDataObject = Object.fromEntries(formData.entries());
  if(!name || !companyCode || !occupationId || !gender || !joiningDate){
    return {
      success: false,
      message: "必須項目を入力してください",
      data: formDataObject
    };
  }

  const useCaseParams: RegisterEmployeeParams = {
    userId: userId,
    name: name as string,
    companyCode: companyCode as string,
    occupationId: parseInt(occupationId as string),
    gender: gender as string,
    birthday: new Date(birthday as string),
    joiningDate: new Date(joiningDate as string),
    workLocationId: parseInt(workLocationId as string),
    hiringType: hiringType as string,
    meetingMethod: meetingMethod as string,
    selfIntroduction: selfIntroduction as string,
    talkableTopics: talkableTopics as string,
  };

  console.log("useCaseParams", useCaseParams);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useCaseResult = await useCase(useCaseParams);

  if (useCaseResult.success) {

    redirect("/home");
  } else {
    return { 
      success: false,
      message: useCaseResult.error.message,
      data: formDataObject
    };
  }
}
