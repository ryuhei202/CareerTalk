import ErrorPage from "@/app/_components/page/ErrorPage";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Textarea } from "@/app/_components/ui/textarea";
import kamihikouki from "@/assets/images/kamihikouki.svg";
import type { ConversationPurpose } from "@prisma/client";
import { ArrowLeft, LightbulbIcon } from "lucide-react";
import Image from "next/image";
import type { FormState } from "./EmployeeCardContainer";

export default function DMRequestCard({
  onClickBack,
  options,
  state,
  action,
}: {
  onClickBack: () => void;
  options: ConversationPurpose[];
  state: FormState;
  action: (payload: FormData) => void;
}) {
  if (state.success === false) {
    return <ErrorPage message={state.message} data={state.data} />;
  }
  return (
    <>
      {state.success ? (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="pb-0">
            <Button
              variant="ghost"
              className="flex items-center text-muted-foreground w-fit -ml-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              検索画面へ戻る
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-12 pb-16">
            <h2 className="text-xl text-primary mb-12">
              リクエストを送信しました！
            </h2>
            <div className="relative">
              <Image
                src={kamihikouki}
                alt="送信完了"
                width={120}
                height={120}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md mx-auto h-[calc(100vh-80px)] overflow-y-auto my-4">
          <CardHeader className="bg-blue-500 text-white p-3 sticky top-0 z-10">
            <h2 className="text-sm font-medium">
              この社員へDMをリクエストしますか？
            </h2>
          </CardHeader>
          <form action={action}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-white hover:bg-blue-600 p-1"
                  onClick={onClickBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">戻る</span>
                </Button>
              </div>

              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold border-b border-gray-200 pb-1">
                    この社員と話したいと思ったきっかけを教えてください
                  </h3>
                  <RadioGroup
                    name="conversationPurposeId"
                    className="space-y-2"
                    required
                  >
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.id.toString()}
                          id={`option-${option.id}`}
                        />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="text-sm text-gray-600"
                        >
                          {option.reason}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <LightbulbIcon className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold border-b border-gray-200 pb-1">
                      DMリクエストにメッセージを添えてみませんか？
                    </h3>
                  </div>
                  <Textarea
                    name="message"
                    placeholder="気になった点や詳しく話を聞きたい点など、簡単なメッセージを送ることでトークをスムーズに進めることができます。"
                    className="h-24 text-sm"
                  />
                </div>
              </div>
            </CardContent>
            <div className="sticky bottom-0 bg-white p-4 border-t">
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 text-sm font-medium"
              >
                送信する
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
