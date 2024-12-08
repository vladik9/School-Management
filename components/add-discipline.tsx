'use client';
import React from 'react';
import GenericModal from '@/components/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddDisciplineProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
}


export default function AddDiscipline({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddDisciplineProps) {
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addDiscipline}
      description={translations.addDescription}
    >
      {/* Your modal content goes here */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.disciplineName}</Label>
          <Input id="name" placeholder={translations.addNewDiscipline} value={newRecord.name || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, name: e.target.value }))
          } />

        </div>

      </div>
    </GenericModal>
  );
}
