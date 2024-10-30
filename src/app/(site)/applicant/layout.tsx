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
        firstItem={{
          href: "/applicant/search_employees",
          icon: <Search />,
          label: "社員検索",
        }}
        secondItem={{ href: "/dm", icon: <MessageCircle />, label: "DM" }}
        thirdItem={{ href: "/events", icon: <Calendar />, label: "イベント" }}
      />
      {modal}
      {children}
    </>
  );
}
