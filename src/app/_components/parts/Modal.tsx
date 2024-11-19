"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/app/_components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Modal({ children, contentClassName }: { children: React.ReactNode, contentClassName?: string }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="bg-black/10" />
      <DialogContent className={cn("border-none bg-transparent shadow-none p-0 overflow-y-auto", contentClassName)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
