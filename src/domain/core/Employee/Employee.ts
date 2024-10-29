import { GenderEnum, type GenderLabel } from "@/domain/shared/Gender";
import {
	HiringTypeEnum,
	type HiringTypeLabel,
} from "@/domain/shared/HiringType";
import {
	MeetingMethodEnum,
	type MeetingMethodLabel,
} from "@/domain/shared/MeetingMethod";
import { StatusEnum, type StatusLabel } from "@/domain/shared/Status";
import { NamedError } from "@/util/error";
import {
	careerDescriptionSchema,
	employeeParamsSchema,
	hiringTypeSchema,
	imageUrlSchema,
	jobDescriptionSchema,
	joiningDescriptionSchema,
	meetingMethodSchema,
	nameSchema,
	occupationIdSchema,
	otherDescriptionSchema,
	selfIntroductionSchema,
	statusSchema,
	talkableTopicsSchema,
	workLocationIdSchema,
} from "./EmployeeSchema";

export class EmployeeDomainError extends NamedError {
	readonly name = "EmployeeDomainError";
}

/**
 * Employeeパラメータ
 */
export type EmployeeParams = {
	id: string;
	name: string;
	userId: string;
	occupationId: number;
	companyId: number;
	gender: GenderEnum;
	joiningDate: Date;
	status: StatusEnum;
	imageUrl?: string;
	birthday?: Date;
	workLocationId?: number;
	hiringType?: HiringTypeEnum;
	meetingMethod?: MeetingMethodEnum;
	selfIntroduction?: string;
	talkableTopics?: string;
	careerDescription?: string;
	jobDescription?: string;
	joiningDescription?: string;
	otherDescription?: string;
};

/**
 * Employeeエンティティ
 */
export class Employee {
	private constructor(
		private readonly _id: string,
		private readonly _userId: string,
		private _name: string,
		private readonly _companyId: number,
		private _occupationId: number,
		private readonly _gender: GenderEnum,
		private readonly _joiningDate: Date,
		private _status: StatusEnum,
		private _imageUrl?: string,
		private readonly _birthday?: Date,
		private _workLocationId?: number,
		private _hiringType?: HiringTypeEnum,
		private _meetingMethod?: MeetingMethodEnum,
		private _selfIntroduction?: string,
		private _talkableTopics?: string,
		private _careerDescription?: string,
		private _jobDescription?: string,
		private _joiningDescription?: string,
		private _otherDescription?: string,
	) {}

	static create(params: EmployeeParams): Employee {
		Employee.validate(params);
		return new Employee(
			params.id,
			params.userId,
			params.name,
			params.companyId,
			params.occupationId,
			params.gender,
			params.joiningDate,
			params.status,
			params.imageUrl,
			params.birthday,
			params.workLocationId,
			params.hiringType,
			params.meetingMethod,
			params.selfIntroduction,
			params.talkableTopics,
			params.careerDescription,
			params.jobDescription,
			params.joiningDescription,
			params.otherDescription,
		);
	}

	private static validate(params: EmployeeParams): void {
		employeeParamsSchema.parse(params);
	}

	changeName(newName: string): void {
		nameSchema.parse(newName);
		this._name = newName;
	}

	// イミュータブルデータモデルにするか悩み中
	changeOccupationId(newOccupationId: number): void {
		occupationIdSchema.parse(newOccupationId);
		this._occupationId = newOccupationId;
	}

	changeImageUrl(newImageUrl: string): void {
		imageUrlSchema.parse(newImageUrl);
		this._imageUrl = newImageUrl;
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

	changeCareerDescription(newCareerDescription: string): void {
		careerDescriptionSchema.parse(newCareerDescription);
		this._careerDescription = newCareerDescription;
	}

	changeJobDescription(newJobDescription: string): void {
		jobDescriptionSchema.parse(newJobDescription);
		this._jobDescription = newJobDescription;
	}

	changeJoiningDescription(newJoiningDescription: string): void {
		joiningDescriptionSchema.parse(newJoiningDescription);
		this._joiningDescription = newJoiningDescription;
	}

	changeOtherDescription(newOtherDescription: string): void {
		otherDescriptionSchema.parse(newOtherDescription);
		this._otherDescription = newOtherDescription;
	}

	changeStatus(newStatus: StatusEnum): void {
		statusSchema.parse(newStatus);
		this._status = newStatus;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get imageUrl(): string | undefined {
		return this._imageUrl;
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
		return this._talkableTopics;
	}

	get careerDescription(): string | undefined {
		return this._careerDescription;
	}

	get jobDescription(): string | undefined {
		return this._jobDescription;
	}

	get joiningDescription(): string | undefined {
		return this._joiningDescription;
	}

	get otherDescription(): string | undefined {
		return this._otherDescription;
	}

	toGenderLabel(): GenderLabel {
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
				throw new EmployeeDomainError("無効な性別です");
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
				throw new EmployeeDomainError("無効な入社方法です");
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
				throw new EmployeeDomainError("無効な訪問方法です");
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
				throw new EmployeeDomainError("無効なステータスです");
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

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	}

	toYearsOfExperience(): number {
		// 継続年数を返却するロジックを書く
		// 一旦仮置き
		return new Date().getFullYear() - this._joiningDate.getFullYear();
	}
}
