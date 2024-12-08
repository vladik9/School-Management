'use client';
import React from 'react';
import GenericModal from '@/components/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddTestProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
}


export default function AddTest({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddTestProps) {
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addTest}
      description={translations.addDescription}
    >
      {/* Your modal content goes here */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.testName}</Label>
          <Input id="name" placeholder={translations.addTest} value={newRecord.name || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, name: e.target.value }))
          } />

        </div>

      </div>
    </GenericModal>
  );
}
