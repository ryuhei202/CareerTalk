import beigeCloud from "@/assets/images/beige-cloud.svg";
import BakerImage from "@/assets/images/homepage-baker.svg";
import humans from "@/assets/images/homepage-humans.svg";
import monitorPeople from "@/assets/images/homepage-monitor-people.svg";
import topImage from "@/assets/images/homepage-top-image.svg";
import logo from "@/assets/images/logo.svg"
import { getApplicantUserId, getEmployeeUserId } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RoundedPillButton } from "../_components/ui/RoundedPillButton";



export default async function HomePage() {

	// すでにログインユーザーがいたら各メインページにリダイレクト
	const [applicantUserId, employeeUserId] = await Promise.all([
		getApplicantUserId(),
		getEmployeeUserId(),
	]);
	if (applicantUserId) {
		redirect("/applicant/search_employees");
	}
	if (employeeUserId) {
		redirect("/employee/matches");
	}
	return (
		<main>
			<div className="bg-muted">
				<div className="container m-auto flex flex-col p-8">
					<div className="container flex justify-center items-center sm:flex-col relative">
						<div className="w-full relative z-10 pr-0 md:pr-[30%]">
							<h2 className="text-4xl text-center font-bold mb-8">
								<Image src={logo} alt="logo" />
							</h2>
							<div className="text-2xl lg:text-4xl text-primary font-bold mb-4 leading-snug">
								エージェントに頼らない<br />新しい転職のカタチ。
							</div>
							<p className="text-accent leading-9 mb-4">
								転職したい人と現場社員を結ぶ。<br />
								現場社員の「生の声」をリアルに届ける。<br />
								転職活動に悩む人の背中を押す、<br />
								全く新しい転職サービス。
							</p>
							<Link href="/signin?is_employee=false">
								<RoundedPillButton childClassName="py-6 md:text-xl" className="w-[300px] md:w-[400px] my-3">
									ログインして現場社員を探す
								</RoundedPillButton>
							</Link>
							<Link href="/signin?is_employee=true">
								<RoundedPillButton variant="white" childClassName="py-6 md:text-xl" className="w-[300px] md:w-[400px] my-3">
									現場社員としてログインする方はこちら
								</RoundedPillButton>
							</Link>
						</div>
						<div className="flex justify-center absolute pl-[40%] h-full opacity-70 lg:opacity-100">
							<div className="h-full">
								<Image src={topImage} alt="airplanePeople" className="h-full" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="container m-auto my-32">
				<h2 className="text-accent font-bold text-sm md:text-lg lg:text-2xl flex flex-col  text-center">
					<span>“一人一人が納得のいくキャリアを歩める世界を作りたい”</span>
					<span>そんな想いからハイキャリトークは生まれました。</span>
				</h2>
				<div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="col-span-1 flex flex-col justify-end items-center md:items-end">
						<div className="w-fit relative">
							<div className="absolute inset-0 -z-10">
								<Image src={beigeCloud} alt="beigeCloud" />
							</div>
							<h3 className="text-primary text-2xl md:text-3xl lg:text-5xl leading-tight font-bold">自分で話したい社員を<br />選んでいる絵</h3>
							<div className="ml-7 md:ml-0 mt-4 leading-relaxed flex flex-col text-accent">
								<span>転職したい人と現場社員を結ぶ。</span>
								<span>現場社員の「生の声」をリアルに届ける。</span>
								<span>転職活動に悩む人の背中を押す、</span>
								<span>全く新しい転職サービス。</span>
								<span>これこれこんなところが良くて、</span>
								<span>あなたにこんな転職体験をお届けします。</span>
								<span>そんな感じのサービス説明が入ります。</span>
							</div>
						</div>
					</div>
					<div className="col-span-1 flex flex-col items-center md:items-start">
						<div className="">
							<Image src={monitorPeople} alt="monitor-people" className="w-full" />
							<Link href="/signin?is_employee=false">
								<RoundedPillButton className="mt-4 text-xl w-full" childClassName="" >ログインして現場社員を探す</RoundedPillButton>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="container m-auto my-32">
				<div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="order-2 md:order-1 col-span-1 flex flex-col items-center md:items-start">
						<div className="">
							<Image src={humans} alt="monitor-people" className="w-full" />
							<Link href="/signin?is_employee=false">
								<RoundedPillButton className="mt-4 text-xl w-full" childClassName="px-18 md:px-32" >ログインして現場社員を探す</RoundedPillButton>
							</Link>
						</div>
					</div>
					<div className="order-1 md:order-2 col-span-1 flex flex-col justify-end items-center md:items-start">
						<div className="w-fit relative">
							<div className="absolute inset-0 -z-10">
								<Image src={beigeCloud} alt="beigeCloud" />
							</div>
							<h3 className="text-primary text-2xl md:text-3xl lg:text-5xl leading-tight font-bold">選んだ現場社員と<br />直接喋っている絵</h3>
							<div className="ml-7 mt-4 leading-relaxed flex flex-col text-accent">
								<span>転職したい人と現場社員を結ぶ。</span>
								<span>現場社員の「生の声」をリアルに届ける。</span>
								<span>転職活動に悩む人の背中を押す、</span>
								<span>全く新しい転職サービス。</span>
								<span>これこれこんなところが良くて、</span>
								<span>あなたにこんな転職体験をお届けします。</span>
								<span>そんな感じのサービス説明が入ります。</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative overflow-hidden">
				<div className="bg-primary h-full w-full absolute -z-10">
					<Image src={BakerImage} alt="BakerImage" className="w-full h-full object-cover" />
				</div>
				<div className="flex flex-col justify-center py-28">
					<h2 className="text-white text-center md:text-3xl lg:text-4xl font-bold">ハイキャリトークで転職への一歩を踏み出しませんか？</h2>
					<div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4">
						<Link href="/signin?is_employee=false">
							<RoundedPillButton childClassName="py-3 md:py-7 text-lg lg:text-xl" className="border-2 p-1 md:p-2 border-white w-[400px] md:w-[350px] lg:w-[500px]">ログインして現場社員を探す</RoundedPillButton>
						</Link>
						<Link href="/signin?is_employee=true">
							<RoundedPillButton variant="white" childClassName="py-3 md:py-7 text-lg lg:text-xl" className="p-1 md:p-2 w-[400px] md:w-[350px] lg:w-[500px]">現場社員としてログインする方はこちら</RoundedPillButton>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
