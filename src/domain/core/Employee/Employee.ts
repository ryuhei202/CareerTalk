import {  Branded } from "@/util/brand";
import { UserId, userIdSchema } from "../User/User";
import { CompanyId, companyIdSchema } from "../Company/Company";
import { OccupationId, occupationIdSchema } from "../Occupation/Occupation";
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
 * Employee関連の値
 * 値オブジェクトの代わりにbranded Typesとvalidationを使用する
 */
type EmployeeId = Branded<string, 'EmployeeId'>;
type Gender = Branded<GenderEnum, 'Gender'>;
type Birthday = Branded<Date, 'Birthday'>;
type JoiningDate = Branded<Date, 'JoiningDate'>;
type WorkLocationId = Branded<number, 'WorkLocationId'>;
type HiringType = Branded<HiringTypeEnum, 'HiringType'>;
type MeetingMethod = Branded<MeetingMethodEnum, 'MeetingMethod'>;
type SelfIntroduction = Branded<string, 'SelfIntroduction'>;
type TalkableTopics = Branded<string, 'TalkableTopics'>;
type Status = Branded<StatusEnum, 'Status'>;


/**
 * Employeeパラメータ
 */
export type EmployeeParams ={
  id: EmployeeId;
  userId: UserId;
  companyId: CompanyId;
  occupationId: OccupationId;
  gender: Gender;
  joiningDate: JoiningDate;
  status: Status;
  birthday?: Birthday;
  workLocationId?: WorkLocationId;
  hiringType?: HiringType;
  meetingMethod?: MeetingMethod;
  selfIntroduction?: SelfIntroduction;
  talkableTopics?: TalkableTopics;
}

/**
 * Employeeエンティティ
 */
export class Employee {
  private constructor(
    private readonly _id: EmployeeId,
    private readonly _userId: UserId,
    private readonly _companyId: CompanyId,
    private  _occupationId: OccupationId,
    private readonly _gender: Gender,
    private readonly _joiningDate: JoiningDate,
    private _status: Status,
    private readonly _birthday?: Birthday,
    private  _workLocationId?: WorkLocationId,
    private  _hiringType?: HiringType,
    private  _meetingMethod?: MeetingMethod,
    private  _selfIntroduction?: SelfIntroduction,
    private  _talkableTopics?: TalkableTopics,
  ) {}

  static create(params: EmployeeParams): Employee {
    this.validate(params);
    return new Employee(
      params.id,
      params.userId,
      params.companyId,
      params.occupationId,
      params.gender,
      params.joiningDate,
      params.status,
      params.birthday,
      params.workLocationId,
      params.hiringType,
      params.meetingMethod,
      params.selfIntroduction,
      params.talkableTopics,
    );
  }

  static reconstruct(params: EmployeeParams): Employee {
    this.validate(params);
    return new Employee(
      params.id,
      params.userId,
      params.companyId,
      params.occupationId,
      params.gender,
      params.joiningDate,
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
  changeOccupationId(newOccupationId: OccupationId): void {
    occupationIdSchema.parse(newOccupationId);
    this._occupationId = newOccupationId;
  }

  changeWorkLocationId(newWorkLocationId: WorkLocationId): void {
    workLocationIdSchema.parse(newWorkLocationId);
    this._workLocationId = newWorkLocationId;
  }

  changeHiringType(newHiringType: HiringType): void {
    hiringTypeSchema.parse(newHiringType);
    this._hiringType = newHiringType;
  }

  changeMeetingMethod(newMeetingMethod: MeetingMethod): void {
    meetingMethodSchema.parse(newMeetingMethod);
    this._meetingMethod = newMeetingMethod;
  }

  changeSelfIntroduction(newSelfIntroduction: SelfIntroduction): void {
    selfIntroductionSchema.parse(newSelfIntroduction);
    this._selfIntroduction = newSelfIntroduction;
  }

  changeTalkableTopics(newTalkableTopics: TalkableTopics): void {
    talkableTopicsSchema.parse(newTalkableTopics);
    this._talkableTopics = newTalkableTopics;
  }

  changeStatus(newStatus: Status): void {
    statusSchema.parse(newStatus);
    this._status = newStatus;
  }

  get id(): EmployeeId {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get companyId(): CompanyId {
    return this._companyId;
  }

  get gender(): Gender {
    return this._gender;
  }
  
  
  get joiningDate(): JoiningDate {
    return this._joiningDate;
  }
  
  get occupationId(): OccupationId {
    return this._occupationId;
  }

  get status(): Status {
    return this._status;
  }
  
  get birthday(): Birthday | undefined {
    return this._birthday;
  }

  get workLocationId(): WorkLocationId | undefined {
    return this._workLocationId;
  }


  get hiringType(): HiringType | undefined {
    return this._hiringType;
  }

  get meetingMethod(): MeetingMethod | undefined {
    return this._meetingMethod;
  }

  get selfIntroduction(): SelfIntroduction | undefined {
    return this._selfIntroduction;
  }

  get talkableTopics(): TalkableTopics | undefined {
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
