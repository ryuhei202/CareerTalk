"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import type { EmployeeDetailResponse } from "@/usecase/getEmployeeDetail/EmployeeDetailDTO";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Occupation, WorkLocation } from "@prisma/client";
import * as Avatar from "@radix-ui/react-avatar";
import type { Session } from "next-auth";
import Link from "next/link";
import { useFormState } from "react-dom";
import {
  type UpdateEmployeeForMyPageActionResult,
  updateEmployeeForMyPageAction,
} from "../_actions/updateEmployeeForMyPageAction";
import { updateEmployeeSchema } from "../_schema/updateEmployeeSchema";

// SearchEmployeeBox.tsxと共通化したい
const HIRING_TYPE = [
  {
    id: 1,
    value: "NEW_GRADUATE",
    label: "新卒入社",
  },
  {
    id: 2,
    value: "MID_CAREER",
    label: "中途入社",
  },
  {
    id: 3,
    value: "BOTH",
    label: "両方",
  },
] as const;

const MEETING_METHOD = [
  {
    id: 1,
    value: "ONLINE",
    label: "オンライン",
  },
  {
    id: 2,
    value: "OFFLINE",
    label: "対面",
  },
  {
    id: 3,
    value: "BOTH",
    label: "全て",
  },
] as const;

export const EditMyPageFormContent = ({
  employee,
  user,
  occupations,
  workLocations,
}: {
  user: Session["user"];
  employee: EmployeeDetailResponse;
  occupations: Occupation[];
  workLocations: WorkLocation[];
}) => {
  const [lastResult, action] = useFormState<
    UpdateEmployeeForMyPageActionResult,
    FormData
  >(updateEmployeeForMyPageAction, null);

  const [form, fields] = useForm({
    // 前回の送信結果を同期
    lastResult: lastResult?.submission,
    shouldValidate: "onInput",
    // クライアントでバリデーション・ロジックを再利用する
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateEmployeeSchema });
    },

    onSubmit() {
      if (lastResult?.result && lastResult.result.success === false) {
        alert(`入力に間違いがあります。¥n${lastResult.result.message}`);
      }
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
            <Avatar.Root className="w-44 h-44 rounded-full">
              {employee.imageUrl && (
                <Avatar.Image
                  className="w-full h-full rounded-full"
                  src={employee.imageUrl}
                  alt={employee.name}
                />
              )}
              <Avatar.Fallback>{employee.name[0]}</Avatar.Fallback>
            </Avatar.Root>
          </div>
          <div className="w-full">
            <div className="my-5">
              <div className="flex flex-col items-start">
                <div className="bg-white p-2 rounded-md mb-2">名前(必須)</div>
                <Input
                  name="name"
                  type="text"
                  defaultValue={employee.name}
                  className="ms-4 text-2xl font-bold"
                />
                <div className="text-red-500 ms-4 mb-4">
                  {fields.name.errors}
                </div>
                <div className="text-gray-600 ">{employee.gender}</div>
              </div>
              <div className="text-gray-600 mb-4">{user.email}</div>
            </div>
            <div className="my-5">
              <span>{employee.companyName}</span>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">職種(必須)</div>
              <select
                name="occupation"
                className="ms-4 mt-2 border p-2 rounded"
                defaultValue={employee.occupation ? employee.occupation.id : ""}
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
              <div className="bg-white p-2 rounded-md">入社歴</div>
              <span className="ms-4 mt-2">
                {employee.yearsOfExperience}年目
              </span>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">入社方法</div>
              <select
                name="hiringType"
                className="ms-4 mt-2 border p-2 rounded"
                defaultValue={employee.hiringType}
              >
                {HIRING_TYPE.map((hiringType) => (
                  <option key={hiringType.id} value={hiringType.value}>
                    {hiringType.label}
                  </option>
                ))}
              </select>
              <div className="text-red-500 ms-4">
                {fields.hiringType.errors}
              </div>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">勤務地</div>
              <select
                name="workLocation"
                className="ms-4 mt-2 border p-2 rounded"
                defaultValue={employee.workLocation?.id}
              >
                {workLocations.map((workLocation) => (
                  <option key={workLocation.id} value={workLocation.id}>
                    {workLocation.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500 ms-4">
                {fields.workLocation.errors}
              </div>
            </div>
            <div className="my-5 flex flex-col items-start">
              <div className="bg-white p-2 rounded-md">面談方法</div>
              <select
                name="meetingMethod"
                className="ms-4 mt-2 border p-2 rounded"
                defaultValue={employee.meetingMethod}
              >
                {MEETING_METHOD.map((method) => (
                  <option key={method.id} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
              <div className="text-red-500 ms-4">
                {fields.meetingMethod.errors}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="flex justify-end">
          <Link href={"/employee/my_page"}>
            <Button>戻る</Button>
          </Link>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            呼び込みメッセージ
          </h2>
          <Textarea
            name="barkerMessage"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.barkerMessage}
          />
          <div className="text-red-500">{fields.barkerMessage.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            自己紹介
          </h2>
          <Textarea
            name="selfIntroduction"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.selfIntroduction}
          />
          <div className="text-red-500">{fields.selfIntroduction.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            話せる内容
          </h2>
          <Textarea
            name="talkableTopics"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.talkableTopics}
          />
          <div className="text-red-500">{fields.talkableTopics.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            所属・経歴
          </h2>
          <Textarea
            name="careerDescription"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.careerDescription}
          />
          <div className="text-red-500">{fields.careerDescription.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            業務内容
          </h2>
          <Textarea
            name="jobDescription"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.jobDescription}
          />
          <div className="text-red-500">{fields.jobDescription.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            入社経緯
          </h2>
          <Textarea
            name="joiningDescription"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.joiningDescription}
          />
          <div className="text-red-500">{fields.joiningDescription.errors}</div>
        </div>
        <div className="mt-6 mb-14">
          <h2 className="text-gray-700 text-3xl font-bold mb-3 border-b border-gray-400 pb-3">
            その他
          </h2>
          <Textarea
            name="otherDescription"
            className="min-h-44 [field-sizing:content]"
            defaultValue={employee.otherDescription}
          />
          <div className="text-red-500">{fields.otherDescription.errors}</div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">保存</Button>
        </div>
      </div>
    </form>
  );
};
