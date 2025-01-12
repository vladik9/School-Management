'use client';
import React from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';
import { StudentData } from "@/types/types";
import { Input } from '../ui/input';

interface AddViewStudentProps {
  isModalOpen: boolean;
  modalTitle: string;
  modalDescription: string;
  handleCloseModal: () => void;
  handleSaveModal: (recordId: number, newRecord: StudentData) => void;
  newRecord: StudentData;
  setNewRecord: (data: StudentData) => void;
  children?: React.ReactNode;
}

export default function AddViewStudent({
  isModalOpen,
  modalTitle = translations.addNewRecord,
  modalDescription = translations.addNewRecordDescription,
  handleCloseModal,
  handleSaveModal,
  newRecord,
  setNewRecord,
  children,
}: AddViewStudentProps) {
  const onValueChange = (name: string) => {
    setNewRecord((prev: StudentData) => ({
      ...prev,
      name,
      id: prev.id,
      studentId: prev.studentId,
    }));
  };

  const onSave = () => {
    if (newRecord.studentId && newRecord.name) {
      handleSaveModal(newRecord.id, newRecord);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

  const isFormValid = (): boolean => {
    const { name } = newRecord;
    return !!(name);
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={onSave}
      title={modalTitle}
      description={modalDescription}
      isFormValid={isFormValid()}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="student-select">{translations.studentName}</Label>
          <Input
            id="name"
            type="text"
            placeholder={translations.studentName}
            value={newRecord.name || ''}
            onChange={(e) => onValueChange(e.target.value)}
          />
        </div>
        <div>
          {children}
        </div>
      </div>
    </GenericModal>
  );
}
