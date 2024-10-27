import { GenderEnum } from "@/domain/shared/Gender";
import { HiringTypeEnum } from "@/domain/shared/HiringType";
import { MeetingMethodEnum } from "@/domain/shared/MeetingMethod";
import { z } from "zod";
import type { RegisterEmployeeParams } from "../_actions/registerEmployeeAction";

export const validateRegisterEmployeeUseCaseParams = (
  params: RegisterEmployeeParams
) => {
  // スキーマ定義
  const userIdSchema = z.string().trim().length(25);
  const nameSchema = z.string().trim().min(1);
  const companyCodeSchema = z.string().trim().length(8);
  const occupationIdSchema = z.number().int().positive();
  const genderSchema = z.nativeEnum(GenderEnum);
  const joiningDateSchema = z.date();
  const birthdaySchema = z.date().optional();
  const workLocationIdSchema = z.number().int().positive().optional();
  const hiringTypeSchema = z.nativeEnum(HiringTypeEnum).optional();
  const meetingMethodSchema = z.nativeEnum(MeetingMethodEnum).optional();
  const selfIntroductionSchema = z.string().trim().optional();
  const talkableTopicsSchema = z.string().trim().optional();

  const paramsSchema = z.object({
    userId: userIdSchema,
    name: nameSchema,
    companyCode: companyCodeSchema,
    occupationId: occupationIdSchema,
    gender: genderSchema,
    joiningDate: joiningDateSchema,
    birthday: birthdaySchema,
    workLocationId: workLocationIdSchema,
    hiringType: hiringTypeSchema,
    meetingMethod: meetingMethodSchema,
    selfIntroduction: selfIntroductionSchema,
    talkableTopics: talkableTopicsSchema,
  });

  return paramsSchema.parse(params);
};
