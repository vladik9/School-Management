import React from 'react';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations';
import { Users } from 'lucide-react';

interface SimpleDialogProps {
  title: string,
  description: string,
  triggerButtonTitle: string;
  onOpen: (id: number) => void,
  id: number;
  children?: React.ReactNode;

}
export default function SimpleDialog({
  title,
  description,
  triggerButtonTitle,
  onOpen,
  id,
  children
}: SimpleDialogProps) {
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
      </DialogContent>
    </Dialog>
  );
}
