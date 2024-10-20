"use client";

import {
  RegisterEmployeeParams,
  RegisterEmployeeUseCase,
} from "@/application/usecase/registerEmployee";
import { registerContainer } from "@/di/container";
import { REGISTER_EMPLOYEE_USE_CASE } from "@/di/container/usecase";
import {
  GenderEnum,
  HiringTypeEnum,
  MeetingMethodEnum,
} from "@/domain/core/Employee/Employee";

export default function TestUseCaseButton({ userId }: { userId: string }) {
  const testUseCase = async () => {
    console.log("通った！");
    const container = registerContainer();
    const useCase = container.get<RegisterEmployeeUseCase>(
      REGISTER_EMPLOYEE_USE_CASE
    );

    const useCaseParams: RegisterEmployeeParams = {
      userId: userId,
      name: "test",
      companyCode: "12345679",
      occupationId: 1,
      gender: GenderEnum.MALE,
      birthday: new Date("1999-06-15"),
      joiningDate: new Date("2022-04-01"),
      workLocationId: 1,
      hiringType: HiringTypeEnum.NEW_GRADUATE,
      meetingMethod: MeetingMethodEnum.ONLINE,
      selfIntroduction: "test",
      profileImage: "test",
      talkableTopics: "test",
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const useCaseResult = await useCase(useCaseParams);

    console.log(useCaseResult);
  };
  return (
    <button
      onClick={testUseCase}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      テストユースケース実行
    </button>
  );
}
