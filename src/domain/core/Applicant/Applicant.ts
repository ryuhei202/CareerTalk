import { GenderEnum, type GenderLabel } from "@/domain/shared/Gender";
import { StatusEnum, type StatusLabel } from "@/domain/shared/Status";
import { NamedError } from "@/util/error";
import {
	applicantParamsSchema,
	companySchema,
	educationSchema,
	imageUrlSchema,
	joiningDateSchema,
	nameSchema,
	occupationIdSchema,
	selfIntroductionSchema,
	statusSchema,
	workHistorySchema,
} from "./ApplicantSchema";

export class ApplicantDomainError extends NamedError {
	readonly name = "ApplicantDomainError";
}

/**
 * Applicantパラメータ
 */
export type ApplicantParams = {
	id: string;
	name: string;
	userId: string;
	occupationId: number;
	gender: GenderEnum;
	joiningDate?: Date;
	status: StatusEnum;
	imageUrl?: string;
	birthday?: Date;
	selfIntroduction?: string;
	company?: string;
	workHistory?: string;
	education?: string;
};

/**
 * Applicantエンティティ
 */
export class Applicant {
	private constructor(
		private readonly _id: string,
		private readonly _userId: string,
		private _name: string,
		private _occupationId: number,
		private readonly _gender: GenderEnum,
		private _status: StatusEnum,
		private _joiningDate?: Date | undefined,
		private _imageUrl?: string,
		private readonly _birthday?: Date,
		private _selfIntroduction?: string,
		private _company?: string,
		private _workHistory?: string,
		private _education?: string,
	) {}

	static create(params: ApplicantParams): Applicant {
		Applicant.validate(params);
		return new Applicant(
			params.id,
			params.userId,
			params.name,
			params.occupationId,
			params.gender,
			params.status,
			params.joiningDate,
			params.imageUrl,
			params.birthday,
			params.selfIntroduction,
			params.company,
			params.workHistory,
			params.education,
		);
	}

	private static validate(params: ApplicantParams): void {
		applicantParamsSchema.parse(params);
	}

	changeName(newName: string): void {
		nameSchema.parse(newName);
		this._name = newName;
	}

	changeOccupationId(newOccupationId: number): void {
		occupationIdSchema.parse(newOccupationId);
		this._occupationId = newOccupationId;
	}

	changeImageUrl(newImageUrl: string): void {
		imageUrlSchema.parse(newImageUrl);
		this._imageUrl = newImageUrl;
	}
	changeJoiningDate(newJoiningDate: Date): void {
		joiningDateSchema.parse(newJoiningDate);
		this._joiningDate = newJoiningDate;
	}

	changeSelfIntroduction(newSelfIntroduction: string): void {
		selfIntroductionSchema.parse(newSelfIntroduction);
		this._selfIntroduction = newSelfIntroduction;
	}
	changeCompany(newCompany: string): void {
		companySchema.parse(newCompany);
		this._company = newCompany;
	}
	changeWorkHistory(newWorkHistory: string): void {
		workHistorySchema.parse(newWorkHistory);
		this._workHistory = newWorkHistory;
	}
	changeEducation(newEducation: string): void {
		educationSchema.parse(newEducation);
		this._education = newEducation;
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

	get gender(): GenderEnum {
		return this._gender;
	}

	get joiningDate(): Date | undefined {
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

	get selfIntroduction(): string | undefined {
		return this._selfIntroduction;
	}
	get company(): string | undefined {
		return this._company;
	}
	get workHistory(): string | undefined {
		return this._workHistory;
	}
	get education(): string | undefined {
		return this._education;
	}

	toGenderLabel(): GenderLabel {
		switch (this._gender) {
			case GenderEnum.MALE:
				return "男性";
			case GenderEnum.FEMALE:
				return "女性";
			default:
				throw new ApplicantDomainError("無効な性別です");
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
				throw new ApplicantDomainError("無効なステータスです");
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

	toYearsOfExperience(): number | undefined {
		if (this._joiningDate == null) {
			return undefined;
		}
		const today = new Date();
		const joiningDate = new Date(this._joiningDate);
		let years = today.getFullYear() - joiningDate.getFullYear();
		const monthDiff = today.getMonth() - joiningDate.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < joiningDate.getDate())
		) {
			years--;
		}

		return years + 1;
	}
}
