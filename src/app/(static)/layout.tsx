import { getServerSession } from "@/lib/auth";
import Header from "../_components/parts/Layout/Header";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log(session?.user);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
