"use client";
import { Button } from "@/app/_components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitCreateApplicantProfileButton() {
	const status = useFormStatus();
	return (
		<Button type="submit" disabled={status.pending}>
			送信
		</Button>
	);
}
