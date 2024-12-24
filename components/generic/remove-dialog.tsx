import React from 'react';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations';
import { Trash2 } from 'lucide-react';

interface RemoveDialogProps {
  title: string,
  description: string,
  confirmText: string,
  cancelText: string;
  removeMessage?: string;
  onRemove: (id: number) => void,
  id: number;

}
export default function RemoveDialog({
  title,
  description,
  confirmText,
  cancelText,
  onRemove,
  id,
  removeMessage = translations.remove
}: RemoveDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          {removeMessage}
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
              onClick={() => onRemove(id)}
            >
              {confirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
