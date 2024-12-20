import type { Message } from "ably";

type MessageProps = {
  message: Message & { createdAt?: Date };
  userId: string;
};

export const MessageArea = ({ message, userId }: MessageProps) => {
  const isMe = message.clientId === userId;
  return (
    <div
      className={`flex w-full mb-4 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-4 py-2 rounded-2xl break-words whitespace-pre-line
            ${isMe
              ? "bg-primary text-white rounded-br-lg"
              : "bg-white text-foreground rounded-bl-lg"
            }`
          }
        >
          {message.data}
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(
            message.timestamp || message.createdAt || Date.now()
          ).toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
