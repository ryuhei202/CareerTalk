import type { GetConversationsUseCaseResponse } from "@/usecase/getConversations/getConversationUseCase";
import Image from "next/image";
import Link from "next/link";
import LatestMessageWithAbly from "./LatestMessageWithAbly";
export default function ConversationList({
  conversations,
  isApplicant,
}: {
  conversations: GetConversationsUseCaseResponse;
  isApplicant: boolean;
}) {
  console.log("lastMessageAt", conversations[0].lastMessageAt);

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto border-r w-1/3">
      <div className="divide-y border-b mx-auto">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/${isApplicant ? "applicant" : "employee"}/chat/${
              conversation.PartnerUserId
            }`}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-12 h-12">
              <Image
                src={conversation.PartnerImageURL}
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="font-medium truncate">
                  {conversation.PartnerName}
                </p>
                <div className="flex flex-col items-end">
                  <time className="text-sm text-gray-500 flex-shrink-0">
                    {new Date(conversation.lastMessageAt).toLocaleString(
                      "ja-JP",
                      {
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </time>
                </div>
              </div>
              <LatestMessageWithAbly
                conversationId={conversation.id}
                lastMessage={
                  conversation.lastMessage ??
                  "マッチング成立！メッセージはまだありません"
                }
                hasUnreadMessage={conversation.hasUnreadMessage}
                partnerUserId={conversation.PartnerUserId}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
