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
}

export default function GenericModal({
  isOpen,
  onClose,
  onSave,
  title = 'Modal Title',
  description,
  children,
  width = '425',

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
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translations.cancelText}
          </Button>
          <Button onClick={onSave}>
            {translations.saveText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
