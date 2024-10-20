import { getServerSession } from "@/lib/auth";
import { registerContainer } from "@/di/container";
import { REGISTER_EMPLOYEE_USE_CASE } from "@/di/container/usecase";
import { RegisterEmployeeUseCase } from "@/application/usecase/registerEmployee";
import { RegisterEmployeeParams } from "@/application/usecase/registerEmployee";
import {
  GenderEnum,
  HiringTypeEnum,
  MeetingMethodEnum,
} from "@/domain/core/Employee/Employee";

export default async function CreateProfileEmployee() {
  const session = await getServerSession();
  const userId = session?.user.id;

  console.log("通った！");
  if (!userId) {
    return <div>ログインしてください</div>;
  }
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
  return (
    <>
      <div>employee create_profile</div>
      {/* {userId && <TestUseCaseButton userId={userId} />} */}
    </>
  );
}
