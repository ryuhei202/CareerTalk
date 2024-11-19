"use client";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

export const LoginButton = ({ className }: { className?: string }) => {
	const router = useRouter();
	return (
		<Button
			variant="default"
			className={className}
			onClick={() => router.push("/signin")}
		>
			ログイン
		</Button>
	);
};
