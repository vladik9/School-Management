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
  newRecord: {
    name: string;
    baremType: number;
    barem: number;
  };
  setNewRecord: (data: {
    name: string;
    baremType: number;
    barem: number;
  }) => void;
}

export default function AddTest({
  isModalOpen,
  handleCloseModal,
  handleSaveModal,
  newRecord,
  setNewRecord,
}: AddTestProps) {
  // Checks if all required fields have values:
  const isFormValid = (): boolean => {
    const { name, baremType, barem } = newRecord;
    return !!(name && baremType && barem);
  };

  // Update baremType when Select changes:
  const handleBaremTypeChange = (value: string) => {
    setNewRecord((prev) => ({ ...prev, baremType: parseInt(value, 10) }));
  };

  const handleBaremChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === 'string') {
      // Direct string value (e.g., from TimePicker)
      setNewRecord((prev) => ({ ...prev, barem: value }));
    } else {
      // Event target value (e.g., from Input)
      setNewRecord((prev) => ({ ...prev, barem: value.target.value }));
    }
  };

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
