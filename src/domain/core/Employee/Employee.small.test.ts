import { describe, expect, test, vi } from "vitest";
import { Employee } from "./Employee";
import { HiringType, HiringTypeEnum } from "./HiringType/HiringType";
import { MeetingMethod, MeetingMethodEnum } from "./MeetingMethod/MeetingMethod";
import { SelfIntroduction } from "./SelfIntroduction/SelfIntroduction";
import { Gender, GenderEnum } from "./Gender/Gender";
import { EmployeeId } from "./EmployeeId/EmployeeId";
import { UserId } from "../User/UserId/UserId";
import { CompanyId } from "../Company/CompanyId/CompanyId";
import { WorkLocationId } from "./WorkLocationId/WorkLocationId";
import { TalkableTopics } from "./TalkableTopics/TalkableTopics";
import { Status, StatusEnum } from "../shared/Status/Status";
import { Birthday } from "./Birthday/Birthday";
import { JoiningDate } from "./JoiningDate/JoiningDate";
import { OccupationId } from "../Occupation/OccupationId/OccupationId";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Employee", () => {
  test("Employeeを生成する", () => {
    const employeeId = new EmployeeId("a".repeat(24));
    const userId = new UserId("b".repeat(24));
    const companyId = new CompanyId(1);
    const gender = new Gender(GenderEnum.MALE);
    const birthday = new Birthday(new Date("1990-01-01"));
    const occupationId = new OccupationId(1);
    const workLocationId = new WorkLocationId(1);
    const joiningDate = new JoiningDate(new Date("2021-01-01"));
    const hiringType = new HiringType(HiringTypeEnum.NEW_GRADUATE);
    const meetingMethod = new MeetingMethod(MeetingMethodEnum.ONLINE);
    const selfIntroduction = new SelfIntroduction("自己紹介");
    const talkableTopics = new TalkableTopics("働き方について");
    const status = new Status();

    const employee = Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      gender: gender,
      birthday: birthday,
      occupationId: occupationId,
      workLocationId: workLocationId,
      joiningDate: joiningDate,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
      status: status,
    });

    expect(employee.id.equals(employeeId)).toBeTruthy();
    expect(employee.userId.equals(userId)).toBeTruthy();
    expect(employee.companyId.equals(companyId)).toBeTruthy();
    expect(employee.gender.equals(gender)).toBeTruthy();
    expect(employee.birthday.equals(birthday)).toBeTruthy();
    expect(employee.occupationId.equals(occupationId)).toBeTruthy();
    expect(employee.workLocationId.equals(workLocationId)).toBeTruthy();
    expect(employee.joiningDate.equals(joiningDate)).toBeTruthy();
    expect(employee.hiringType.equals(hiringType)).toBeTruthy();
    expect(employee.meetingMethod.equals(meetingMethod)).toBeTruthy();
    expect(employee.selfIntroduction.equals(selfIntroduction)).toBeTruthy();
    expect(employee.talkableTopics.equals(talkableTopics)).toBeTruthy();
    expect(employee.status.equals(status)).toBeTruthy();
  });

  describe("create", () => {
    test("Employeeを作成できる", () => {
      const employeeId = new EmployeeId();
      const userId = new UserId("a".repeat(24));
      const companyId = new CompanyId(1);
      const gender = new Gender(GenderEnum.MALE);
      const birthday = new Birthday(new Date("1990-01-01"));
      const occupationId = new OccupationId(1);
      const workLocationId = new WorkLocationId(1);
      const joiningDate = new JoiningDate(new Date("2021-01-01"));
      const hiringType = new HiringType(HiringTypeEnum.NEW_GRADUATE);
      const meetingMethod = new MeetingMethod(MeetingMethodEnum.ONLINE);
      const selfIntroduction = new SelfIntroduction("自己紹介");
      const talkableTopics = new TalkableTopics("働き方について");
      const status = new Status();

      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        gender: gender,
        birthday: birthday,
        joiningDate: joiningDate,
        occupationId: occupationId,
        workLocationId: workLocationId,
        hiringType: hiringType,
        meetingMethod: meetingMethod,
        selfIntroduction: selfIntroduction,
        talkableTopics: talkableTopics,
        status: status,
      });

      expect(employee.id.equals(employeeId)).toBeTruthy();
      expect(employee.userId.equals(userId)).toBeTruthy();
      expect(employee.companyId.equals(companyId)).toBeTruthy();
      expect(employee.gender.equals(gender)).toBeTruthy();
      expect(employee.birthday.equals(birthday)).toBeTruthy();
      expect(employee.joiningDate.equals(joiningDate)).toBeTruthy();
      expect(employee.occupationId.equals(occupationId)).toBeTruthy();
      expect(employee.workLocationId.equals(workLocationId)).toBeTruthy();
      expect(employee.hiringType.equals(hiringType)).toBeTruthy();
      expect(employee.meetingMethod.equals(meetingMethod)).toBeTruthy();
      expect(employee.selfIntroduction.equals(selfIntroduction)).toBeTruthy();
      expect(employee.talkableTopics.equals(talkableTopics)).toBeTruthy();
      expect(employee.status.equals(status)).toBeTruthy();
    });

    test("必須でないパラメータが未設定の場合、値にundefinedかデフォルト値が入る", () => {
      const date = new Date("2021-01-01");

      const employeeId = new EmployeeId();
      const userId = new UserId("a".repeat(24));
      const companyId = new CompanyId(1);
      const gender = new Gender(GenderEnum.MALE);
      const joiningDate = new JoiningDate(date);
      const occupationId = new OccupationId(1);
      const status = new Status(StatusEnum.PENDING);
      // 必須ではない値
      const birthday = new Birthday(undefined);
      const workLocationId = new WorkLocationId(undefined);
      const hiringType = new HiringType(undefined);
      const meetingMethod = new MeetingMethod(undefined);
      const selfIntroduction = new SelfIntroduction(undefined);
      const talkableTopics = new TalkableTopics(undefined);

      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        gender: gender,
        birthday: birthday,
        joiningDate: joiningDate,
        occupationId: occupationId,
        workLocationId: workLocationId,
        hiringType: hiringType,
        meetingMethod: meetingMethod,
        selfIntroduction: selfIntroduction,
        talkableTopics: talkableTopics,
        status: status,
      });

      expect(employee.id.value).toBe("testCuIdWithExactLength0");
      expect(employee.userId.value).toBe("a".repeat(24));
      expect(employee.companyId.value).toBe(1);
      expect(employee.gender.value).toBe(GenderEnum.MALE);
      expect(employee.joiningDate.value).toBe(date);
      expect(employee.occupationId.value).toBe(1);
      expect(employee.status.value).toBe(StatusEnum.PENDING);
      // 未設定の場合はundefined
      expect(employee.workLocationId.value).toBe(undefined);
      expect(employee.hiringType.value).toBe(undefined);
      expect(employee.meetingMethod.value).toBe(undefined);
      expect(employee.birthday.value).toBe(undefined);
      // 未設定の場合で空文字が返却される
      expect(employee.selfIntroduction.value).toBe("");
      expect(employee.talkableTopics.value).toBe("");
    });
  });

  describe("changeMethod", () => {
    const employeeId = new EmployeeId();
    const userId = new UserId("a".repeat(24));
    const companyId = new CompanyId(1);
    const gender = new Gender(GenderEnum.MALE);
    const birthday = new Birthday(new Date("1990-01-01"));
    const joiningDate = new JoiningDate(new Date("2021-01-01"));
    const occupationId = new OccupationId(1);
    const workLocationId = new WorkLocationId(1);
    const hiringType = new HiringType(HiringTypeEnum.NEW_GRADUATE);
    const meetingMethod = new MeetingMethod(MeetingMethodEnum.ONLINE);
    const selfIntroduction = new SelfIntroduction("自己紹介");
    const talkableTopics = new TalkableTopics("働き方について");
    const status = new Status();

    const employee = Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      gender: gender,
      birthday: birthday,
      joiningDate: joiningDate,
      occupationId: occupationId,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
      status: status,
    });
    test("changeOccupationId", () => {
      expect(employee.occupationId.value).toBe(1);
      const newOccupationId = new OccupationId(2);
      employee.changeOccupationId(newOccupationId);
      expect(employee.occupationId.value).toBe(2);
    });

    test("changeWorkLocationId", () => {
      expect(employee.workLocationId.value).toBe(1);
      const newWorkLocationId = new WorkLocationId(2);
      employee.changeWorkLocationId(newWorkLocationId);
      expect(employee.workLocationId.value).toBe(2);
    });

    test("changeHiringType", () => {
      expect(employee.hiringType.value).toBe(HiringTypeEnum.NEW_GRADUATE);
      const newHiringType = new HiringType(HiringTypeEnum.MID_CAREER);
      employee.changeHiringType(newHiringType);
      expect(employee.hiringType.value).toBe(HiringTypeEnum.MID_CAREER);
    });

    test("changeMeetingMethod", () => {
      expect(employee.meetingMethod.value).toBe(MeetingMethodEnum.ONLINE);
      const newMeetingMethod = new MeetingMethod(MeetingMethodEnum.OFFLINE);
      employee.changeMeetingMethod(newMeetingMethod);
      expect(employee.meetingMethod.value).toBe(MeetingMethodEnum.OFFLINE);
    });

    test("changeSelfIntroduction", () => {
      expect(employee.selfIntroduction.value).toBe("自己紹介");
      const newSelfIntroduction = new SelfIntroduction("自己紹介2");
      employee.changeSelfIntroduction(newSelfIntroduction);
      expect(employee.selfIntroduction.value).toBe("自己紹介2");
    });

    test("changeTalkableTopics", () => {
      expect(employee.talkableTopics.value).toBe("働き方について");
      const newTalkableTopics = new TalkableTopics("仕事内容について");
      employee.changeTalkableTopics(newTalkableTopics);
      expect(employee.talkableTopics.value).toBe("仕事内容について");
    });

    test("changeStatus", () => {
      expect(employee.status.value).toBe(StatusEnum.PENDING);
      const newStatus = new Status(StatusEnum.APPROVED);
      employee.changeStatus(newStatus);
      expect(employee.status.value).toBe(StatusEnum.APPROVED);
    });
  });
});
