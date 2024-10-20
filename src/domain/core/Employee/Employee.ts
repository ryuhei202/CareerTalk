import { userIdSchema } from "../User/User";
import { companyIdSchema } from "../Company/Company";
import { occupationIdSchema } from "../Occupation/Occupation";
import { z } from "zod";

/**
 * Employee関連のEnum
 */
export enum GenderEnum {
  OTHER = "OTHER",
  MALE = "MALE",
  FEMALE = "FEMALE",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}
type GenderLabel = "その他" | "男性" | "女性" | "回答しない";

export enum HiringTypeEnum {
  NEW_GRADUATE = "NEW_GRADUATE",
  MID_CAREER = "MID_CAREER",
}
type HiringTypeLabel = "新卒採用" | "中途採用";

export enum MeetingMethodEnum {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BOTH = "BOTH",
}
type MeetingMethodLabel = "オンライン" | "オフライン" | "オンライン/オフライン";

export enum StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
type StatusLabel = "審査中" | "承認済み" | "拒否";


/**
 * Employee関連のバリデーションスキーマ
 */
// 必須
const employeeIdSchema = z.string().length(24, { message: "IDは24文字である必要があります" });
const genderSchema = z.nativeEnum(GenderEnum, { message: "無効な性別です" });
const joiningDateSchema = z.date().refine((date) => {
  const now = new Date();
  return date <= now;
}, { message: "無効な入社日です" });
const statusSchema = z.nativeEnum(StatusEnum);
// 必須ではない
const birthdaySchema = z.date().refine((date) => {
  const now = new Date();
  const minDate = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
  return date <= now && date >= minDate;
}, { message: "無効な生年月日です" }).optional();
const workLocationIdSchema = z.number({ message: "無効な勤務地IDです" }).positive().optional();
const hiringTypeSchema = z.nativeEnum(HiringTypeEnum, { message: "無効な入社方法です" }).optional();
const meetingMethodSchema = z.nativeEnum(MeetingMethodEnum, { message: "無効な訪問方法です" }).optional();
const selfIntroductionSchema = z.string().max(1000, { message: "自己紹介は1000文字以下である必要があります" }).optional();
const talkableTopicsSchema = z.string().max(1000, { message: "話せる内容は1000文字以下である必要があります" }).optional();

const employeeParamsSchema = z.object(
  {
    id: employeeIdSchema,
    userId: userIdSchema,
    companyId: companyIdSchema,
    occupationId: occupationIdSchema,
    gender: genderSchema,
    joiningDate: joiningDateSchema,
    status: statusSchema,
    birthday: birthdaySchema,
    workLocationId: workLocationIdSchema,
    hiringType: hiringTypeSchema,
    meetingMethod: meetingMethodSchema,
    selfIntroduction: selfIntroductionSchema,
    talkableTopics: talkableTopicsSchema,
  }
)

/**
 * Employeeパラメータ
 */
export type EmployeeParams ={
  id: string;
  userId: string;
  companyId: number;
  occupationId: number;
  gender: GenderEnum;
  joiningDate: Date;
  status: StatusEnum;
  birthday?: Date;
  workLocationId?: number;
  hiringType?: HiringTypeEnum;
  meetingMethod?: MeetingMethodEnum;
  selfIntroduction?: string;
  talkableTopics?: string;
}

/**
 * Employeeエンティティ
 */
