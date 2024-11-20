import { Card } from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";
import { HeartIcon, MessageCircle } from "lucide-react";

export default function LikeReasonCard({
  reason,
  message,
  className
}: {
  reason: string;
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <Card className="p-4 bg-pink-50 border-pink-400">
        <div className="flex items-center gap-2 mb-2">
          <HeartIcon className="h-5 w-5 text-pink-400" />
          <h3 className="font-bold text-gray-800">興味を持った理由</h3>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{reason}</p>
      </Card>

      {message && (
        <Card className="p-4 bg-muted border-primary">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">
              メッセージが届いています
            </h3>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{message}</p>
        </Card>
      )}
    </div>
  );
}
