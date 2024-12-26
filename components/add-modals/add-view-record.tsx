'use client';
import React from 'react';
import GenericModal from '@/components/generic/generic-modal';
import TimePicker from '@/components/ui/time-picker';
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
  setNewRecord: (data: { studentId: number, startTime: string, endTime: string; }) => void;
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
}: AddViewRecordProps) {
  const onStudentSelect = (studentId: string) => {
    setNewRecord(prev => ({
      ...prev,
      studentId: parseInt(studentId, 10)
    }));
  };

  const onStartTimeChange = (startTime: string) => {
    setNewRecord(prev => ({ ...prev, startTime }));
  };

  const onFinalTimeChange = (endTime: string) => {
    setNewRecord(prev => ({ ...prev, endTime }));
  };

  const onSave = () => {
    if (newRecord.studentId && newRecord.startTime && newRecord.endTime) {
      handleSaveModal(newRecord.id, newRecord,);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

  const isFormValid = (): boolean => {
    const { studentId, startTime, endTime } = newRecord;
    return !!(studentId && startTime && endTime);
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
          <TimePicker
            label={translations.startTime}
            id="startTime"
            value={newRecord.startTime}
            onChange={onStartTimeChange}
          />
        </div>
        <div>
          <TimePicker
            label={translations.finalTime}
            id="endTime"
            value={newRecord.endTime}
            onChange={onFinalTimeChange}
          />
        </div>
      </div>
    </GenericModal>
  );
}
