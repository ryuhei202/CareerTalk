
import { SiteFooter } from "../_components/parts/SiteFooter";
import SiteHeader from "../_components/parts/SiteHeader";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SiteHeader
        type="homepage"
      />
      {children}
      <SiteFooter />
    </div>
  );
}
