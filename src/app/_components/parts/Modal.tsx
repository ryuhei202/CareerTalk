"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-black/10" />
      <DialogContent className="border-none bg-transparent shadow-none p-0">
        <DialogTitle className="sr-only">モーダルウィンドウ</DialogTitle>
        <DialogDescription className="sr-only">
          詳細情報を表示するモーダルウィンドウです
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
