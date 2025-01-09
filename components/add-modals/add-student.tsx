'use client';
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
  newRecord: {
    name: string;
    orderNb: string;
    studentId: number;
    classId: number;
    study_class: number;
    sex: string;
  };
  selectedYear: number | null;
  years: YearData[];
}

export default function AddStudent({ isModalOpen, handleCloseModal, handleSaveModal, setNewRecord, selectedYear, newRecord, years }: AddStudentProps) {
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    handleIdGeneration();
  }, [newRecord.orderNb, newRecord.sex, newRecord.study_class, selectedYear]);

  const handleInputChange = (field: string, value: string) => {
    setNewRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
