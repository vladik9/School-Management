
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

  const onSave = () => {
    if (newRecord.studentId && newRecord.value) {
      handleSaveModal(newRecord.studentId, newRecord);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

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
