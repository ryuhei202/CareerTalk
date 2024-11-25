import { SignInCardSwitcher } from "./_components/SignInSwitcher";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { is_employee: string | undefined };
}) {
  return <SignInCardSwitcher searchParams={searchParams} />;
}
