import SiteHeader from "@/app/_components/parts/SiteHeader";
import DMIcon from "@/assets/images/dmicon.jpeg";
import EventIcon from "@/assets/images/event.jpeg";
import searchEmployeeIcon from "@/assets/images/serch_employee.jpeg";

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
          icon: searchEmployeeIcon,
          label: "転職希望者一覧",
        }}
        secondItem={{
          href: "/employee/chat",
          icon: DMIcon,
          label: "DM",
        }}
        thirdItem={{
          href: "/employee/events",
          icon: EventIcon,
          label: "イベント",
        }}
      />

      {modal}
      {children}
    </>
  );
}
