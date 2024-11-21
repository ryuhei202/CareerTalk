"use client";

import { usePathname } from "next/navigation";

export default function ChatLayout({
  children,
  conversations,
  dm,
}: Readonly<{
  children: React.ReactNode;
  conversations: React.ReactNode;
  dm: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="px-8">
      {children}
      <div className="flex py-4">
        {!pathname.includes("/detail") && conversations}
        {!pathname.includes("/detail") && dm}
      </div>
    </div>
  );
}
