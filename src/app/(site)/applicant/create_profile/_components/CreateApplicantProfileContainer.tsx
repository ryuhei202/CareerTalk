"use client";
import { Alert } from "@/app/_components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { GenderEnum } from "@/domain/shared/Gender";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerApplicantAction } from "../_actions/registerApplicantAction";
import type { TOccupation } from "../page";
import { SubmitCreateApplicantProfileButton } from "./SubmitCreateApplicantProfileButton";

export type FormState = {
  message: string;
  success: boolean | undefined;
  data: { [key: string]: FormDataEntryValue } | undefined;
};

const genderOptions = Object.values(GenderEnum) as [string, ...string[]];
const formSchema = z.object({
  name: z.string().trim().min(1, {
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
  joinDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    },
    {
      message: "社会人になった月は今日以前の日付を選択してください",
    }
  ),
  occupation: z.string().trim().min(1, {
    message: "職種は必須です",
  }),
  selfIntroduction: z.string().trim().optional(),
  workHistory: z.string().trim().optional(),
  company: z.string().trim().optional(),
  education: z.string().trim().optional(),
});

// TODO: あとでしっかりとコンポーネントを分割する。（デザイン待ち）
export default function CreateProfileApplicant({
  occupations,
  userName,
}: {
  occupations: TOccupation[];
  userName: string;
}) {
  const [state, formAction] = useFormState<FormState, FormData>(
    registerApplicantAction,
    {
      success: undefined,
      message: "",
      data: undefined,
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (state.data?.name as string) || userName,
      gender: (state.data?.gender as string) ?? undefined,
      birthday: (state.data?.birthday as string) ?? undefined,
      joinDate: (state.data?.joinDate as string) ?? "",
      occupation: (state.data?.occupation as string) ?? "",
      selfIntroduction: (state.data?.selfIntroduction as string) ?? undefined,
      company: (state.data?.company as string) ?? undefined,
      workHistory: (state.data?.workHistory as string) ?? undefined,
      education: (state.data?.education as string) ?? undefined,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        プロフィール作成
      </h1>
      {state.success === false && (
        <Alert variant="destructive">{state.message}</Alert>
      )}
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(() => {
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
                  生年月日（必須）
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
            name="joinDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  社会人になった月
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
            name="workHistory"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-start">
                <FormLabel className="text-sm font-medium text-gray-700 pt-2">
                  職務経歴
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
            name="education"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-start">
                <FormLabel className="text-sm font-medium text-gray-700 pt-2">
                  学歴
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
            name="company"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-start">
                <FormLabel className="text-sm font-medium text-gray-700 pt-2">
                  会社名
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
          <div className="flex justify-end">
            <SubmitCreateApplicantProfileButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
