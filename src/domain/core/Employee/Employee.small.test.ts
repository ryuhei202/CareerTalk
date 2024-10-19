import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createId } from "@paralleldrive/cuid2";
import { brand } from "@/util/brand";
import { Employee, GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "./Employee";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Employee", () => {
  const employeeId = brand<string, "EmployeeId">(createId());
  const userId = brand<string, "UserId">("b".repeat(24));
  const companyId = brand<number, "CompanyId">(1);
  const gender = brand<GenderEnum, "Gender">(GenderEnum.MALE);
  const birthday = brand<Date, "Birthday">(new Date("1990-01-01"));
  const occupationId = brand<number, "OccupationId">(1);
  const workLocationId = brand<number, "WorkLocationId">(1);
  const joiningDate = brand<Date, "JoiningDate">(new Date("2021-01-01"));
  const hiringType = brand<HiringTypeEnum, "HiringType">(HiringTypeEnum.NEW_GRADUATE);
  const meetingMethod = brand<MeetingMethodEnum, "MeetingMethod">(MeetingMethodEnum.ONLINE);
  const selfIntroduction = brand<string, "SelfIntroduction">("自己紹介");
  const talkableTopics = brand<string, "TalkableTopics">("働き方について");
  const status = brand<StatusEnum, "Status">(StatusEnum.PENDING);

  test("Employeeを生成する", () => {
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

    expect(employee.id).toBe(employeeId);
    expect(employee.userId).toBe(userId);
    expect(employee.companyId).toBe(companyId);
    expect(employee.gender).toBe(gender);
    expect(employee.birthday).toBe(birthday);
    expect(employee.occupationId).toBe(occupationId);
    expect(employee.workLocationId).toBe(workLocationId);
    expect(employee.joiningDate).toBe(joiningDate);
    expect(employee.hiringType).toBe(hiringType);
    expect(employee.meetingMethod).toBe(meetingMethod);
    expect(employee.selfIntroduction).toBe(selfIntroduction);
    expect(employee.talkableTopics).toBe(talkableTopics);
    expect(employee.status).toBe(status);
  });

  test("未設定のプロパティはundefinedを返す", () => {
    const employee = Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: undefined,
      workLocationId: undefined,
      hiringType: undefined,
      meetingMethod: undefined,
      selfIntroduction: undefined,
      talkableTopics: undefined,
    });

    expect(employee.id).toBe(employeeId);
    expect(employee.userId).toBe(userId);
    expect(employee.companyId).toBe(companyId);
    expect(employee.occupationId).toBe(occupationId);
    expect(employee.gender).toBe(gender);
    expect(employee.joiningDate).toBe(joiningDate);
    expect(employee.status).toBe(status);
    // 未設定のプロパティはundefinedを返す
    expect(employee.birthday).toBeUndefined();
    expect(employee.workLocationId).toBeUndefined();
    expect(employee.hiringType).toBeUndefined();
    expect(employee.meetingMethod).toBeUndefined();
    expect(employee.selfIntroduction).toBeUndefined();
    expect(employee.talkableTopics).toBeUndefined();
  });

  test("不正な値でEmployeeを生成しようとするとエラーが発生する", () => {
    expect(() => Employee.reconstruct({
      id: brand<string, "EmployeeId">(""),
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: brand<string, "UserId">(""),
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: brand<number, "CompanyId">(0),
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: brand<number, "OccupationId">(0),
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: brand<GenderEnum, "Gender">("INVALID" as GenderEnum),
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: brand<Date, "JoiningDate">(new Date("2999-01-01")),
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: brand<StatusEnum, "Status">("INVALID" as StatusEnum),
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: brand<Date, "Birthday">(new Date("2999-01-01")),
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: brand<number, "WorkLocationId">(0),
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: brand<HiringTypeEnum, "HiringType">("INVALID" as HiringTypeEnum),
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: brand<MeetingMethodEnum, "MeetingMethod">("INVALID" as MeetingMethodEnum),
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: brand<string, "SelfIntroduction">("a".repeat(1001)),
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.reconstruct({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: brand<string, "TalkableTopics">("a".repeat(1001)),
    })).toThrow();
  });

  describe("Employeeを作成する", () => {
    test("正常にEmployeeを作成できる", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        gender: gender,
        birthday: birthday,
        occupationId: occupationId,
        joiningDate: joiningDate,
        status: status,
        workLocationId: workLocationId,
        hiringType: hiringType,
        meetingMethod: meetingMethod,
        selfIntroduction: selfIntroduction,
        talkableTopics: talkableTopics,
      });

      expect(employee.id).toBe(employeeId);
      expect(employee.userId).toBe(userId);
      expect(employee.companyId).toBe(companyId);
      expect(employee.gender).toBe(gender);
      expect(employee.birthday).toBe(birthday);
      expect(employee.occupationId).toBe(occupationId);
      expect(employee.workLocationId).toBe(workLocationId);
      expect(employee.joiningDate).toBe(joiningDate);
      expect(employee.hiringType).toBe(hiringType);
      expect(employee.meetingMethod).toBe(meetingMethod);
      expect(employee.selfIntroduction).toBe(selfIntroduction);
      expect(employee.talkableTopics).toBe(talkableTopics);
      expect(employee.status).toBe(status);
    });
  });

  describe("changeOccupationId", () => {
    test("正常にoccupationIdを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.occupationId).toBe(occupationId);
      employee.changeOccupationId(brand<number, "OccupationId">(2));
      expect(employee.occupationId).toBe(brand<number, "OccupationId">(2));
    });

    test("不正なoccupationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.occupationId).toBe(occupationId);
      expect(() => employee.changeOccupationId(brand<number, "OccupationId">(0))).toThrow();
    });
  });

  describe("changeWorkLocationId", () => {
    test("正常にworkLocationIdを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        workLocationId: workLocationId,
      });

      expect(employee.workLocationId).toBe(workLocationId);
      employee.changeWorkLocationId(brand<number, "WorkLocationId">(2));
      expect(employee.workLocationId).toBe(brand<number, "WorkLocationId">(2));
    });

    test("不正なworkLocationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        workLocationId: workLocationId,
      });

      expect(employee.workLocationId).toBe(workLocationId);
      expect(() => employee.changeWorkLocationId(brand<number, "WorkLocationId">(0))).toThrow();
    });
  });

  describe("changeHiringType", () => {
    test("正常にhiringTypeを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        hiringType: hiringType,
      });

      expect(employee.hiringType).toBe(hiringType);
      employee.changeHiringType(brand<HiringTypeEnum, "HiringType">(HiringTypeEnum.MID_CAREER));
      expect(employee.hiringType).toBe(HiringTypeEnum.MID_CAREER);
    });

    test("不正なhiringTypeでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        hiringType: hiringType,
      });

      expect(employee.hiringType).toBe(hiringType);
      expect(() => employee.changeHiringType(brand<HiringTypeEnum, "HiringType">("INVALID" as HiringTypeEnum))).toThrow();
    });
  });

  describe("changeMeetingMethod", () => {
    test("正常にmeetingMethodを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        meetingMethod: meetingMethod,
      });

      expect(employee.meetingMethod).toBe(meetingMethod);
      employee.changeMeetingMethod(brand<MeetingMethodEnum, "MeetingMethod">(MeetingMethodEnum.OFFLINE));
      expect(employee.meetingMethod).toBe(MeetingMethodEnum.OFFLINE);
    });

    test("不正なmeetingMethodでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        meetingMethod: meetingMethod,
      });

      expect(employee.meetingMethod).toBe(meetingMethod);
      expect(() => employee.changeMeetingMethod(brand<MeetingMethodEnum, "MeetingMethod">("INVALID" as MeetingMethodEnum))).toThrow();
    });
  });

  describe("changeSelfIntroduction", () => {
    test("正常にselfIntroductionを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        selfIntroduction: selfIntroduction,
      });

      expect(employee.selfIntroduction).toBe(selfIntroduction);
      employee.changeSelfIntroduction(brand<string, "SelfIntroduction">("自己紹介2"));
      expect(employee.selfIntroduction).toBe("自己紹介2");
    });

    test("不正なselfIntroductionでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        selfIntroduction: selfIntroduction,
      });

      expect(employee.selfIntroduction).toBe(selfIntroduction);
      expect(() => employee.changeSelfIntroduction(brand<string, "SelfIntroduction">("a".repeat(1001)))).toThrow();
    });
  });

  describe("changeTalkableTopics", () => {
    test("正常にtalkableTopicsを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        talkableTopics: talkableTopics,
      });

      expect(employee.talkableTopics).toBe(talkableTopics);
      employee.changeTalkableTopics(brand<string, "TalkableTopics">("話せるトピック2"));
      expect(employee.talkableTopics).toBe("話せるトピック2");
    });

    test("不正なtalkableTopicsでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        talkableTopics: talkableTopics,
      });

      expect(employee.talkableTopics).toBe(talkableTopics);
      expect(() => employee.changeTalkableTopics(brand<string, "TalkableTopics">("a".repeat(1001)))).toThrow();
    });
  });

  describe("changeStatus", () => {
    test("正常にstatusを変更できる", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.status).toBe(status);
      employee.changeStatus(brand<StatusEnum, "Status">(StatusEnum.APPROVED));
      expect(employee.status).toBe(StatusEnum.APPROVED);
    });

    test("不正なstatusでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.status).toBe(status);
      expect(() => employee.changeStatus(brand<StatusEnum, "Status">("INVALID" as StatusEnum))).toThrow();
    });
  });

  describe("toGenderLabel", () => {
    test("正常にgenderLabelを返す", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: brand<GenderEnum, "Gender">(GenderEnum.FEMALE),
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.toGenderLabel()).toBe("女性");
    });
  });

  describe("toHiringTypeLabel", () => {
    test("正常にhiringTypeLabelを返す", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        hiringType: brand<HiringTypeEnum, "HiringType">(HiringTypeEnum.MID_CAREER),
      });

      expect(employee.toHiringTypeLabel()).toBe("中途採用");
    });
  });

  describe("toMeetingMethodLabel", () => {
    test("正常にmeetingMethodLabelを返す", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        meetingMethod: brand<MeetingMethodEnum, "MeetingMethod">(MeetingMethodEnum.OFFLINE),
      });

      expect(employee.toMeetingMethodLabel()).toBe("オフライン");
    });
  });

  describe("toStatusLabel", () => {
    test("正常にstatusLabelを返す", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: brand<StatusEnum, "Status">(StatusEnum.APPROVED),
      });

      expect(employee.toStatusLabel()).toBe("承認済み");
    });
  });

  
  describe("getAge", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    test("正常にageを返す", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: brand<Date, "Birthday">(new Date("1999-06-15")),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日で既に誕生日が来ている場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: brand<Date, "Birthday">(new Date("1999-10-15")),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日でまだ誕生日が来ていない場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: brand<Date, "Birthday">(new Date("1999-10-25")),
      });

      expect(employee.getAge()).toBe(24);
    });

    test("誕生日の場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: brand<Date, "Birthday">(new Date("1999-10-19")),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("未設定のbirthdayでageを返すとundefinedを返す", () => {
      const employee = Employee.reconstruct({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.getAge()).toBeUndefined();
    });
  });
});

