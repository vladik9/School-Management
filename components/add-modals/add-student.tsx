import React, { useState, useEffect } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { YearData } from '@/types/types';

interface AddStudentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  setNewRecord: (data: { name: string; studentId: number, classId: number; study_class: number; orderNb: number; sex: string; }) => void;
  newRecord: any;
  selectedYear: number | null;
  years: YearData[];
}

/**
 * Component for adding a new student.
 *
 * This component renders a modal that allows users to input and save details
 * for a new student, including the student name, order number, sex, and class.
 * The modal utilizes the `GenericModal` component for consistent styling and
 * behavior. It includes form validation to ensure that all required fields are
 * filled before allowing the user to save the new student.
 *
 * Props:
 * - isModalOpen (boolean): Determines if the modal is open.
 * - handleCloseModal (function): Function to close the modal.
 * - handleSaveModal (function): Function to save the student details.
 * - setNewRecord (function): Function to update the student details state.
 * - newRecord (object): The current state of the student details being entered.
 * - selectedYear (number | null): The currently selected year.
 * - years (array): An array of year data.
 *
 * Returns:
 * - A JSX element representing the modal to add a new student.
 */
export default function AddStudent({ isModalOpen, handleCloseModal, handleSaveModal, setNewRecord, newRecord, selectedYear, years }: AddStudentProps) {
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    handleIdGeneration();
  }, [newRecord.orderNb, newRecord.sex, newRecord.study_class, selectedYear]);

  /**
   * Handles input change events for the student form fields.
   *
   * This function updates the state of the `newRecord` object with the new
   * value from the input field. The field name is used as the key in the
   * `newRecord` object, and the value is the new value from the input field.
   *
   * @param {string} field - The field name for the input field that triggered
   * the change event.
   * @param {string | number} value - The new value from the input field.
   */
  const handleInputChange = (field: string, value: string | number) => {
    setNewRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Generates a student ID based on the entered order number, sex, and class.
   *
   * This function takes the entered order number, sex, and class, and combines
   * them to form a student ID. The generated student ID is then set as the
   * value of the `studentId` field in the `newRecord` object. If any of the
   * required fields are empty, the generated student ID is cleared.
   */
  const handleIdGeneration = () => {
    const { orderNb, sex, study_class } = newRecord;
    if (orderNb && sex && study_class) {
      const studentId = `${sex}${orderNb}${study_class}${years.find((year: YearData) => year.id === selectedYear)?.name || selectedYear}`;
      setGeneratedId(studentId);
      setNewRecord((prev: any) => ({ ...prev, studentId }));
    } else {
      setGeneratedId('');
    }
  };

  /**
   * Checks if all required fields have values.
   *
   * This function checks that the following fields have values:
   * - `name`
   * - `orderNb`
   * - `sex`
   * - `study_class`
   *
   * If any of the required fields are empty, the function returns `false`.
   *
   * @returns {boolean} `true` if all required fields have values, `false` otherwise.
   */
  const isFormValid = (): boolean => {
    const { name, orderNb, sex, study_class } = newRecord;
    return !!(name && orderNb && sex && study_class);
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addStudent}
      description={translations.addDescription}
      isFormValid={isFormValid()}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.studentName}</Label>
          <Input
            id="name"
            placeholder={translations.studentName}
            value={newRecord.name}
            onChange={(e) => {
              handleInputChange('name', e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="order-nb-student">{translations.idStudent}</Label>
          <Input
            id="order-nb-student"
            type="number"
            placeholder={translations.idStudent}
            value={newRecord.orderNb}
            onChange={(e) => handleInputChange('orderNb', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="sex">{translations.sex}</Label>
          <Select
            onValueChange={(value) => {
              handleInputChange('sex', value);
            }}
            value={newRecord.sex}
          >
            <SelectTrigger id="sex">
              <SelectValue placeholder={translations.sex} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F">{translations.sexF}</SelectItem>
              <SelectItem value="B">{translations.sexB}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="class">{translations.class}</Label>
          <Select
            onValueChange={(value) => {
              handleInputChange('study_class', value);
            }}
            value={newRecord.study_class}
          >
            <SelectTrigger id="class">
              <SelectValue placeholder={translations.class} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">{translations.experimentA}</SelectItem>
              <SelectItem value="B">{translations.controlB}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="ml-2" >
            {translations.generatedStudentId}: <span style={{ fontStyle: 'italic' }}>{generatedId || translations.idNotGenerated}</span>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
