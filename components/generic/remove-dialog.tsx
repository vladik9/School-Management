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
/**
 * A dialog component that triggers a remove action when confirmed.
 *
 * Props:
 * - `title` (string): The title of the dialog.
 * - `description` (string): The description text for the dialog.
 * - `confirmText` (string): The confirm button text.
 * - `cancelText` (string): The cancel button text.
 * - `onRemove` (function): The function to call when the confirm button is clicked.
 * - `id` (number): The id to pass to the `onRemove` function.
 * - `removeMessage` (string, optional): The remove button text. Defaults to the translation for "remove".
 *
 * Returns:
 * - A JSX element representing the remove dialog.
 */
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
