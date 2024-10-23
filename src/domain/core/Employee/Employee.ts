import { z } from "zod";
import { Company } from "../Company/Company";
import { Occupation } from "../Occupation/Occupation";
import { userIdSchema } from "../User/User";
import { WorkLocation } from "../WorkLocation/WorkLocation";

/**
 * Employee関連のEnum
 */
export enum GenderEnum {
	OTHER = "OTHER",
	MALE = "MALE",
	FEMALE = "FEMALE",
	PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export type GenderLabel = "その他" | "男性" | "女性" | "回答しない";

export enum HiringTypeEnum {
	NEW_GRADUATE = "NEW_GRADUATE",
	MID_CAREER = "MID_CAREER",
}
export type HiringTypeLabel = "新卒採用" | "中途採用";

export enum MeetingMethodEnum {
	ONLINE = "ONLINE",
	OFFLINE = "OFFLINE",
	BOTH = "BOTH",
}
export type MeetingMethodLabel =
	| "オンライン"
	| "オフライン"
	| "オンライン/オフライン";

export enum StatusEnum {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
}
export type StatusLabel = "審査中" | "承認済み" | "拒否";

/**
 * Employee関連のバリデーションスキーマ
 */
// 必須
const employeeIdSchema = z
	.string()
	.length(24, { message: "IDは24文字である必要があります" });
const companySchema = z.custom<Company>((value) => value instanceof Company, {
	message: "不正な企業です",
});
const occupationSchema = z.custom<Occupation>(
	(value) => value instanceof Occupation,
	{
		message: "不正な職種です",
	},
);
const genderSchema = z.nativeEnum(GenderEnum, { message: "無効な性別です" });
const joiningDateSchema = z.date().refine(
	(date) => {
		const now = new Date();
		return date <= now;
	},
	{ message: "無効な入社日です" },
);
const statusSchema = z.nativeEnum(StatusEnum);
// 必須ではない
const birthdaySchema = z
	.date()
	.refine(
		(date) => {
			const now = new Date();
			const minDate = new Date(
				now.getFullYear() - 100,
				now.getMonth(),
				now.getDate(),
			);
			return date <= now && date >= minDate;
		},
		{ message: "無効な生年月日です" },
	)
	.optional();
const workLocationSchema = z
	.custom<WorkLocation>((value) => value instanceof WorkLocation, {
		message: "不正な勤務地です",
	})
	.optional();
const hiringTypeSchema = z
	.nativeEnum(HiringTypeEnum, { message: "無効な入社方法です" })
	.optional();
const meetingMethodSchema = z
	.nativeEnum(MeetingMethodEnum, { message: "無効な訪問方法です" })
	.optional();
const selfIntroductionSchema = z
	.string()
	.max(1000, { message: "自己紹介は1000文字以下である必要があります" })
	.optional();
const talkableTopicsSchema = z
	.string()
	.max(1000, { message: "話せる内容は1000文字以下である必要があります" })
	.optional();

const employeeParamsSchema = z.object({
	id: employeeIdSchema,
	userId: userIdSchema,
	company: companySchema,
	occupation: occupationSchema,
	gender: genderSchema,
	joiningDate: joiningDateSchema,
	status: statusSchema,
	birthday: birthdaySchema,
	workLocation: workLocationSchema,
	hiringType: hiringTypeSchema,
	meetingMethod: meetingMethodSchema,
	selfIntroduction: selfIntroductionSchema,
	talkableTopics: talkableTopicsSchema,
});

/**
 * Employeeパラメータ
 */
export type EmployeeParams = {
	id: string;
	userId: string;
	company: Company;
	occupation: Occupation;
	gender: GenderEnum;
	joiningDate: Date;
	status: StatusEnum;
	birthday?: Date;
	workLocation?: WorkLocation;
	hiringType?: HiringTypeEnum;
	meetingMethod?: MeetingMethodEnum;
	selfIntroduction?: string;
	talkableTopics?: string;
};

/**
 * Employeeエンティティ
 */
export class Employee {
	private constructor(
		private readonly _id: string,
		private readonly _userId: string,
		private readonly _company: Company, // 企業エンティティ
		private readonly _gender: GenderEnum,
		private readonly _joiningDate: Date,
		private _occupation: Occupation, // 職種エンティティ
		private _status: StatusEnum,
		private readonly _birthday?: Date,
		private _workLocation?: WorkLocation, // 勤務地エンティティ
		private _hiringType?: HiringTypeEnum,
		private _meetingMethod?: MeetingMethodEnum,
		private _selfIntroduction?: string,
		private _talkableTopics?: string,
	) {}

	static create(params: EmployeeParams): Employee {
		Employee.validate(params);
		return new Employee(
			params.id,
			params.userId,
			params.company,
			params.gender,
			params.joiningDate,
			params.occupation,
			params.status,
			params.birthday,
			params.workLocation,
			params.hiringType,
			params.meetingMethod,
			params.selfIntroduction,
			params.talkableTopics,
		);
	}

	private static validate(params: EmployeeParams): void {
		employeeParamsSchema.parse(params);
	}

	// イミュータブルデータモデルにするか悩み中
	changeOccupation(newOccupation: Occupation): void {
		occupationSchema.parse(newOccupation);
		this._occupation = newOccupation;
	}

	changeWorkLocation(newWorkLocation: WorkLocation): void {
		workLocationSchema.parse(newWorkLocation);
		this._workLocation = newWorkLocation;
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

	get company(): Company {
		return this._company;
	}

	get gender(): GenderEnum {
		return this._gender;
	}

	get joiningDate(): Date {
		return this._joiningDate;
	}

	get occupation(): Occupation {
		return this._occupation;
	}

	get status(): StatusEnum {
		return this._status;
	}

	get birthday(): Date | undefined {
		return this._birthday;
	}

	get workLocation(): WorkLocation | undefined {
		return this._workLocation;
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
