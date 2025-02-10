import React from 'react';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations';
import { Share } from 'lucide-react';

interface ShareDialogProps {
  title: string,
  description: string,
  confirmText: string,
  cancelText: string;
  shareMessage?: string;
  onShare: (id: number) => void,
  id: number;

}

export default function ShareDialog({
  title,
  description,
  confirmText,
  cancelText,
  onShare,
  id,
  shareMessage = translations.share
}: ShareDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          {shareMessage}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter className="space-x-2">
          <DialogClose asChild>
            <Button variant="outline" >
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => onShare(id)}
            >
              {confirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
