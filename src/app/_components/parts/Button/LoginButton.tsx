"use client";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
	const router = useRouter();
	return (
		<Button
			variant="outline"
			className="border-purple-600 text-purple-600 hover:bg-purple-50"
			onClick={() => router.push("/signin")}
		>
			ログイン
		</Button>
	);
};
