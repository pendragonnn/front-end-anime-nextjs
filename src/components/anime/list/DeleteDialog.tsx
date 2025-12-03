"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Hapus Anime?",
  description = "Tindakan ini tidak dapat dibatalkan. Anime yang dihapus tidak bisa dipulihkan.",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton
        className="
          bg-black/90 
          text-white 
          backdrop-blur-xl 
          border border-white/10
          shadow-xl shadow-black/40
        "
      >
        <DialogHeader>
          <DialogTitle className="text-red-400 text-xl font-bold">
            {title}
          </DialogTitle>

          <DialogDescription className="text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:text-white hover:bg-white/10"
            >
              Batal
            </Button>
          </DialogClose>

          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
