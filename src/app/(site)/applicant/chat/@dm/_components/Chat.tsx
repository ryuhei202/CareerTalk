"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";

export default function Chat({ applicantUserId }: { applicantUserId: string }) {
  const client = new Ably.Realtime({ authUrl: "/api/ably" });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="HighCareerTalk">
        <ChatBox applicantUserId={applicantUserId} />
      </ChannelProvider>
    </AblyProvider>
  );
}