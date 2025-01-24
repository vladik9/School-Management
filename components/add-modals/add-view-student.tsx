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

/**
 * A modal component for adding a new student.
 *
 * This component renders a modal that allows users to input a new student's name.
 * The modal utilizes the `GenericModal` component for consistent styling and behavior.
 * It includes form validation to ensure that all required fields are filled
 * before allowing the user to save the new student.
 *
 * Props:
 * - `isModalOpen`: A boolean indicating whether the modal should be open or not.
 * - `modalTitle`: The title of the modal.
 * - `modalDescription`: The description of the modal.
 * - `handleCloseModal`: A callback function to call when the modal is closed.
 * - `handleSaveModal`: A callback function to call when the "Save" button is clicked.
 * - `newRecord`: An object containing the current state of the student details being entered.
 * - `setNewRecord`: A function to update the `newRecord` state.
 * - `children`: An optional node to render as a child of the modal.
 *
 * Returns:
 * - A JSX element representing the modal to add a new student.
 */
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
  /**
   * Updates the `newRecord` state with a new student name.
   *
   * Called when the user types a new name in the input field.
   * @param {string} name - The new student name.
   */
  const onValueChange = (name: string) => {
    setNewRecord((prev: StudentData) => ({
      ...prev,
      name,
      id: prev.id,
      studentId: prev.studentId,
    }));
  };

  /**
   * Handles the saving of a new student.
   *
   * This function checks if both the student name and ID have been entered,
   * and if so, calls `handleSaveModal` with the new student data.
   * If either field is empty, a validation error is logged to the console.
   */
  const onSave = () => {
    if (newRecord.studentId && newRecord.name) {
      handleSaveModal(newRecord.id, newRecord);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

  /**
   * Checks if the form is valid.
   *
   * The form is considered valid when the student name is not empty.
   * @returns {boolean} Whether the form is valid.
   */
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
