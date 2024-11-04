export default function ChatLayout({
  children,
  conversations,
  dm,
}: Readonly<{
  children: React.ReactNode;
  conversations: React.ReactNode;
  dm: React.ReactNode;
}>) {
  return (
    <div className="px-8">
      {children}
      <div className="flex gap-4 py-4">
        {conversations}
        {dm}
      </div>
    </div>
  );
}
