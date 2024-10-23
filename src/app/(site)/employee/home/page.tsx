import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }

  const employee = await prisma.employee.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
    },
  });
  return (
    <div>
      {employee ? "現場社員が作成されました！" : "失敗"}
      <p>名前: {employee?.user.name}</p>
      <Image
        src={employee?.user.image ?? ""}
        alt="プロフィール画像"
        width={100}
        height={100}
      />
      <p>企業コード: {employee?.companyId}</p>
      <p>職種: {employee?.occupationId}</p>
      <p>性別: {employee?.gender}</p>
      <p>入社日: {employee?.joiningDate.toLocaleDateString() ?? "未入力"}</p>
      <p>勤務場所: {employee?.workLocationId ?? "未入力"}</p>
      <p>入社方法: {employee?.hiringType ?? "未入力"}</p>
      <p>会議方法: {employee?.meetingMethod ?? "未入力"}</p>
      <p>自己紹介: {employee?.selfIntroduction ?? "未入力"}</p>
      <p>話せるトピック: {employee?.talkableTopics ?? "未入力"}</p>
    </div>
  );
}
