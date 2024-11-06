import type { GetConversationsUseCaseResponse } from "@/usecase/getConversations/getConversationUseCase";
import Image from "next/image";
import Link from "next/link";

export default function ConversationList({
  conversations,
}: {
  conversations: GetConversationsUseCaseResponse;
}) {
  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto w-1/3">
      <div className="divide-y border mx-auto">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/applicant/chat/${conversation.id}`}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-12 h-12">
              <Image
                src={conversation.PartnerImageURL}
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover"
              />
              {conversation.unreadMessageCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {conversation.unreadMessageCount}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="font-medium truncate">
                  {conversation.PartnerName}
                </p>
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
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage ||
                  "マッチング成立！メッセージはまだありません"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
