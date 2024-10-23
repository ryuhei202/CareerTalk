"use client";
import { SocialLoginButton } from "@/app/_components/parts/Button/SocialLoginButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";
import { useState } from "react";

export default function SignInPage() {
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md py-8">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-2xl font-bold text-center">
            CareerTalk にログイン
          </CardTitle>
          <CardDescription className="text-center">
            {isEmployee
              ? "現場社員の方はこちらからログインしてください"
              : "転職希望者の方はこちらからログインしてください"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 flex flex-col items-center">
          <SocialLoginButton
            callbackUrl={
              isEmployee
                ? "/employee/create_profile"
                : "/applicant/create_profile"
            }
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-4">
          <div className="text-sm text-center">
            <button
              onClick={() => setIsEmployee(!isEmployee)}
              className="text-purple-600 hover:underline"
            >
              {isEmployee ? "転職希望者の方はこちら" : "現場社員の方はこちら"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
