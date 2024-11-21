"use client";

import { Button } from "@/app/_components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogOutButton = () => {
	return (
		<Button
			variant="destructive"
			onClick={() => {
				signOut({ callbackUrl: "/" });
			}}
		>
			<LogOut className="h-5 w-5 mr-1" />
			ログアウト
		</Button>
	);
};
