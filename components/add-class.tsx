'use client';
import React from 'react';
import GenericModal from '@/components/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddClassProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
}


export default function AddClass({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddClassProps) {
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addClass}
      description={translations.addDescription}
    >
      {/* Your modal content goes here */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.className}</Label>
          <Input id="name" placeholder={translations.addNewClass} value={newRecord.name || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, name: e.target.value }))
          } />
          <Label htmlFor="name">{translations.teacherName}</Label>
          <Input id="name" placeholder={translations.teacherName} value={newRecord.teacher || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, teacher: e.target.value }))
          } />
        </div>

      </div>
    </GenericModal>
  );
}
