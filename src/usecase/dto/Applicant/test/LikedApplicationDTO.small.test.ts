import { applicantDummy } from "@/domain/core/Applicant/test/Applicant.dummy";
import { describe, expect, test } from "vitest";
import { LikedApplicantDTO } from "../LikedApplicantDTO";
describe("LikedApplicantDTO", () => {
	const applicant = applicantDummy;
	const occupation = {
		id: 1,
		name: "営業職",
	};

	test("LikedApplicantDTOが正常に作成される", () => {
		const likedApplicantDTO = new LikedApplicantDTO({
			applicant,
			occupation,
		});

		expect(likedApplicantDTO).toBeDefined();
		expect(likedApplicantDTO.userId).toBe(applicant.userId);
		expect(likedApplicantDTO.name).toBe(applicant.name);
		expect(likedApplicantDTO.gender).toBe(applicant.toGenderLabel());
		expect(likedApplicantDTO.age).toBe(applicant.getAge());
		expect(likedApplicantDTO.yearsOfExperience).toBe(
			applicant.toYearsOfExperience(),
		);
		expect(likedApplicantDTO.occupationName).toBe(occupation.name);
		expect(likedApplicantDTO.selfIntroduction).toBe(applicant.selfIntroduction);
		expect(likedApplicantDTO.imageUrl).toBe(applicant.imageUrl);
	});

	test("toJson", () => {
		const likedApplicantDTO = new LikedApplicantDTO({
			applicant,
			occupation,
		});
		const likedApplicantJson = likedApplicantDTO.toJson();

		expect(likedApplicantJson).toBeDefined();
		expect(likedApplicantJson.userId).toBe(applicant.userId);
		expect(likedApplicantJson.name).toBe(applicant.name);
		expect(likedApplicantJson.gender).toBe(applicant.toGenderLabel());
		expect(likedApplicantJson.age).toBe(applicant.getAge());
		expect(likedApplicantJson.yearsOfExperience).toBe(
			applicant.toYearsOfExperience(),
		);
		expect(likedApplicantJson.occupationName).toBe(occupation.name);
		expect(likedApplicantJson.selfIntroduction).toBe(
			applicant.selfIntroduction,
		);
		expect(likedApplicantJson.imageUrl).toBe(applicant.imageUrl);
	});
});
