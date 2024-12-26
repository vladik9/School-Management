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

  // Update barem when Input changes:
  const handleBaremChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value, 10) || 0;
    setNewRecord((prev) => ({ ...prev, barem: parsedValue }));
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
          <Label htmlFor="barem">{translations.barem}</Label>
          <Input
            id="barem"
            placeholder={translations.barem}
            value={newRecord.barem || ''}
            onChange={handleBaremChange}
          />
        </div>
      </div>
    </GenericModal>
  );
}
