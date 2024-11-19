import beigeCloud from "@/assets/images/beige-cloud.svg";
import BakerImage from "@/assets/images/homepage-baker.svg";
import humans from "@/assets/images/homepage-humans.svg";
import monitorPeople from "@/assets/images/homepage-monitor-people.svg";
import topImage from "@/assets/images/homepage-top-image.svg";
import { getApplicantUserId, getEmployeeUserId } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RoundedPillButton } from "../_components/parts/Button/RoundedPillButton";

export default async function HomePage() {
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
          <h2 className="text-4xl text-center font-bold mb-8">
            ハイキャリトーク（後でロゴ入れます）
          </h2>
          <div className="container flex justify-center items-center sm:flex-col relative">
            <div className="relative z-10 pr-[30%]">
              <h3 className="text-3xl lg:text-4xl text-secondary font-bold mb-4 leading-snug">
                エージェントに頼らない
                <br />
                新しい転職のカタチ。
              </h3>
              <p className="text-accent leading-9 mb-4">
                転職したい人と現場社員を結ぶ。
                <br />
                現場社員の「生の声」をリアルに届ける。
                <br />
                転職活動に悩む人の背中を押す、
                <br />
                全く新しい転職サービス。
              </p>
              <Link href="/signin">
                <RoundedPillButton
                  childClassName="py-6 text-xl"
                  className="w-full my-3"
                >
                  ログインして現場社員を探す
                </RoundedPillButton>
              </Link>
              <Link href="/signin">
                <RoundedPillButton
                  variant="white"
                  childClassName="py-6 text-xl"
                  className="w-full my-3"
                >
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
        <h2 className="text-accent font-bold text-4xl flex flex-col  text-center">
          <span>“一人一人が納得のいくキャリアを歩める世界を作りたい”</span>
          <span>そんな想いからハイキャリトークは生まれました。</span>
        </h2>
        <div className="mt-20 grid grid-cols-2 gap-4">
          <div className="col-span-1 flex flex-col justify-end items-end">
            <div className="w-fit relative">
              <div className="absolute inset-0 -z-10">
                <Image src={beigeCloud} alt="beigeCloud" />
              </div>
              <h3 className="text-secondary text-5xl leading-tight font-bold">
                自分で話したい社員を
                <br />
                選んでいる絵
              </h3>
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
          <div className="col-span-1 flex flex-col items-start">
            <div className="">
              <Image
                src={monitorPeople}
                alt="monitor-people"
                className="w-full"
              />
              <Link href="/signin">
                <RoundedPillButton
                  className="mt-4 py-6 text-xl w-full"
                  childClassName=""
                >
                  ログインして現場社員を探す
                </RoundedPillButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container m-auto my-32">
        <div className="mt-20 grid grid-cols-2  gap-4">
          <div className="col-span-1 flex flex-col items-end">
            <div className="">
              <Image src={humans} alt="monitor-people" className="w-full" />
              <Link href="/signin">
                <RoundedPillButton
                  className="mt-4 px-24 py-6 text-xl w-full"
                  childClassName="px-32"
                >
                  ログインして現場社員を探す
                </RoundedPillButton>
              </Link>
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-end items-start">
            <div className="w-fit relative">
              <div className="absolute inset-0 -z-10">
                <Image src={beigeCloud} alt="beigeCloud" />
              </div>
              <h3 className="text-secondary text-5xl leading-tight font-bold">
                選んだ現場社員と
                <br />
                直接喋っている絵
              </h3>
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
        <div className="bg-primary w-full absolute -z-10">
          <Image src={BakerImage} alt="BakerImage" className="w-full" />
        </div>
        <div className="flex flex-col justify-center py-28">
          <h2 className="text-white text-center text-5xl font-bold">
            ハイキャリトークで転職への一歩を踏み出しませんか？
          </h2>
          <div className="flex justify-center mt-8 gap-4">
            <Link href="/signin">
              <RoundedPillButton
                size="lg"
                childClassName="py-7 text-2xl"
                className="border-2 border-white w-[500px]"
              >
                ログインして現場社員を探す
              </RoundedPillButton>
            </Link>
            <Link href="/signin">
              <RoundedPillButton
                size="lg"
                variant="white"
                childClassName="py-7 text-2xl"
                className=" w-[500px]"
              >
                現場社員としてログインする方はこちら
              </RoundedPillButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
