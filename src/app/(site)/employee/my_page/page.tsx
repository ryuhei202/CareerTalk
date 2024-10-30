import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MyPage() {
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
    <>
      mypage
    </>
  );
}
