import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';

interface SimpleDialogProps {
  title: string,
  description: string,
  triggerButtonTitle: string;
  onOpen: (id: number) => void,
  id: number;
  children?: React.ReactNode;
}

/**
 * A simple dialog component.
 *
 * This component renders a button that triggers the display of a dialog when clicked.
 * The dialog has a title, description, and a footer with a single button.
 * The content of the dialog can be customized with a `children` prop.
 *
 * Props:
 * - `title` (string): The title of the dialog.
 * - `description` (string): The description text for the dialog.
 * - `triggerButtonTitle` (string): The text to be displayed on the button that triggers the dialog.
 * - `onOpen` (function): A callback function to be called when the dialog is opened.
 * - `id` (number): An ID to be passed as an argument to the `onOpen` callback.
 * - `children` (ReactNode): The content to be displayed inside the dialog.
 *
 * Returns:
 * - A JSX element representing the simple dialog.
 */
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
