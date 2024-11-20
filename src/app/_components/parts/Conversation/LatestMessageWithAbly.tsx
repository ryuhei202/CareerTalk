"use client";

import { client } from "@/lib/ably";
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LatestMessage({
  conversationId,
  lastMessage,
  hasUnreadMessage,
  partnerUserId,
}: {
  conversationId: string;
  lastMessage: string | undefined;
  hasUnreadMessage: boolean;
  partnerUserId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // 未読があったら初期値を"未読"にする
  // さらに、lastMessageがない場合も"未読"にする
  const markText = !lastMessage ? "！" : hasUnreadMessage ? "未読" : undefined;
  const [isRead, setIsRead] = useState<string | undefined>(markText);
  const [relativeLatestMessage, setRelativeLatestMessage] = useState<
    string | undefined
  >(lastMessage);

  useChannel(`chat:${conversationId}`, (message) => {
    if (pathname.includes(partnerUserId)) {
      setIsRead(undefined);
    } else {
      setIsRead("未読");
    }
    setRelativeLatestMessage(message.data);
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    router.refresh();
    setIsRead(markText);
  }, [router, pathname, markText]);

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-sm text-gray-600 truncate flex-1">
        {relativeLatestMessage ?? "マッチング成立！メッセージはまだありません"}
      </p>
      {isRead && (
        <span className="inline-flex flex-shrink-0 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
          {isRead}
        </span>
      )}
    </div>
  );
}

export default function LatestMessageWithAbly({
  conversationId,
  lastMessage,
  hasUnreadMessage,
  partnerUserId,
}: {
  conversationId: string;
  lastMessage: string | undefined;
  hasUnreadMessage: boolean;
  partnerUserId: string;
}) {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`chat:${conversationId}`}>
        <LatestMessage
          conversationId={conversationId}
          lastMessage={lastMessage}
          hasUnreadMessage={hasUnreadMessage}
          partnerUserId={partnerUserId}
        />
      </ChannelProvider>
    </AblyProvider>
  );
}
