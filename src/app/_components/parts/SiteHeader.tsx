import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { LoginButton } from "./Button/LoginButton";

type Item = {
  href: string;
  icon: StaticImageData;
  label: string;
};

export default function SiteHeader({
  type,
  firstItem,
  secondItem,
  thirdItem,
}: {
  type: "applicant" | "employee" | "homepage";
  firstItem?: Item;
  secondItem?: Item;
  thirdItem?: Item;
}) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center space-x-4 pl-8">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black">ハイキャリトーク</h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center h-full flex-grow justify-end">
          {firstItem && (
            <Link
              href={firstItem.href}
              className="flex flex-col items-center justify-center h-full px-12 text-gray-600 hover:text-gray-900 border-r border-gray-200 min-w-[160px]"
            >
              <Image
                src={firstItem.icon}
                alt={firstItem.label}
                width={40}
                height={40}
              />
              <span className="text-sm">{firstItem.label}</span>
            </Link>
          )}
          {secondItem && (
            <Link
              href={secondItem.href}
              className="flex flex-col items-center justify-center h-full px-12 text-gray-600 hover:text-gray-900 border-r border-gray-200 min-w-[160px]"
            >
              <Image
                src={secondItem.icon}
                alt={secondItem.label}
                width={40}
                height={40}
              />
              <span className="text-sm">{secondItem.label}</span>
            </Link>
          )}
          {thirdItem && (
            <Link
              href={thirdItem.href}
              className="flex flex-col items-center justify-center h-full px-12 text-gray-600 hover:text-gray-900 border-r border-gray-200 min-w-[160px]"
            >
              <Image
                src={thirdItem.icon}
                alt={thirdItem.label}
                width={40}
                height={40}
              />
              <span className="text-sm">{thirdItem.label}</span>
            </Link>
          )}
          {type === "homepage" ? (
            <LoginButton className="me-4" />
          ) : (
            <Link
              href={`/${type}/my_page`}
              className="relative bg-customBlue-dark text-black px-12 h-full flex items-center justify-center overflow-hidden"
            >
              <span className="relative z-10 text-lg font-semibold text-white pl-12">
                MY PAGE
              </span>
              <span
                className="absolute top-0 left-0 w-24 h-full bg-white transform -skew-x-[30deg] -translate-x-14"
                aria-hidden="true"
              />
            </Link>
          )}
        </nav>
        <button className="md:hidden mr-4" type="button">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="menuIconTitle menuIconDesc"
          >
            <title id="menuIconTitle">メニュー</title>
            <desc id="menuIconDesc">
              メニューを開くためのハンバーガーアイコン
            </desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
