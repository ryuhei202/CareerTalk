"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import {
  GenderEnum,
  HiringTypeEnum,
  MeetingMethodEnum,
} from "@/domain/core/Employee/Employee";
import { WORK_LOCATION_OPTIONS } from "@/app/_shared/constants/workLocationOptions";
import { useFormState } from "react-dom";
import { registerEmployeeAction } from "@/app/(site)/employee/create_profile/_actions/registerEmployeeAction";
import { useRef } from "react";
import { TOccupation } from "../page";

export type FormState = {
  message: string;
  success: boolean;
  data: { [key: string]: FormDataEntryValue } | undefined;
};

const genderOptions = Object.values(GenderEnum) as [string, ...string[]];
const hiringTypeOptions = Object.values(HiringTypeEnum) as [
  string,
  ...string[]
];
const meetingMethodOptions = Object.values(MeetingMethodEnum) as [
  string,
  ...string[]
];
const formSchema = z.object({
  name: z.string().min(1, {
    message: "名前は必須です",
  }),
  gender: z.enum(genderOptions, {
    message: "性別は必須です",
  }),
  birthday: z
    .string()
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate <= today;
      },
      {
        message: "生年月日は今日以前の日付を選択してください",
      }
    )
    .optional(),
  companyCode: z
    .string()
    .min(1, {
      message: "企業コードは必須です",
    })
    .length(8, {
      message: "企業コードは8文字で入力してください",
    }),
  joinDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    },
    {
      message: "入社日は今日以前の日付を選択してください",
    }
  ),
  occupation: z.string().min(1, {
    message: "職種は必須です",
  }),
  workLocation: z.string().optional(),
  hiringType: z.enum(hiringTypeOptions).optional(),
  meetingMethod: z.enum(meetingMethodOptions).optional(),
  selfIntroduction: z.string().optional(),
  talkableTopics: z.string().optional(),
});

export default function CreateProfileEmployee({
  occupations,
  userName,
}: {
  occupations: TOccupation[];
  userName: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName,
      gender: undefined,
      birthday: undefined,
      companyCode: "",
      joinDate: "",
      occupation: "",
      workLocation: undefined,
      hiringType: undefined,
      meetingMethod: undefined,
      selfIntroduction: undefined,
      talkableTopics: undefined,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(registerEmployeeAction, {
    success: false,
    message: "",
    data: undefined,
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        プロフィール作成
      </h1>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit((data) => {
            console.log("data", data);
            formRef.current?.submit();
          })}
          className="space-y-6"
          action={formAction}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  名前（必須）
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-3 gap-4 items-center">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    性別（必須）
                  </FormLabel>
                  <div className="col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name="gender"
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">男性</SelectItem>
                        <SelectItem value="FEMALE">女性</SelectItem>
                        <SelectItem value="OTHER">その他</SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          回答しない
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  生年月日
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyCode"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  企業コード（必須）
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joinDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  入社日（必須）
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  職種（必須）
                </FormLabel>
                <div className="col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="occupation"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occupations.map((occupation) => (
                        <SelectItem
                          key={occupation.id}
                          value={occupation.id.toString()}
                        >
                          {occupation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workLocation"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  勤務地
                </FormLabel>
                <div className="col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    name="workLocation"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WORK_LOCATION_OPTIONS.map((workLocation) => (
                        <SelectItem
                          key={workLocation.id}
                          value={workLocation.id.toString()}
                        >
                          {workLocation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hiringType"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  入社方法
                </FormLabel>
                <div className="col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="hiringType"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NEW_GRADUATE">新卒入社</SelectItem>
                      <SelectItem value="MID_CAREER">中途入社</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meetingMethod"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  訪問方法
                </FormLabel>
                <div className="col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="meetingMethod"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONLINE">オンライン</SelectItem>
                      <SelectItem value="OFFLINE">オフライン</SelectItem>
                      <SelectItem value="BOTH">
                        オンライン/オフライン
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selfIntroduction"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-start">
                <FormLabel className="text-sm font-medium text-gray-700 pt-2">
                  自己紹介
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="talkableTopics"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-start">
                <FormLabel className="text-sm font-medium text-gray-700 pt-2">
                  話せる内容
                </FormLabel>
                <div className="col-span-2">
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">送信</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
