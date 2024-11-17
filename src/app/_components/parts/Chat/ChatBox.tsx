import { changeMessageIsReadAction } from "@/app/_actions/changeMessageIsReadAction";
import { createConversationMessageAction } from "@/app/_actions/createConversationMessageAction";
import { createId } from "@/lib/cuid";
import type { ConversationMessage } from "@/usecase/getConversationMessages/getConversationMessagesUseCase";
import type { Message } from "ably";
import { useChannel } from "ably/react";
import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MessageArea } from "./Message";

type CustomMessage = Message & { createdAt?: Date; isRead?: boolean };

export default function ChatBox({
  userId,
  messages,
  conversationId,
  partnerUserId,
  isApplicant,
}: {
  userId: string;
  messages: ConversationMessage[];
  conversationId: string;
  partnerUserId: string;
  isApplicant: boolean;
}) {
  const initialMessages: CustomMessage[] = messages.map((message) => ({
    id: message.id,
    clientId: message.senderId,
    data: message.content,
    isRead: message.isRead,
    createdAt: message.createdAt,
  }));
  let messageEnd: HTMLDivElement | null = null;
  const [messageText, setMessageText] = useState<string>("");
  const [messageError, setMessageError] = useState<string | null>(null);

  const [allMessages, setAllMessages] = useState<CustomMessage[]>([
    ...initialMessages,
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { channel } = useChannel(`chat:${conversationId}`, (message) => {
    if (message.clientId !== userId) {
      setAllMessages([...allMessages, message]);
    }
  });

  const sendChatMessage = async (messageText: string) => {
    if (!validateMessageLength(messageText)) {
      alert(messageError);
      return;
    }

    const messageId = createId();
    channel.publish({ name: `chat:${conversationId}`, data: messageText });
    setAllMessages([
      ...allMessages,
      {
        id: messageId,
        clientId: userId,
        data: messageText,
        isRead: false,
        createdAt: new Date(),
      },
    ]);
    setMessageText("");
    await createConversationMessageAction({
      conversationId,
      messageId,
      partnerUserId,
      content: messageText,
      isApplicant,
    });
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey) &&
      !isButtonDisabled
    ) {
      sendChatMessage(messageText);
      event.preventDefault();
    }
  };

  const validateMessageLength = (text: string) => {
    if (text.length > 1000) {
      setMessageError("1000文字以内で入力してください");
      setIsButtonDisabled(true);
      return false;
    }
    setIsButtonDisabled(text.length === 0);
    setMessageError(null);
    return true;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setMessageText(newText);
    validateMessageLength(newText);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (messageEnd) {
      messageEnd.scrollIntoView({ behavior: "instant" });
    }
  }, [messageEnd, allMessages]);

  useEffect(() => {
    // 未読メッセージを既読にする
    const unreadMessages = allMessages.filter(
      (message) => message.clientId !== userId && !message.isRead
    );
    if (unreadMessages.length > 0) {
      changeMessageIsReadAction(conversationId, isApplicant, partnerUserId);
    }
  }, [allMessages, userId, conversationId, isApplicant, partnerUserId]);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        <div className="text-center py-4">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            <span className="text-sm font-medium">🎉 マッチング成功！</span>
          </div>
        </div>
        {allMessages.map((message: CustomMessage) => {
          return (
            <MessageArea key={message.id} message={message} userId={userId} />
          );
        })}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        />
      </div>
      <form onSubmit={handleFormSubmission} className="border-t bg-white p-4">
        <div className="flex gap-2">
          <textarea
            value={messageText}
            placeholder="メッセージを入力...（Command + Enter または Ctrl + Enter で送信）"
            onChange={handleMessageChange}
            onKeyDown={handleKeyPress}
            className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 [field-sizing:content] max-h-[240px]"
            rows={1}
          />
          {messageError && (
            <span className="text-sm text-red-500">{messageError}</span>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
