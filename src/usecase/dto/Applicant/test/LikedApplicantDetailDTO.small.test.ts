import { applicantDummy } from "@/domain/core/Applicant/test/Applicant.dummy";
import { conversationDummy } from "@/domain/core/Conversation/test/Conversation.dummy";
import { describe, expect, test } from "vitest";
import { LikedApplicantDetailDTO } from "../LIkedApplicantDetailDOT";
describe("LikedApplicantDetailDTO", () => {
	const applicant = applicantDummy;
	const occupation = {
		id: 1,
		name: "営業職",
	};
	const conversation = conversationDummy;
	test("LikedApplicantDetailDTOが正常に作成される", () => {
		const likedApplicantDetailDTO = new LikedApplicantDetailDTO({
			applicant,
			occupation,
			conversation,
		});

		expect(likedApplicantDetailDTO).toBeDefined();
		expect(likedApplicantDetailDTO.userId).toBe(applicant.userId);
		expect(likedApplicantDetailDTO.name).toBe(applicant.name);
		expect(likedApplicantDetailDTO.gender).toBe(applicant.toGenderLabel());
		expect(likedApplicantDetailDTO.age).toBe(applicant.getAge());
		expect(likedApplicantDetailDTO.yearsOfExperience).toBe(
			applicant.toYearsOfExperience(),
		);
		expect(likedApplicantDetailDTO.occupationName).toBe(occupation.name);
		expect(likedApplicantDetailDTO.likeReason).toBe(
			conversation.toPurposeLabel(),
		);
		expect(likedApplicantDetailDTO.likeMessage).toBe(
			conversation.getLatestMessage()?.content,
		);
		expect(likedApplicantDetailDTO.selfIntroduction).toBe(
			applicant.selfIntroduction,
		);
		expect(likedApplicantDetailDTO.imageUrl).toBe(applicant.imageUrl);
	});

	test("toJson", () => {
		const likedApplicantDetailDTO = new LikedApplicantDetailDTO({
			applicant,
			occupation,
			conversation,
		});
		const likedApplicantDetailJson = likedApplicantDetailDTO.toJson();

		expect(likedApplicantDetailJson).toBeDefined();
		expect(likedApplicantDetailJson.applicant.userId).toBe(applicant.userId);
		expect(likedApplicantDetailJson.applicant.name).toBe(applicant.name);
		expect(likedApplicantDetailJson.applicant.gender).toBe(
			applicant.toGenderLabel(),
		);
		expect(likedApplicantDetailJson.applicant.age).toBe(applicant.getAge());
		expect(likedApplicantDetailJson.applicant.yearsOfExperience).toBe(
			applicant.toYearsOfExperience(),
		);
		expect(likedApplicantDetailJson.applicant.occupationName).toBe(
			occupation.name,
		);
		expect(likedApplicantDetailJson.applicant.selfIntroduction).toBe(
			applicant.selfIntroduction,
		);
		expect(likedApplicantDetailJson.applicant.imageUrl).toBe(
			applicant.imageUrl,
		);
		expect(likedApplicantDetailJson.likeReason).toBe(
			conversation.toPurposeLabel(),
		);
		expect(likedApplicantDetailJson.likeMessage).toBe(
			conversation.getLatestMessage()?.content,
		);
	});
});
