import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { SocialLoginButton } from "../Button/SocialLoginButton";

export default function LoginCard({
	description,
	anotherEntry,
	onClick,
	callbackUrl,
}: {
	description: string;
	anotherEntry: string;
	onClick: () => void;
	callbackUrl: string;
}) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md py-8">
				<CardHeader className="space-y-1 pb-8">
					<CardTitle className="text-2xl font-bold text-center">
						CareerTalk にログイン
					</CardTitle>
					<CardDescription className="text-center">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8 flex flex-col items-center">
					<SocialLoginButton callbackUrl={callbackUrl} />
				</CardContent>
				<CardFooter className="flex flex-col space-y-2 pt-4">
					<div className="text-sm text-center">
						<button
							type="button"
							onClick={onClick}
							className="text-purple-600 hover:underline"
						>
							{anotherEntry}
						</button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
