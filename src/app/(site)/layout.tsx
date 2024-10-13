import { getServerSession } from "@/lib/auth";
import Header from "../_components/Layout/Header";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const isLogin = !!session?.user.id;
  return (
    <div>
      <Header isLogin={isLogin} />
      {children}
    </div>
  );
}
