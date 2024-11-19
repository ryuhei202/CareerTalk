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
        className={`max-w-[70%] flex flex-col ${
          isMe ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`relative px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-line
            ${isMe ? "bg-blue-600 text-white" : "bg-white text-gray-800"}
            ${
              isMe
                ? "before:content-[''] before:absolute before:top-[6px]"
                : "before:content-[''] before:absolute before:top-[2px]"
            }
            ${
              isMe ? "before:border-[10px]" : "before:border-[9px]"
            } before:border-solid
            ${
              isMe
                ? "before:-right-[9px] before:rotate-[80deg] before:border-y-transparent before:border-r-transparent before:border-l-blue-600"
                : "before:-left-[6px] before:rotate-[150deg] before:border-y-transparent before:border-l-transparent before:border-r-white"
            }
          `}
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
