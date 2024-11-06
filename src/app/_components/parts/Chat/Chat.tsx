"use client";

import type { ConversationMessage } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";

export default function Chat({
  userId,
  messages,
}: {
  userId: string;
  messages: ConversationMessage[];
}) {
  const client = new Ably.Realtime({ authUrl: "/api/ably" });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="HighCareerTalk">
        <ChatBox userId={userId} messages={messages} />
      </ChannelProvider>
    </AblyProvider>
  );
}
