import type { Message } from "ably";
import { useChannel } from "ably/react";
import type React from "react";
import { useState } from "react";
import { MessageArea } from "./Message";

export default function ChatBox({ userId }: { userId: string }) {
  const [messageText, setMessageText] = useState<string>("");
  const [receivedMessages, setMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel } = useChannel("HighCareerTalk", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  // これはこのまま使える
  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    // ここにサーバーアクションを実装する。
    setMessageText("");
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey) &&
      !messageTextIsEmpty
    ) {
      sendChatMessage(messageText);
      event.preventDefault();
    }
  };

  const messages = receivedMessages.map((message: Message) => {
    return <MessageArea key={message.id} message={message} userId={userId} />;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-110px)]">
      <div className="flex-1 overflow-y-auto px-4 space-y-4">{messages}</div>
      <form onSubmit={handleFormSubmission} className="border-t bg-white p-4">
        <div className="flex gap-2">
          <textarea
            value={messageText}
            placeholder="メッセージを入力...（Command + Enter または Ctrl + Enter で送信）"
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            type="submit"
            disabled={messageTextIsEmpty}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
