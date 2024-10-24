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
const nameSchema = z
	.string()
	.min(1, { message: "名前は1文字以上である必要があります" })
	.max(100, { message: "名前は100文字以下である必要があります" });
const userIdSchema = z.string().length(25, {
	message: "無効なユーザーIdです。ユーザーIDは25文字である必要があります",
});
const employeeIdSchema = z
	.string()
	.length(25, { message: "IDは25文字である必要があります" });

const companyIdSchema = z.number().min(1, { message: "不正な企業Idです" });
const occupationIdSchema = z.number().min(1, { message: "不正な職種Idです" });
const genderSchema = z.nativeEnum(GenderEnum, { message: "無効な性別です" });
const joiningDateSchema = z.date().refine(
	(date) => {
		const now = new Date();
		return date <= now;
	},
	{ message: "無効な入社日です" },
);
const statusSchema = z.nativeEnum(StatusEnum);

// 以下必須ではない項目
const imageUrlSchema = z
	.string()
	.url({ message: "無効な画像URLです" })
	.optional();
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
const workLocationIdSchema = z
	.number()
	.min(1, { message: "不正な勤務地Idです" })
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
	name: nameSchema,
	imageUrl: imageUrlSchema,
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
});

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
