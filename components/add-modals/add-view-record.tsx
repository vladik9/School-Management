
'use client';
import React from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translations from '@/lib/translations';
import { RecordData, StudentData } from "@/types/types";

interface AddViewRecordProps {
  isModalOpen: boolean;
  modalTitle: string;
  modalDescription: string;
  handleCloseModal: () => void;
  handleSaveModal: (recordId: number, newRecord: RecordData) => void;
  students: StudentData[];
  newRecord: RecordData;
  setNewRecord: (data: RecordData) => void;
  children?: React.ReactNode;
}

/**
 * A modal component for adding a new record.
 *
 * This component renders a modal that allows users to select a student and input a value for the record.
 * The modal utilizes the `GenericModal` component for consistent styling and behavior.
 * It includes form validation to ensure that all required fields are filled
 * before allowing the user to save the new record.
 *
 * Props:
 * - isModalOpen (boolean): Determines if the modal is open.
 * - handleCloseModal (function): Function to close the modal.
 * - handleSaveModal (function): Function to save the record details.
 * - newRecord (object): The current state of the record details being entered.
 * - setNewRecord (function): Function to update the record details state.
 * - students (array): An array of student data.
 * - modalTitle (string): The title of the modal.
 * - modalDescription (string): The description of the modal.
 * - children (node): A node to render as a child of the modal.
 *
 * Returns:
 * - A JSX element representing the modal to add a new record.
 */
export default function AddViewRecord({
  isModalOpen,
  modalTitle = translations.addNewRecord,
  modalDescription = translations.addNewRecordDescription,
  handleCloseModal,
  handleSaveModal,
  students,
  newRecord,
  setNewRecord,
  children,
}: AddViewRecordProps) {

  /**
   * Handles a change in the student select field.
   *
   * Updates the `newRecord` state with the selected student's ID and generated ID.
   *
   * @param {string} studentId - The value of the selected student.
   */
  const onStudentSelect = (studentId: string) => {
    const student = students.find((student) => student.id === parseInt(studentId));
    if (student) {
      setNewRecord((prev: RecordData) => ({
        ...prev,
        studentId: parseInt(studentId, 10),
        studentGeneratedId: student.studentId
      }));
    } else {
      console.error('Student not found');
    }
  };

  /**
   * Handles the saving of a new record for the selected student.
   *
   * This function triggers the creation of a new record using the provided data,
   * closes the record modal, resets the newRecord state, and refreshes the list
   * of records. If an error occurs during the process, an error status modal
   * is displayed.
   *
   * @returns {Promise<void>} A promise that resolves when the record has been processed.
   */
  const onSave = () => {
    if (newRecord.studentId && newRecord.value) {
      handleSaveModal(newRecord.studentId, newRecord);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

  /**
   * Checks if the form is valid.
   *
   * The form is considered valid if both `studentId` and `value` fields
   * in the `newRecord` object have values.
   *
   * @returns {boolean} `true` if both fields have values, `false` otherwise.
   */
  const isFormValid = (): boolean => {
    const { studentId, value } = newRecord;
    return !!(studentId && value);
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
          <Label htmlFor="student-select">{translations.chooseStudent}</Label>
          <Select onValueChange={onStudentSelect} value={newRecord.studentId?.toString()}>
            <SelectTrigger id="student-select">
              <SelectValue placeholder={translations.chooseStudent} />
            </SelectTrigger>
            <SelectContent>
              {students.length > 0 && students.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          {children}
        </div>
      </div>
    </GenericModal>
  );
}
