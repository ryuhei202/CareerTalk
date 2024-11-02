/**
 * ConversationStatusEnum
 */
export enum ConversationStatusEnum {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
}
export type ConversationStatusLabel = "承認待ち" | "承認済み" | "拒否";

/**
 * ConversationPurposeEnum
 */
export enum ConversationPurposeEnum {
	INTERESTED_IN_RECRUITMENT = "INTERESTED_IN_RECRUITMENT",
	INTERESTED_IN_PERSON = "INTERESTED_IN_PERSON",
	INTERESTED_IN_COMPANY = "INTERESTED_IN_COMPANY",
	OTHER = "OTHER",
}

export type ConversationPurposeLabel =
	| "募集内容に興味がある"
	| "募集している人に興味がある"
	| "募集している会社・部署に興味がある"
	| "その他（他に話したい事がある）";
