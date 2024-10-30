import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ApplicantsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  console.log("session", session);

  const conversations = await prisma.conversation.findMany({
    where: {
      employeeUserId: session.user.id,
      status: "PENDING",
    },
  });
  console.log("conversations", conversations);
  return (
    <div>
      <h1>転職希望者</h1>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>{conversation.id}</li>
        ))}
      </ul>
    </div>
  );
}
