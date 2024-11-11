import SiteHeader from "@/app/_components/parts/SiteHeader";
import DMIcon from "@/assets/images/dmicon.jpeg";
import EventIcon from "@/assets/images/event.jpeg";
import searchEmployeeIcon from "@/assets/images/serch_employee.jpeg";

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
          icon: searchEmployeeIcon,
          label: "社員検索",
        }}
        secondItem={{
          href: "/applicant/chat",
          icon: DMIcon,
          label: "DM",
        }}
        thirdItem={{
          href: "/applicant/events",
          icon: EventIcon,
          label: "イベント",
        }}
      />
      {modal}
      {children}
    </>
  );
}
