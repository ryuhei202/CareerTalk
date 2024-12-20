"use client";

import { client } from "@/lib/ably";
import type {
  ConversationMessage,
  PartnerUser,
} from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import { AblyProvider, ChannelProvider } from "ably/react";
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
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`chat:${conversationId}`}>
        <div className="flex flex-col h-full">
          <ChatHeader
            partnerUserId={partnerUser.id}
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
