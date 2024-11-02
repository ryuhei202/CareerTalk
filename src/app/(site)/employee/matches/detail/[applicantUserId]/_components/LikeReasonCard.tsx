import { Card } from "@/app/_components/ui/card";
import { HeartIcon, MessageCircle } from "lucide-react";

export default function LikeReasonCard({
  reason,
  message,
}: {
  reason: string;
  message?: string;
}) {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-pink-50 border-pink-200">
        <div className="flex items-center gap-2 mb-2">
          <HeartIcon className="h-5 w-5 text-pink-500" />
          <h3 className="font-bold text-gray-800">興味を持った理由</h3>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{reason}</p>
      </Card>

      {message && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <h3 className="font-bold text-gray-800">
              メッセージが届いています
            </h3>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{message}</p>
        </Card>
      )}
    </div>
  );
}
