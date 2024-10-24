import { Button } from "@/app/_components/ui/button";
import { Calendar, MessageCircle, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { LogOutButton } from "../_components/parts/Button/LogOutButton";
import CareerTalkLogo from "../_components/parts/Logo/CareerTalkLogo";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-4">
					<nav className="flex justify-between items-center">
						<CareerTalkLogo />
						<ul className="hidden md:flex space-x-6 items-center">
							<li>
								<Link
									href="/"
									className="text-gray-600 hover:text-purple-600 flex items-center"
								>
									<MessageCircle className="h-5 w-5 mr-1" />
									ホーム
								</Link>
							</li>
							<li>
								<Link
									href="/employees"
									className="text-gray-600 hover:text-purple-600 flex items-center"
								>
									<Users className="h-5 w-5 mr-1" />
									現場社員一覧
								</Link>
							</li>
							<li>
								<Link
									href="/messages"
									className="text-gray-600 hover:text-purple-600 flex items-center"
								>
									<MessageSquare className="h-5 w-5 mr-1" />
									DM
								</Link>
							</li>
							<li>
								<Link
									href="/events"
									className="text-gray-600 hover:text-purple-600 flex items-center"
								>
									<Calendar className="h-5 w-5 mr-1" />
									イベント
								</Link>
							</li>
							<li>
								<LogOutButton />
							</li>
						</ul>
						<Button className="md:hidden" variant="ghost">
							メニュー
						</Button>
					</nav>
				</div>
			</header>
			{children}
		</>
	);
}
