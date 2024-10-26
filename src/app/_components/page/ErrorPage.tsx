import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ErrorPage({
  message,
  data,
}: {
  message: string;
  data: unknown;
}) {
  console.error({ message, data });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            エラーが発生しました。 システム管理者にお知らせください。
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              ホームに戻る
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
