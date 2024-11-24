"use client";
import { SocialLoginButton } from "@/app/_components/parts/Button/SocialLoginButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { RoundedPillButton } from "../_components/ui/RoundedPillButton";
import { Button } from "../_components/ui/button";

export default function SignInPage() {
	const searchParams = useSearchParams()
	const [isEmployee, setIsEmployee] = useState<boolean>(() => {
		if (searchParams.get("is_employee") === "true") {
			return true;
		}
		return false;
	});
	const [isSelectedUserType, setIsSelectedUserType] = useState<boolean>(() => {
		if (searchParams.get("is_employee") === "true" || searchParams.get("is_employee") === "false") {
			return true;
		}
		return false;

	});
	return (
		<div className="min-h-screen bg-muted flex items-center justify-center p-4">
			{isSelectedUserType ? (
				<Card className="w-full max-w-md py-8">
					<CardHeader className="space-y-1 pb-8">
						<CardTitle className="text-2xl font-bold text-center">
							ハイキャリトークにログイン
						</CardTitle>
						<CardDescription className="text-center">
							{isEmployee
								? "現場社員の方"
								: "転職希望者の方"}
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
								onClick={() => setIsSelectedUserType(false)}
								variant={"outline"}
							>
								利用タイプを変更する
							</Button>
						</div>
					</CardFooter>
				</Card>
			) : (
				<Card className="w-full max-w-md py-8">
					<CardHeader className="space-y-1 pb-8">
						<CardTitle className="text-2xl font-bold text-center">
							どちらの利用者ですか？
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-8 flex flex-col items-center">
						<RoundedPillButton className="w-full" onClick={() => {
							setIsSelectedUserType(true)
							setIsEmployee(false)
						}}>転職希望者</RoundedPillButton>
						<RoundedPillButton variant={"white"} className="shadow-lg w-full" onClick={() => {
							setIsSelectedUserType(true)
							setIsEmployee(true)
						}}>現場社員</RoundedPillButton>
					</CardContent>
				</Card>

			)}
		</div>
	);
}
