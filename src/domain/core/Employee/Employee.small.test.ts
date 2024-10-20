import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createId } from "@paralleldrive/cuid2";
import { Employee, GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "./Employee";

vi.mock('@paralleldrive/cuid2', () => ({
  createId: () => 'testCuIdWithExactLength0',
}));

describe("Employee", () => {
  const employeeId = createId();
  const userId = "b".repeat(24);
  const companyId = 1;
  const gender = GenderEnum.MALE;
  const birthday = new Date("1990-01-01");
  const occupationId = 1;
  const workLocationId = 1;
  const joiningDate = new Date("2021-01-01");
  const hiringType = HiringTypeEnum.NEW_GRADUATE;
  const meetingMethod = MeetingMethodEnum.ONLINE;
  const selfIntroduction = "自己紹介";
  const talkableTopics = "働き方について";
  const status = StatusEnum.PENDING;

  test("Employeeを生成する", () => {
    const employee = Employee.create({
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
    const employee = Employee.create({
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
    expect(() => Employee.create({
      id: "",
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

    expect(() => Employee.create({
      id: employeeId,
      userId: "",
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

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: 0,
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

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: 0,
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

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: "INVALID" as GenderEnum,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: new Date("2999-01-01"),
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: "INVALID" as StatusEnum,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: new Date("2999-01-01"),
      workLocationId: workLocationId,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: 0,
      hiringType: hiringType,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
      id: employeeId,
      userId: userId,
      companyId: companyId,
      occupationId: occupationId,
      gender: gender,
      joiningDate: joiningDate,
      status: status,
      birthday: birthday,
      workLocationId: workLocationId,
      hiringType: "INVALID" as HiringTypeEnum,
      meetingMethod: meetingMethod,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
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
      meetingMethod: "INVALID" as MeetingMethodEnum,
      selfIntroduction: selfIntroduction,
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
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
      selfIntroduction: "a".repeat(1001),
      talkableTopics: talkableTopics,
    })).toThrow();

    expect(() => Employee.create({
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
      talkableTopics: "a".repeat(1001),
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
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.occupationId).toBe(occupationId);
      employee.changeOccupationId(2);
      expect(employee.occupationId).toBe(2);
    });

    test("不正なoccupationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.occupationId).toBe(occupationId);
      expect(() => employee.changeOccupationId(0)).toThrow();
    });
  });

  describe("changeWorkLocationId", () => {
    test("正常にworkLocationIdを変更できる", () => {
      const employee = Employee.create({
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
      employee.changeWorkLocationId(2);
      expect(employee.workLocationId).toBe(2);
    });

    test("不正なworkLocationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
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
      expect(() => employee.changeWorkLocationId(0)).toThrow();
    });
  });

  describe("changeHiringType", () => {
    test("正常にhiringTypeを変更できる", () => {
      const employee = Employee.create({
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
      employee.changeHiringType(HiringTypeEnum.MID_CAREER);
      expect(employee.hiringType).toBe(HiringTypeEnum.MID_CAREER);
    });

    test("不正なhiringTypeでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
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
      expect(() => employee.changeHiringType("INVALID" as HiringTypeEnum)).toThrow();
    });
  });

  describe("changeMeetingMethod", () => {
    test("正常にmeetingMethodを変更できる", () => {
      const employee = Employee.create({
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
      employee.changeMeetingMethod(MeetingMethodEnum.OFFLINE);
      expect(employee.meetingMethod).toBe(MeetingMethodEnum.OFFLINE);
    });

    test("不正なmeetingMethodでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
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
      expect(() => employee.changeMeetingMethod("INVALID" as MeetingMethodEnum)).toThrow();
    });
  });

  describe("changeSelfIntroduction", () => {
    test("正常にselfIntroductionを変更できる", () => {
      const employee = Employee.create({
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
      employee.changeSelfIntroduction("自己紹介2");
      expect(employee.selfIntroduction).toBe("自己紹介2");
    });

    test("不正なselfIntroductionでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
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
      expect(() => employee.changeSelfIntroduction("a".repeat(1001))).toThrow();
    });
  });

  describe("changeTalkableTopics", () => {
    test("正常にtalkableTopicsを変更できる", () => {
      const employee = Employee.create({
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
      employee.changeTalkableTopics("話せるトピック2");
      expect(employee.talkableTopics).toBe("話せるトピック2");
    });

    test("不正なtalkableTopicsでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
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
      expect(() => employee.changeTalkableTopics("a".repeat(1001))).toThrow();
    });
  });

  describe("changeStatus", () => {
    test("正常にstatusを変更できる", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.status).toBe(status);
      employee.changeStatus(StatusEnum.APPROVED);
      expect(employee.status).toBe(StatusEnum.APPROVED);
    });

    test("不正なstatusでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.status).toBe(status);
      expect(() => employee.changeStatus("INVALID" as StatusEnum)).toThrow();
    });
  });

  describe("toGenderLabel", () => {
    test("正常にgenderLabelを返す", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: GenderEnum.FEMALE,
        joiningDate: joiningDate,
        status: status,
      });

      expect(employee.toGenderLabel()).toBe("女性");
    });
  });

  describe("toHiringTypeLabel", () => {
    test("正常にhiringTypeLabelを返す", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        hiringType: HiringTypeEnum.MID_CAREER,
      });

      expect(employee.toHiringTypeLabel()).toBe("中途採用");
    });
  });

  describe("toMeetingMethodLabel", () => {
    test("正常にmeetingMethodLabelを返す", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        meetingMethod: MeetingMethodEnum.OFFLINE,
      });

      expect(employee.toMeetingMethodLabel()).toBe("オフライン");
    });
  });

  describe("toStatusLabel", () => {
    test("正常にstatusLabelを返す", () => {
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: StatusEnum.APPROVED,
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
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: new Date("1999-06-15"),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日で既に誕生日が来ている場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: new Date("1999-10-15"),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日でまだ誕生日が来ていない場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: new Date("1999-10-25"),
      });

      expect(employee.getAge()).toBe(24);
    });

    test("誕生日の場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({
        id: employeeId,
        userId: userId,
        companyId: companyId,
        occupationId: occupationId,
        gender: gender,
        joiningDate: joiningDate,
        status: status,
        birthday: new Date("1999-10-19"),
      });

      expect(employee.getAge()).toBe(25);
    });

    test("未設定のbirthdayでageを返すとundefinedを返す", () => {
      const employee = Employee.create({
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

