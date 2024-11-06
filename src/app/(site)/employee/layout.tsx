import SiteHeader from "@/app/_components/parts/SiteHeader";
import { Calendar, MessageCircle, Search } from "lucide-react";

export default function EmployeeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader
        type="employee"
        firstItem={{
          href: "/employee/matches",
          icon: <Search />,
          label: "転職希望者一覧",
        }}
        secondItem={{
          href: "/employee/chat",
          icon: <MessageCircle />,
          label: "DM",
        }}
        thirdItem={{
          href: "/employee/events",
          icon: <Calendar />,
          label: "イベント",
        }}
      />

      {modal}
      {children}
    </>
  );
}