export class Employee {
  private constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _companyId: number,
    private readonly _gender: GenderEnum,
    private readonly _joiningDate: Date,
    private _occupationId: number,
    private _status: StatusEnum,
    private readonly _birthday?: Date,
    private _workLocationId?: number,
    private _hiringType?: HiringTypeEnum,
    private _meetingMethod?: MeetingMethodEnum,
    private _selfIntroduction?: string,
    private _talkableTopics?: string,
  ) {}

  static create(params: EmployeeParams): Employee {
    this.validate(params);
    return new Employee(
      params.id,
      params.userId,
      params.companyId,
      params.gender,
      params.joiningDate,
      params.occupationId,
      params.status,
      params.birthday,
      params.workLocationId,
      params.hiringType,
      params.meetingMethod,
      params.selfIntroduction,
      params.talkableTopics,
    );
  }

  private static validate(params: EmployeeParams):void {
    employeeParamsSchema.parse(params);

  }

  // イミュータブルデータモデルにするか悩み中
  changeOccupationId(newOccupationId: number): void {
    occupationIdSchema.parse(newOccupationId);
    this._occupationId = newOccupationId;
  }

  changeWorkLocationId(newWorkLocationId: number): void {
    workLocationIdSchema.parse(newWorkLocationId);
    this._workLocationId = newWorkLocationId;
  }

  changeHiringType(newHiringType: HiringTypeEnum): void {
    hiringTypeSchema.parse(newHiringType);
    this._hiringType = newHiringType;
  }

  changeMeetingMethod(newMeetingMethod: MeetingMethodEnum): void {
    meetingMethodSchema.parse(newMeetingMethod);
    this._meetingMethod = newMeetingMethod;
  }

  changeSelfIntroduction(newSelfIntroduction: string): void {
    selfIntroductionSchema.parse(newSelfIntroduction);
    this._selfIntroduction = newSelfIntroduction;
  }

  changeTalkableTopics(newTalkableTopics: string): void {
    talkableTopicsSchema.parse(newTalkableTopics);
    this._talkableTopics = newTalkableTopics;
  }

  changeStatus(newStatus: StatusEnum): void {
    statusSchema.parse(newStatus);
    this._status = newStatus;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get companyId(): number {
    return this._companyId;
  }

  get gender(): GenderEnum {
    return this._gender;
  }
  
  
  get joiningDate(): Date {
    return this._joiningDate;
  }
  
  get occupationId(): number {
    return this._occupationId;
  }

  get status(): StatusEnum {
    return this._status;
  }
  
  get birthday(): Date | undefined {
    return this._birthday;
  }

  get workLocationId(): number | undefined {
    return this._workLocationId;
  }


  get hiringType(): HiringTypeEnum | undefined {
    return this._hiringType;
  }

  get meetingMethod(): MeetingMethodEnum | undefined {
    return this._meetingMethod;
  }

  get selfIntroduction(): string | undefined {
    return this._selfIntroduction;
  }

  get talkableTopics(): string | undefined {
    return this._talkableTopics
  }

  toGenderLabel(): GenderLabel | undefined {
    if (this._gender == null) {
      return undefined;
    }
    switch (this._gender) {
      case GenderEnum.OTHER:
        return "その他";
      case GenderEnum.MALE:
        return "男性";
      case GenderEnum.FEMALE:
        return "女性";
      case GenderEnum.PREFER_NOT_TO_SAY:
        return "回答しない";
      default:
        throw new Error("無効な性別です");
    }
  }

  toHiringTypeLabel(): HiringTypeLabel | undefined {
    if (this._hiringType == null) {
      return undefined;
    }
    switch (this._hiringType) {
      case HiringTypeEnum.NEW_GRADUATE:
        return "新卒採用";
      case HiringTypeEnum.MID_CAREER:
        return "中途採用";
      default:
        throw new Error("無効な入社方法です");
    }
  }

  toMeetingMethodLabel(): MeetingMethodLabel | undefined {
    if (this._meetingMethod == null) {
      return undefined;
    }
    switch (this._meetingMethod) {
      case MeetingMethodEnum.ONLINE:
        return "オンライン";
      case MeetingMethodEnum.OFFLINE:
        return "オフライン";
      case MeetingMethodEnum.BOTH:
        return "オンライン/オフライン";
      default:
        throw new Error("無効な訪問方法です");
    }
  }

  toStatusLabel(): StatusLabel {
    switch (this._status) {
      case StatusEnum.PENDING:
        return "審査中";
      case StatusEnum.APPROVED:
        return "承認済み";
      case StatusEnum.REJECTED:
        return "拒否";
      default:
        throw new Error("無効なステータスです");
    }
  }

  getAge(): number | undefined {
    if (this._birthday == null) {
      return undefined;
    }
    const today = new Date();
    const birthDate = new Date(this._birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}