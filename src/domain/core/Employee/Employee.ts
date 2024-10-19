import { CompanyId } from "../Company/CompanyId/CompanyId";
import { UserId } from "../User/UserId/UserId";
import { EmployeeId } from "./EmployeeId/EmployeeId";
import { Gender } from "./Gender/Gender";
import { WorkLocationId } from "./WorkLocationId/WorkLocationId";
import { HiringType } from "./HiringType/HiringType";
import { MeetingMethod } from "./MeetingMethod/MeetingMethod";
import { SelfIntroduction } from "./SelfIntroduction/SelfIntroduction";
import { TalkableTopics } from "./TalkableTopics/TalkableTopics";
import { Status } from "../shared/Status/Status";
import { Birthday } from "./Birthday/Birthday";
import { JoiningDate } from "./JoiningDate/JoiningDate";
import { OccupationId } from "../Occupation/OccupationId/OccupationId";
export class Employee {
  private constructor(
    private readonly _id: EmployeeId,
    private readonly _userId: UserId,
    private readonly _companyId: CompanyId,
    private readonly _gender: Gender,
    private readonly _birthday: Birthday,
    private readonly _joiningDate: JoiningDate,
    private  _occupationId: OccupationId,
    private _workLocationId: WorkLocationId,
    private _hiringType: HiringType,
    private _meetingMethod: MeetingMethod,
    private _selfIntroduction: SelfIntroduction,
    private _talkableTopics: TalkableTopics,
    private _status: Status,
  ) {}

  static create(params: {
    id: EmployeeId;
    userId: UserId;
    companyId: CompanyId;
    gender: Gender;
    birthday: Birthday;
    joiningDate: JoiningDate;
    occupationId: OccupationId;
    workLocationId: WorkLocationId;
    hiringType: HiringType;
    meetingMethod: MeetingMethod;
    selfIntroduction: SelfIntroduction;
    talkableTopics: TalkableTopics;
    status: Status;
  }): Employee {
    return new Employee(
      params.id,
      params.userId,
      params.companyId,
      params.gender,
      params.birthday,
      params.joiningDate,
      params.occupationId,
      params.workLocationId,
      params.hiringType,
      params.meetingMethod,
      params.selfIntroduction,
      params.talkableTopics,
      params.status,
    );
  }

  static reconstruct(params: {
    id: EmployeeId;
    userId: UserId;
    companyId: CompanyId;
    gender: Gender
    birthday: Birthday;
    joiningDate: JoiningDate;
    occupationId: OccupationId;
    workLocationId: WorkLocationId;
    hiringType: HiringType;
    meetingMethod: MeetingMethod;
    selfIntroduction: SelfIntroduction;
    talkableTopics: TalkableTopics;
    status: Status;
  }): Employee {
    return new Employee(
      params.id,
      params.userId,
      params.companyId,
      params.gender,
      params.birthday,
      params.joiningDate,
      params.occupationId,
      params.workLocationId,
      params.hiringType,
      params.meetingMethod,
      params.selfIntroduction,
      params.talkableTopics,
      params.status,
    );
  }

  changeOccupationId(newOccupationId: OccupationId): void {
    this._occupationId = newOccupationId;
  }

  changeWorkLocationId(newWorkLocationId: WorkLocationId): void {
    this._workLocationId = newWorkLocationId;
  }

  changeHiringType(newHiringType: HiringType): void {
    this._hiringType = newHiringType;
  }

  changeMeetingMethod(newMeetingMethod: MeetingMethod): void {
    this._meetingMethod = newMeetingMethod;
  }

  changeSelfIntroduction(newSelfIntroduction: SelfIntroduction): void {
    this._selfIntroduction = newSelfIntroduction;
  }

  changeTalkableTopics(newTalkableTopics: TalkableTopics): void {
    this._talkableTopics = newTalkableTopics;
  }

  changeStatus(newStatus: Status): void {
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
  
  get birthday(): Birthday {
    return this._birthday;
  }

  get joiningDate(): JoiningDate {
    return this._joiningDate;
  }

  get occupationId(): OccupationId {
    return this._occupationId;
  }

  get workLocationId(): WorkLocationId {
    return this._workLocationId;
  }


  get hiringType(): HiringType {
    return this._hiringType;
  }

  get meetingMethod(): MeetingMethod {
    return this._meetingMethod;
  }

  get selfIntroduction(): SelfIntroduction {
    return this._selfIntroduction;
  }

  get talkableTopics(): TalkableTopics {
    return this._talkableTopics
  }

  get status(): Status {
    return this._status;
  }
}
