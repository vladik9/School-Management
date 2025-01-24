'use client';
import React from 'react';
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
import { baremTypes } from '@/utils/dataEnums';
import TimePicker from '../ui/time-picker';

interface AddTestProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: {
    name: string;
    baremType: number;
    barem: number;
  }) => void;
}

/**
 * A modal component for adding a new test.
 *
 * The component renders a form with three required fields: test name, barem type, and barem value.
 * The barem value input type is determined by the selected barem type.
 *
 * The component also renders a "Save" button and a "Close" button. When the "Save" button is clicked,
 * the `handleSaveModal` callback is called with the current `newRecord` state. If the form is not valid,
 * the "Save" button is disabled.
 *
 * The component receives the following props:
 *
 * - `isModalOpen`: A boolean indicating whether the modal should be open or not.
 * - `handleCloseModal`: A callback function to call when the modal is closed.
 * - `handleSaveModal`: A callback function to call when the "Save" button is clicked.
 * - `newRecord`: An object containing the current state of the form.
 * - `setNewRecord`: A function to update the `newRecord` state.
 *
 * @param {boolean} isModalOpen - Whether the modal should be open or not.
 * @param {() => void} handleCloseModal - A callback function to call when the modal is closed.
 * @param {() => void} handleSaveModal - A callback function to call when the "Save" button is clicked.
 * @param {{ name: string; baremType: number; barem: number }} newRecord - An object containing the current state of the form.
 * @param {(data: { name: string; baremType: number; barem: number }) => void} setNewRecord - A function to update the `newRecord` state.
 */
export default function AddTest({
  isModalOpen,
  handleCloseModal,
  handleSaveModal,
  newRecord,
  setNewRecord,
}: AddTestProps) {

  /**
   * Checks if the form is valid.
   *
   * The form is considered valid if all fields (name, baremType, and barem) are not empty.
   * @returns {boolean} Whether the form is valid.
   */
  const isFormValid = (): boolean => {
    const { name, baremType, barem } = newRecord;
    return !!(name && baremType && barem);
  };

  /**
   * Handles a change in the barem type select field.
   *
   * Updates the `newRecord` state with the selected barem type.
   *
   * @param {string} value - The value of the selected barem type.
   */
  const handleBaremTypeChange = (value: string) => {
    setNewRecord((prev) => ({
      ...prev,
      baremType: parseInt(value, 10)
    }));
  };

  /**
   * Handles a change in the barem input field.
   *
   * Updates the `newRecord` state with the new barem value.
   *
   * The `value` parameter can be either a string or a React.ChangeEvent<HTMLInputElement>.
   * If it is a string, it is a direct value (e.g., from TimePicker). Otherwise, it is an event target value (e.g., from Input).
   * @param {string | React.ChangeEvent<HTMLInputElement>} value - The new barem value.
   */
  const handleBaremChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === 'string') {
      // Direct string value (e.g., from TimePicker)
      setNewRecord((prev) => ({ ...prev, barem: value }));
    } else {
      // Event target value (e.g., from Input)
      setNewRecord((prev) => ({ ...prev, barem: value.target.value }));
    }
  };

  /**
   * Renders the correct input based on the selected barem type.
   *
   * @param {number} baremType - The currently selected barem type.
   * @returns {React.ReactNode} The rendered input component.
   */
  const inputBasedOnBaremType = (baremType: number) => {
    switch (baremType) {
      case 1:
        return (
          <>
            <Label className="mb-5" htmlFor="meters">{translations.enterBaremForMetersMeasurement}</Label>
            <Input
              id="meters"
              type="number"
              placeholder={translations.enterNumberOfMetresPlaceholder}
              value={newRecord.barem || ''}
              onChange={handleBaremChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <Label className="mb-5" htmlFor="centimeters">{translations.enterBaremForCentimetersMeasurement}</Label>
            <Input
              id="centimeters"
              type="number"
              placeholder={translations.eneterNumberOfCentimetersPlaceholder}
              value={newRecord.barem || ''}
              onChange={handleBaremChange}
            />
          </>
        );
      case 3:
        return (
          <TimePicker
            label={translations.enterBaremForTimeMeasurement}
            id="startTime"
            value={newRecord.barem} // Ensure TimePicker takes this as input
            onChange={(timeValue: string) =>
              handleBaremChange(timeValue) // Pass timeValue directly
            }
          />
        );
      case 4:
        return (
          <>
            <Label className="mb-5" htmlFor="number">{translations.enterBaremForNumberMeasurement}</Label>
            <Input
              id="number"
              type="number"
              placeholder={translations.enterNumberPlaceholder}
              value={newRecord.barem || ''}
              onChange={handleBaremChange}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addTest}
      description={translations.addDescription}
      isFormValid={isFormValid()}
    >
      <div className="space-y-4">
        {/* Test Name */}
        <div>
          <Label htmlFor="name">{translations.testName}</Label>
          <Input
            id="name"
            placeholder={translations.addTest}
            value={newRecord.name || ''}
            onChange={(e) =>
              setNewRecord((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        {/* Barem Type */}
        <div>
          <Label htmlFor="baremType">{translations.chooseBaremType}</Label>
          <Select
            onValueChange={handleBaremTypeChange}
            value={newRecord.baremType?.toString()}
          >
            <SelectTrigger id="baremType">
              <SelectValue placeholder={translations.chooseBaremType} />
            </SelectTrigger>
            <SelectContent>
              {baremTypes.map(([typeValue, typeLabel]) => (
                <SelectItem key={typeValue} value={typeValue.toString()}>
                  {typeLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Barem Value */}
        <div>
          {inputBasedOnBaremType(newRecord.baremType)}
        </div>
      </div>
    </GenericModal>
  );
}
