"use client";
import { Alert } from "@/app/_components/ui/alert";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
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
import Image from "next/image";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { convertFileToBase64 } from "../../search_employees/_util/convertFileToBase64";
import { registerApplicantAction } from "../_actions/registerApplicantAction";
import type { TOccupation } from "../page";

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
  birthday: z.string({ message: "生年月日は必須です" }).refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    },
    {
      message: "生年月日は今日以前の日付を選択してください",
    }
  ),
  joinDate: z.string({ message: "社会人になった月は必須です" }).refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    },
    {
      message: "社会人になった月は今日以前の日付を選択してください",
    }
  ),
  occupation: z.string({ message: "職種は必須です" }),
  selfIntroduction: z
    .string()
    .trim()
    .max(1000, {
      message: "自己紹介は1000文字以内で入力してください",
    })
    .optional(),
  workHistory: z
    .string()
    .trim()
    .max(1000, {
      message: "職務経歴は1000文字以内で入力してください",
    })
    .optional(),
  company: z
    .string()
    .trim()
    .max(100, {
      message: "会社名は100文字以内で入力してください",
    })
    .optional(),
  education: z
    .string()
    .trim()
    .max(100, {
      message: "学歴は100文字以内で入力してください",
    })
    .optional(),
  imageUrl: z.string().optional(),
  imageBase64: z.string().optional(),
});

// TODO: あとでしっかりとコンポーネントを分割する。（デザイン待ち）
export default function CreateProfileApplicant({
  occupations,
  userName,
  userImage,
}: {
  occupations: TOccupation[];
  userName: string;
  userImage: string;
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
      joinDate: (state.data?.joinDate as string) ?? undefined,
      occupation: (state.data?.occupation as string) ?? undefined,
      selfIntroduction: (state.data?.selfIntroduction as string) ?? undefined,
      company: (state.data?.company as string) ?? undefined,
      workHistory: (state.data?.workHistory as string) ?? undefined,
      education: (state.data?.education as string) ?? undefined,
      imageUrl: (state.data?.imageUrl as string) || userImage,
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
            setIsButtonDisabled(true);
            formRef.current?.submit();
          })}
          className="space-y-6"
          action={formAction}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3 gap-4 items-center">
                <FormLabel className="text-sm font-medium text-gray-700">
                  プロフィール画像
                </FormLabel>
                <div className="col-span-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      {field.value ? (
                        <Image
                          src={field.value}
                          alt={userName}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <AvatarFallback>{userName[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          type="hidden"
                          name="imageBase64"
                          value={field.value !== userImage ? field.value : ""}
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="imageUpload"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const base64 = await convertFileToBase64(file);
                              field.onChange(base64);
                              form.setValue("imageBase64", base64);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            document.getElementById("imageUpload")?.click();
                          }}
                        >
                          画像を選択
                        </Button>
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
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
                    <Input type="month" {...field} />
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
            <Button type="submit" disabled={isButtonDisabled}>
              送信
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
