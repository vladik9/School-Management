'use client';
import React from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddClassProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; teacher: string; }) => void;
}


/**
 * Component for adding a new class.
 *
 * This component renders a modal that allows users to input and save details
 * for a new class, including the class name and teacher's name. The modal
 * utilizes the `GenericModal` component for consistent styling and behavior.
 * It includes form validation to ensure that all required fields are filled
 * before allowing the user to save the new class.
 *
 * Props:
 * - isModalOpen (boolean): Determines if the modal is open.
 * - handleCloseModal (function): Function to close the modal.
 * - handleSaveModal (function): Function to save the class details.
 * - newRecord (object): The current state of the class details being entered.
 * - setNewRecord (function): Function to update the class details state.
 *
 * Returns:
 * - A JSX element representing the modal to add a new class.
 */
export default function AddClass({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddClassProps) {
  const isFormValid = (): boolean => {
    const { name, teacher } = newRecord;
    return !!(name && teacher);
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addClass}
      description={translations.addDescription}
      isFormValid={isFormValid()}

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
