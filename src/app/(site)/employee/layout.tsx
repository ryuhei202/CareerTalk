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
        firstItem={{
          href: "/employee/applicants",
          icon: <Search />,
          label: "転職希望者",
        }}
        secondItem={{
          href: "/employee/dm",
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
