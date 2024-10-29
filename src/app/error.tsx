"use client"; // Error boundaries must be Client Components

import ErrorPage from "./_components/page/ErrorPage";

// キャッチされない予期せぬエラーの場合はこのページが表示される
// @see https://nextjs.org/docs/app/building-your-application/routing/error-handling#uncaught-exceptions
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorPage message={error.message} data={undefined} />;
}
