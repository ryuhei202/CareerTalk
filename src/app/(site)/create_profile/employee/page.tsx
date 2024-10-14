import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CreateProfileEmployee() {
  const session = await getServerSession();
  const userId = session?.user.id;

  if (userId) {
    const employee = await prisma.employee.findUnique({
      where: { userId: userId },
    });

    if (!employee) {
      await prisma.employee.create({
        data: { userId: userId },
      });
    }
  }

  return <div>employee create_profile</div>;
}
