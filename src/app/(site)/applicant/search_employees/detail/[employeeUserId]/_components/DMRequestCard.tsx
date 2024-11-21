import DMResultCard from "@/app/_components/parts/DMRequestCard";
import { Modal } from "@/app/_components/parts/Modal";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Textarea } from "@/app/_components/ui/textarea";
import kamihikouki from "@/assets/images/kamihikouki.svg";
import { ConversationPurposeEnum } from "@/domain/core/Conversation/ConversationEnum";
import { ArrowLeft, LightbulbIcon } from "lucide-react";

const conversationPurposeOptions = [
  {
    id: ConversationPurposeEnum.INTERESTED_IN_RECRUITMENT,
    reason: "募集内容に興味がある",
  },
  {
    id: ConversationPurposeEnum.INTERESTED_IN_PERSON,
    reason: "募集している人に興味がある",
  },
  {
    id: ConversationPurposeEnum.INTERESTED_IN_COMPANY,
    reason: "募集している会社・部署に興味がある",
  },
  {
    id: ConversationPurposeEnum.OTHER,
    reason: "その他（他に話したい事がある）",
  },
];

export default function DMRequestCard({
  onClickBack,
  onClickBackToSearch,
  isSuccess,
  action,
}: {
  onClickBack: () => void;
  onClickBackToSearch: () => void;
  isSuccess: true | undefined;
  action: (payload: FormData) => void;
}) {
  return (
    <>
      {isSuccess ? (
        <Modal>
          <DMResultCard
            imageSrc={kamihikouki}
            title="リクエストを送信しました！"
            onClickBack={onClickBackToSearch}
          />
        </Modal>
      ) : (
        <Modal contentClassName="h-[90%] max-w-[60%]">
          <Card className="w-full mx-auto border-0 overflow-auto">
            <CardHeader className=" text-white p-3 top-0 z-10">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="border-0 shadow-none"
                  onClick={onClickBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="">戻る</span>
                </Button>
              </div>
              <h2 className="text-xl text-primary font-bold text-center pt-12">
                この社員へDMをリクエストしますか？
              </h2>
            </CardHeader>
            <form action={action}>
              <CardContent className="py-4 px-20">
                <div className="space-y-6 mt-6">
                  <div className="space-y-3">
                    <h3 className="text-foreground border-b border-gray-200 pb-1">
                      この社員と話したいと思ったきっかけを教えてください。
                      <span className="text-sm">（複数選択可）</span>
                    </h3>
                    <RadioGroup
                      name="conversationPurpose"
                      className="space-y-2"
                      required
                    >
                      {conversationPurposeOptions.map((option) => (
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
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center space-x-2 -translate-x-2">
                      <LightbulbIcon className="w-8 h-8 text-gray-600" />
                      <h3 className="">
                        DMリクエストにメッセージを添えてみましょう。
                      </h3>
                      <Badge variant="destructive" className="rounded-full">必須</Badge>
                    </div>
                    <Textarea
                      name="message"
                      placeholder="気になった点や詳しく話を聞きたい点など、簡単なメッセージを送ることでトークをスムーズに進めることができます。"
                      className="py-4 px-3 text-sm border border-gray-600 bg-background-accent [field-sizing:content]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="mt-6 w-full flex justify-center items-center">
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-accent hover:bg-white text-white hover:text-accent"
                  >
                    DMリクエストを送信する
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </Modal>
      )}
    </>
  );
}
