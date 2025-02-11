import React from 'react';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations';
import { Share } from 'lucide-react';
import ShareLink from '../shareLink';
interface ShareDialogProps {
  title: string,
  description: string,
  confirmText: string,
  cancelText: string;
  shareMessage?: string;
  onShare: (id: number) => void,
  id: number;
}
//TODO - implement this to generate a share link for document existing in DB so i cane share it with others and show to user
// const onShareLink = (id: number) => {
//   console.log(`Sharing document with ID: ${id}`);
// };

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
        {/* //TODO - add share link component here */}
        {/* Link component */}
        <ShareLink link="Link" />
        <DialogFooter className="space-x-2">
          <DialogClose asChild>
            <Button variant="outline" >
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
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
