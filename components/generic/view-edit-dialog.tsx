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
/**
 * A dialog component for viewing and/or editing a record.
 *
 * This component renders a dialog with a title, description, and custom content.
 * It includes a "Cancel" button and an optional "Save" button.
 * The "Save" button is only present if `isViewOnly` is set to `false`.
 * When the "Save" button is clicked, the `onSave` callback is called with the `id` and a dummy object as arguments.
 * When the "Cancel" button is clicked, the dialog is simply closed.
 *
 * Props:
 * - `title` (string): The title of the dialog.
 * - `description` (string): The description text for the dialog.
 * - `triggerButtonTitle` (string): The text to be displayed on the button that triggers the dialog.
 * - `onOpen` (function): A callback function to be called when the dialog is opened.
 * - `onSave` (function): A callback function to be called when the "Save" button is clicked.
 * - `id` (number): An ID to be passed as an argument to the `onOpen` and `onSave` callbacks.
 * - `children` (ReactNode): The content to be displayed inside the dialog.
 * - `isViewOnly` (boolean, optional): Whether to display the "Save" button. Defaults to `true`.
 * - `cancelText` (string, optional): The text to be displayed on the "Cancel" button. Defaults to "Cancel".
 * - `confirmText` (string, optional): The text to be displayed on the "Save" button. Defaults to "Save".
 */
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
