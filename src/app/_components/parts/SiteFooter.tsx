import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-6 dark:border-border">
      <div className="flex justify-center items-center gap-8">
        <Link href={"/privacy_policy"} className="border-b hover:text-gray-500">
          プライバシーポリシー
        </Link>
        <Link
          href={"/terms_of_service"}
          className="border-b hover:text-gray-500"
        >
          利用規約
        </Link>
      </div>
    </footer>
  );
}
