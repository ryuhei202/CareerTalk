import SiteHeader from "@/app/_components/parts/SiteHeader";
import { Calendar, MessageCircle, Search } from "lucide-react";

export default function ApplicantLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader
        type="applicant"
        firstItem={{
          href: "/applicant/search_employees",
          icon: <Search />,
          label: "社員検索",
        }}
        secondItem={{
          href: "/applicant/chat",
          icon: <MessageCircle />,
          label: "DM",
        }}
        thirdItem={{
          href: "/applicant/events",
          icon: <Calendar />,
          label: "イベント",
        }}
      />
      {modal}
      {children}
    </>
  );
}
