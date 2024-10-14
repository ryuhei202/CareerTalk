"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const StartFreeButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-purple-600 hover:bg-purple-700 text-white"
      onClick={() => router.push("/signin")}
    >
      無料で始める
    </Button>
  );
};
