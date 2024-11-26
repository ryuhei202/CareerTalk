import { SignInCardSwitcher } from "./_components/SignInSwitcher";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { is_employee: string | undefined };
}) {
  const isEmployee = searchParams.is_employee
    ? searchParams.is_employee === "true"
    : undefined;
  return <SignInCardSwitcher isEmployee={isEmployee} />;
}
