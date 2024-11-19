"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
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
      <DialogContent className="w-screen border-none bg-transparent shadow-none p-0 h-[90%] max-w-none overflow-y-scroll">
        {children}
      </DialogContent>
    </Dialog>
  );
}
