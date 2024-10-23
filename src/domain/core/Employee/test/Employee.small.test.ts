import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Employee, GenderEnum, HiringTypeEnum, MeetingMethodEnum, StatusEnum } from "../Employee";
import { employeeDummyParams } from "./Employee.dummy";
import { ZodError } from "zod";
import { Company } from "../../Company/Company";
import { Occupation } from "../../Occupation/Occupation";
import { WorkLocation } from "../../WorkLocation/WorkLocation";
import { occupationDummy, occupationDummy2 } from "../../Occupation/test/Occupation.dummy";
import { workLocationDummy, workLocationDummy2 } from "../../WorkLocation/test/WorkLocation.Dummy";

describe("Employee", () => {
  test("Employeeを生成する", () => {
    const employee = Employee.create(employeeDummyParams);

    expect(employee.id).toBe(employeeDummyParams.id);
    expect(employee.userId).toBe(employeeDummyParams.userId);
    expect(employee.company).toBe(employeeDummyParams.company);
    expect(employee.gender).toBe(employeeDummyParams.gender);
    expect(employee.birthday).toBe(employeeDummyParams.birthday);
    expect(employee.occupation).toBe(employeeDummyParams.occupation);
    expect(employee.workLocation).toBe(employeeDummyParams.workLocation);
    expect(employee.joiningDate).toBe(employeeDummyParams.joiningDate);
    expect(employee.hiringType).toBe(employeeDummyParams.hiringType);
    expect(employee.meetingMethod).toBe(employeeDummyParams.meetingMethod);
    expect(employee.selfIntroduction).toBe(employeeDummyParams.selfIntroduction);
    expect(employee.talkableTopics).toBe(employeeDummyParams.talkableTopics);
    expect(employee.status).toBe(employeeDummyParams.status);
  });

  test("未設定のプロパティはundefinedを返す", () => {
    const employee = Employee.create({...employeeDummyParams, birthday: undefined, workLocation: undefined, hiringType: undefined, meetingMethod: undefined, selfIntroduction: undefined, talkableTopics: undefined});
  

    expect(employee.id).toBe(employeeDummyParams.id);
    expect(employee.userId).toBe(employeeDummyParams.userId);
    expect(employee.company).toBe(employeeDummyParams.company);
    expect(employee.occupation).toBe(employeeDummyParams.occupation);
    expect(employee.gender).toBe(employeeDummyParams.gender);
    expect(employee.joiningDate).toBe(employeeDummyParams.joiningDate);
    expect(employee.status).toBe(employeeDummyParams.status);
    // 未設定のプロパティはundefinedを返す
    expect(employee.birthday).toBeUndefined();
    expect(employee.workLocation).toBeUndefined();
    expect(employee.hiringType).toBeUndefined();
    expect(employee.meetingMethod).toBeUndefined();
    expect(employee.selfIntroduction).toBeUndefined();
    expect(employee.talkableTopics).toBeUndefined();
  });

  test("不正な値でEmployeeを生成しようとするとエラーが発生する", () => {
    // 不正なid
    expect(() => Employee.create({...employeeDummyParams, id: ""})).toThrowError(ZodError);

    // 不正なuserId
    expect(() => Employee.create({...employeeDummyParams, userId: ""})).toThrowError(ZodError); 
    
    // 不正なcompany
    expect(() => Employee.create({...employeeDummyParams, company: undefined as unknown as Company})).toThrowError(ZodError);
    
    // 不正なgender
    expect(() => Employee.create({...employeeDummyParams, gender: "INVALID" as GenderEnum})).toThrowError(ZodError);

    // 不正なjoiningDate
    expect(() => Employee.create({...employeeDummyParams, joiningDate: new Date("2999-01-01")})).toThrowError(ZodError);

    // 不正なstatus
    expect(() => Employee.create({...employeeDummyParams, status: "INVALID" as StatusEnum})).toThrowError(ZodError);
    
    // 不正なoccupation
    expect(() => Employee.create({...employeeDummyParams, occupation: undefined as unknown as Occupation})).toThrowError(ZodError);

    // 不正なbirthday
    expect(() => Employee.create({...employeeDummyParams, birthday: new Date("2999-01-01")})).toThrowError(ZodError);

    // 不正なworkLocation
    expect(() => Employee.create({...employeeDummyParams, workLocation: "INVALID" as unknown as WorkLocation})).toThrowError(ZodError);

    // 不正なhiringType 
    expect(() => Employee.create({...employeeDummyParams, hiringType: "INVALID" as HiringTypeEnum})).toThrowError(ZodError);

    // 不正なmeetingMethod
    expect(() => Employee.create({...employeeDummyParams, meetingMethod: "INVALID" as MeetingMethodEnum})).toThrowError(ZodError);

    // 不正なselfIntroduction
    expect(() => Employee.create({...employeeDummyParams, selfIntroduction: "a".repeat(1001)})).toThrowError(ZodError);

    // 不正なtalkableTopics
    expect(() => Employee.create({...employeeDummyParams, talkableTopics: "a".repeat(1001)})).toThrowError(ZodError);
  });

  describe("changeOccupation", () => {
    
    test("正常にoccupationを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, occupation: occupationDummy});

      expect(employee.occupation).toBe(occupationDummy);
      employee.changeOccupation(occupationDummy2);
      expect(employee.occupation).toBe(occupationDummy2);
    });

    test("不正なoccupationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, occupation: occupationDummy});

      expect(employee.occupation).toBe(occupationDummy);
      expect(() => employee.changeOccupation("INVALID" as unknown as Occupation)).toThrow();
    });
  });

  describe("changeWorkLocation", () => {
    test("正常にworkLocationを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, workLocation: workLocationDummy});

      expect(employee.workLocation).toBe(workLocationDummy);
      employee.changeWorkLocation(workLocationDummy2);
      expect(employee.workLocation).toBe(workLocationDummy2);
    });

    test("不正なworkLocationIdでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, workLocation: workLocationDummy});

      expect(employee.workLocation).toBe(workLocationDummy);
      expect(() => employee.changeWorkLocation("INVALID" as unknown as WorkLocation)).toThrow();
    });
  });

  describe("changeHiringType", () => {
    test("正常にhiringTypeを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, hiringType: HiringTypeEnum.NEW_GRADUATE});

      expect(employee.hiringType).toBe(HiringTypeEnum.NEW_GRADUATE);
      employee.changeHiringType(HiringTypeEnum.MID_CAREER);
      expect(employee.hiringType).toBe(HiringTypeEnum.MID_CAREER);
    });

    test("不正なhiringTypeでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, hiringType: HiringTypeEnum.NEW_GRADUATE});

      expect(employee.hiringType).toBe(HiringTypeEnum.NEW_GRADUATE);
      expect(() => employee.changeHiringType("INVALID" as HiringTypeEnum)).toThrow();
    });
  });

  describe("changeMeetingMethod", () => {
    test("正常にmeetingMethodを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, meetingMethod: MeetingMethodEnum.ONLINE});

      expect(employee.meetingMethod).toBe(MeetingMethodEnum.ONLINE);
      employee.changeMeetingMethod(MeetingMethodEnum.OFFLINE);
      expect(employee.meetingMethod).toBe(MeetingMethodEnum.OFFLINE);
    });

    test("不正なmeetingMethodでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, meetingMethod: MeetingMethodEnum.ONLINE});

      expect(employee.meetingMethod).toBe(MeetingMethodEnum.ONLINE);
      expect(() => employee.changeMeetingMethod("INVALID" as MeetingMethodEnum)).toThrow();
    });
  });

  describe("changeSelfIntroduction", () => {
    test("正常にselfIntroductionを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, selfIntroduction: "自己紹介"});

      expect(employee.selfIntroduction).toBe("自己紹介");
      employee.changeSelfIntroduction("自己紹介2");
      expect(employee.selfIntroduction).toBe("自己紹介2");
    });

    test("不正なselfIntroductionでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, selfIntroduction: "自己紹介"});

      expect(employee.selfIntroduction).toBe("自己紹介");
      expect(() => employee.changeSelfIntroduction("a".repeat(1001))).toThrow();
    });
  });

  describe("changeTalkableTopics", () => {
    test("正常にtalkableTopicsを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, talkableTopics: "働き方について"});

      expect(employee.talkableTopics).toBe("働き方について");
      employee.changeTalkableTopics("やりがいについて");
      expect(employee.talkableTopics).toBe("やりがいについて");
    });

    test("不正なtalkableTopicsでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, talkableTopics: "働き方について"});

      expect(employee.talkableTopics).toBe("働き方について");
      expect(() => employee.changeTalkableTopics("a".repeat(1001))).toThrow();
    });
  });

  describe("changeStatus", () => {
    test("正常にstatusを変更できる", () => {
      const employee = Employee.create({...employeeDummyParams, status: StatusEnum.PENDING});

      expect(employee.status).toBe(StatusEnum.PENDING);
      employee.changeStatus(StatusEnum.APPROVED);
      expect(employee.status).toBe(StatusEnum.APPROVED);
    });

    test("不正なstatusでEmployeeを作成しようとするとエラーが発生する", () => {
      const employee = Employee.create({...employeeDummyParams, status: StatusEnum.PENDING});

      expect(employee.status).toBe(StatusEnum.PENDING);
      expect(() => employee.changeStatus("INVALID" as StatusEnum)).toThrow();
    });
  });

  describe("toGenderLabel", () => {
    test("正常にgenderLabelを返す", () => {
      const employee = Employee.create({...employeeDummyParams, gender: GenderEnum.MALE});

      expect(employee.toGenderLabel()).toBe("男性");
    });
  });

  describe("toHiringTypeLabel", () => {
    test("正常にhiringTypeLabelを返す", () => {
      const employee = Employee.create({...employeeDummyParams, hiringType: HiringTypeEnum.NEW_GRADUATE});

      expect(employee.toHiringTypeLabel()).toBe("新卒採用");
    });
  });

  describe("toMeetingMethodLabel", () => {
    test("正常にmeetingMethodLabelを返す", () => {
      const employee = Employee.create({...employeeDummyParams, meetingMethod: MeetingMethodEnum.ONLINE});

      expect(employee.toMeetingMethodLabel()).toBe("オンライン");
    });
  });

  describe("toStatusLabel", () => {
    test("正常にstatusLabelを返す", () => {
      const employee = Employee.create({...employeeDummyParams, status: StatusEnum.PENDING});

      expect(employee.toStatusLabel()).toBe("審査中");
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
      const employee = Employee.create({...employeeDummyParams, birthday: new Date("1999-01-01")});

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日で既に誕生日が来ている場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({...employeeDummyParams, birthday: new Date("1999-10-15")});

      expect(employee.getAge()).toBe(25);
    });

    test("同じ月の誕生日でまだ誕生日が来ていない場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({...employeeDummyParams, birthday: new Date("1999-10-25")});

      expect(employee.getAge()).toBe(24);
    });

    test("誕生日の場合", () => {
      vi.setSystemTime(new Date("2024-10-19"))
      const employee = Employee.create({...employeeDummyParams, birthday: new Date("1999-10-19")});

      expect(employee.getAge()).toBe(25);
    });

    test("未設定のbirthdayでageを返すとundefinedを返す", () => {
      const employee = Employee.create({...employeeDummyParams, birthday: undefined});

      expect(employee.getAge()).toBeUndefined();
    });
  });

  // TODO: ロジックが完成していない為、一旦コメントアウト
  // describe("toYearsOfExperience", () => {
  //   beforeAll(() => {
  //     vi.useFakeTimers()
  //     vi.setSystemTime(new Date("2024-10-19"))
  //   })
    
  //   afterAll(() => {
  //     vi.useRealTimers()
  //   })
  //   test("正常にyearsOfExperienceを返す", () => {
  //     const employee = Employee.create({...employeeDummyParams});
  //     });

  //     expect(employee.toYearsOfExperience()).toBe(4);
  //   });

  //   test("2021/04/10の人は、2024/4/9の時点で3年目", () => {
  //     const employee = Employee.create({
  //       id: employeeId,
  //       userId: userId,
  //       companyId: companyId,
  //       occupationId: occupationId,
  //       gender: gender,
  //       joiningDate: new Date("2021-04-10"),
  //       status: status,
  //     });
  //     expect(employee.toYearsOfExperience()).toBe(3);
  //   });
  // });
});

