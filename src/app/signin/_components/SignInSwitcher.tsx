"use client";
import { SocialLoginButton } from "@/app/_components/parts/Button/SocialLoginButton";
import { RoundedPillButton } from "@/app/_components/ui/RoundedPillButton";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useRouter } from "next/navigation";

export const SignInCardSwitcher = ({
  isEmployee,
}: {
  isEmployee: boolean | undefined;
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      {isEmployee == null ? (
        <Card className="w-full max-w-md py-8">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl font-bold text-center">
              どちらの利用者ですか？
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-col items-center">
            <RoundedPillButton
              className="w-full"
              onClick={() => {
                router.push("/signin?is_employee=false");
              }}
            >
              転職希望者
            </RoundedPillButton>
            <RoundedPillButton
              variant={"white"}
              className="shadow-lg w-full"
              onClick={() => {
                router.push("/signin?is_employee=true");
              }}
            >
              現場社員
            </RoundedPillButton>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md py-8">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl font-bold text-center">
              ハイキャリトークにログイン
            </CardTitle>
            <CardDescription className="text-center">
              {isEmployee ? "現場社員の方" : "転職希望者の方"}
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
              <Button
                onClick={() => router.push("/signin")}
                variant={"outline"}
              >
                利用タイプを変更する
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
