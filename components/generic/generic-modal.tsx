'use client';

import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import translations from '@/lib/translations';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  cancelText?: string;
  saveText?: string;
  width?: string;
  isSaveRequired?: boolean;
  isFormValid?: boolean;
}

/**
 * A generic modal component.
 *
 * This component renders a modal dialog with a header, description, and custom content.
 * It includes "Cancel" and "Save" buttons at the footer, with optional form validation
 * to enable or disable the "Save" button.
 *
 * Props:
 * - `isOpen` (boolean): Determines if the modal is open.
 * - `onClose` (function): Function to close the modal.
 * - `onSave` (function): Function to save the changes.
 * - `title` (string): The title of the modal.
 * - `description` (string, optional): The description text for the modal.
 * - `children` (ReactNode): The content to be displayed inside the modal.
 * - `width` (string, optional): The custom width of the modal.
 * - `isSaveRequired` (boolean, optional): Whether the save button is required.
 * - `isFormValid` (boolean, optional): Whether the form inside the modal is valid.
 *
 * Returns:
 * - A JSX element representing the generic modal.
 */
export default function GenericModal({
  isOpen,
  onClose,
  onSave,
  title = 'Modal Title',
  description,
  children,
  width = '425',
  isSaveRequired = true,
  isFormValid = false,

}: GenericModalProps) {
  const modalWidth = `sm:max-w-[${width}px]`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={modalWidth}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">
          {children}
        </div>
        <div className="w-full border-t border-gray-300" style={{ height: '0.125px' }} />
        <DialogFooter >
          <Button variant="outline" onClick={onClose}>
            {translations.cancelText}
          </Button>
          {isSaveRequired && <Button disabled={!isFormValid} onClick={onSave}>
            {translations.saveText}
          </Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
