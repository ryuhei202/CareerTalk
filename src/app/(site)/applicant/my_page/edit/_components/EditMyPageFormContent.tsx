"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { APPLICANT_SELF_INTRODUCTION_PLACEHOLDER, APPLICANT_WORK_HISTORY_PLACEHOLDER } from "@/constants/placeholders/applicant-placeholders";
import type { ApplicantDetailResponse } from "@/usecase/getApplicantDetail/getApplicantDetailUseCase";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Occupation } from "@prisma/client";
import * as Avatar from "@radix-ui/react-avatar";
import type { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { convertFileToBase64 } from "../../../search_employees/_util/convertFileToBase64";
import {
  type UpdateApplicantForMyPageActionResult,
  updateApplicantForMyPageAction,
} from "../_actions/updateEmployeeForMyPageAction";
import { updateApplicantForMyPageSchema } from "../_schema/updateApplicantForMyPageSchema";

export const EditMyPageFormContent = ({
  applicant,
  user,
  occupations,
}: {
  user: Session["user"];
  applicant: ApplicantDetailResponse;
  occupations: Occupation[];
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lastResult, action] = useFormState<
    UpdateApplicantForMyPageActionResult,
    FormData
  >(updateApplicantForMyPageAction, null);

  const [form, fields] = useForm({
    // 前回の送信結果を同期
    lastResult: lastResult?.submission,
    shouldValidate: "onInput",
    // クライアントでバリデーション・ロジックを再利用する
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateApplicantForMyPageSchema });
    },

    onSubmit() {
      if (lastResult?.result && lastResult.result.success === false) {
        alert(`入力に間違いがあります。
          ${lastResult.result.message}`);
      }
    },
    defaultValue: {
      imageBase64: "", // 初期値を設定
    },
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="grid grid-cols-12 gap-8 container mt-16 mx-auto mb-12"
    >
      <div className="col-span-4">
        <div className="flex flex-col items-center shadow rounded-xl py-4 px-8 bg-background-accent">
          <div className="flex items-center gap-4">
            <Avatar.Root className="w-44 h-44 rounded-full relative">
              {(imagePreview || applicant.imageUrl) && (
                <Avatar.Image
                  className="w-full h-full rounded-full"
                  src={imagePreview || applicant.imageUrl}
                  alt={applicant.name}
                />
              )}
              <Avatar.Fallback>{applicant.name[0]}</Avatar.Fallback>
              <input
                type="hidden"
                name="imageBase64"
                value={fields.imageBase64.value}
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64 = await convertFileToBase64(file);
                    setImagePreview(base64);

                    form.update({
                      name: "imageBase64",
                      value: base64,
                    });
                  }
                }}
              />
            </Avatar.Root>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => {
              document.getElementById("imageUpload")?.click();
            }}
          >
            画像を変更
          </Button>
          <div className="w-full">
            <div className="my-5">
              <div className="flex items-center">
                <div className="text-2xl font-bold">{applicant.name}</div>
                <div className="text-gray-600 ms-2">{applicant.gender}</div>
              </div>
              <div className="text-gray-600 mb-4">{user.email}</div>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">会社名</div>
              <Input
                type="text"
                name="company"
                className="ms-4 mt-2"
                defaultValue={applicant.company}
              />
              <div className="text-red-500 ms-4">{fields.company.errors}</div>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">職種(必須)</div>
              <select
                name="occupation"
                className="ms-4 mt-2 border p-2 rounded"
                defaultValue={
                  applicant.occupation ? applicant.occupation.id : ""
                }
              >
                {occupations.map((occupation) => (
                  <option key={occupation.id} value={occupation.id}>
                    {occupation.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500 ms-4">
                {fields.occupation.errors}
              </div>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">社会人になった月</div>
              <Input
                type="month"
                name="joiningDate"
                className="ms-4 mt-2"
                defaultValue={
                  applicant.joiningDate
                    ? applicant.joiningDate.toISOString().slice(0, 7)
                    : undefined
                }
              />
              <div className="text-red-500 ms-4">
                {fields.joiningDate.errors}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="flex justify-end">
          <Link href={"/applicant/my_page"}>
            <Button variant="outline">戻る</Button>
          </Link>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
            自己紹介
          </h2>
          <Textarea
            name="selfIntroduction"
            className="h-44"
            defaultValue={applicant.selfIntroduction}
            placeholder={APPLICANT_SELF_INTRODUCTION_PLACEHOLDER}
          />
          <div className="text-red-500">{fields.selfIntroduction.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
            職務経歴
          </h2>
          <Textarea
            name="workHistory"
            className="h-44"
            defaultValue={applicant.workHistory}
            placeholder={APPLICANT_WORK_HISTORY_PLACEHOLDER}
          />
          <div className="text-red-500">{fields.workHistory.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b pb-3 border-gray-400">
            学歴
          </h2>
          <Textarea
            name="education"
            className="h-44"
            defaultValue={applicant.education}
          />
          <div className="text-red-500">{fields.education.errors}</div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">保存</Button>
        </div>
      </div>
    </form>
  );
};
