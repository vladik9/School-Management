import React from 'react';

import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

interface ViewEditDialogProps {
  title: string,
  description: string,
  triggerButtonTitle: string;
  onOpen: (id: number) => void,
  onSave: (id: number, data: object) => void,
  id: number;
  children?: React.ReactNode;
  isViewOnly?: boolean;
  cancelText?: string;
  confirmText?: string;
}
export default function ViewEditDialog({
  title,
  description,
  triggerButtonTitle,
  onOpen,
  onSave,
  id,
  children,
  cancelText,
  confirmText,
  isViewOnly = true
}: ViewEditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpen(id)}
        >
          <Users className="h-4 w-4 mr-2" />
          {triggerButtonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        {children}
        <DialogFooter className="space-x-2">
          <DialogClose asChild>
            <Button variant="outline" >
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            {!isViewOnly && <Button
              variant="default"
              onClick={() => onSave(id, { new: "data" })}
            >
              {confirmText}
            </Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
