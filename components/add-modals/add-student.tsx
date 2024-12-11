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


interface AddStudentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
  selectedYear: number | null;
}


export default function AddStudent({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord, selectedYear }: AddStudentProps) {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    orderNb: '',
    sex: '',
    study_class: '',
  });

  useEffect(() => {
    handleIdGeneration();
  }, [studentDetails]);



  const [generatedId, setGeneratedId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setStudentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIdGeneration = () => {
    const { orderNb, sex, study_class } = studentDetails;
    if (orderNb && sex && study_class) {
      const studentId = `${sex}${orderNb}${study_class}${selectedYear}`;
      setGeneratedId(studentId);
      setNewRecord((prev: any) => ({ ...prev, 'studentId': studentId }));
    } else {
      setGeneratedId('');
    }
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addStudent}
      description={translations.addDescription}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.studentName}</Label>
          <Input
            id="name"
            placeholder={translations.studentName}
            value={studentDetails.name}
            onChange={(e) => {
              handleInputChange('name', e.target.value);
              setNewRecord((prev: any) => ({ ...prev, 'name': e.target.value }));
            }}
          />
        </div>
        <div>
          <Label htmlFor="order-nb-student">{translations.idStudent}</Label>
          <Input
            id="order-nb-student"
            type="number"
            placeholder={translations.idStudent}
            value={studentDetails.orderNb}
            onChange={(e) => handleInputChange('orderNb', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="sex">{translations.sex}</Label>
          <Select
            onValueChange={(value) => {
              handleInputChange('sex', value);
              handleIdGeneration();
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
              handleIdGeneration();
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
    </GenericModal >
  );
}
