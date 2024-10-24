import { getServerSession } from "@/lib/auth";
import { LoginButton } from "../_components/parts/Button/LoginButton";
import CareerTalkLogo from "../_components/parts/Logo/CareerTalkLogo";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();
	console.log(session?.user);
	return (
		<div>
			<header className="container mx-auto px-4 py-6 flex justify-between items-center">
				<CareerTalkLogo />
				<nav>
					<ul className="flex space-x-4 items-center">
						<li>
							<a href="/" className="text-gray-600 hover:text-purple-600">
								ホーム
							</a>
						</li>
						<li>
							<a href="/" className="text-gray-600 hover:text-purple-600">
								サービス
							</a>
						</li>
						<li>
							<a href="/" className="text-gray-600 hover:text-purple-600">
								料金
							</a>
						</li>
						<li>
							<a href="/" className="text-gray-600 hover:text-purple-600">
								お問い合わせ
							</a>
						</li>
						<li>
							<LoginButton />
						</li>
					</ul>
				</nav>
			</header>
			{children}
		</div>
	);
}
