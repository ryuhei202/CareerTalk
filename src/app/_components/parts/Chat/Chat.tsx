"use client";

import { client } from "@/lib/ably";
import type {
  ConversationMessage,
  PartnerUser,
} from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ChatBox from "./ChatBox";
import { ChatHeader } from "./ChatHeader";

export default function Chat({
  userId,
  messages,
  conversationId,
  partnerUser,
  isApplicant,
}: {
  userId: string;
  messages: ConversationMessage[];
  conversationId: string;
  partnerUser: PartnerUser;
  isApplicant: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`chat:${conversationId}`}>
        <div className="flex flex-col h-full">
          <ChatHeader
            partnerName={partnerUser.name}
            partnerImageUrl={partnerUser.image}
            isApplicant={isApplicant}
          />
          <ChatBox
            userId={userId}
            messages={messages}
            conversationId={conversationId}
            partnerUserId={partnerUser.id}
            isApplicant={isApplicant}
          />
        </div>
      </ChannelProvider>
    </AblyProvider>
  );
}
