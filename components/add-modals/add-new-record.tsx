'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import TimePicker from '@/components/ui/time-picker';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translations from '@/lib/translations';

interface AddNewRecordProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: (newRecord: NewRecord) => void;
  records: any[];
  students: any[];
}

interface NewRecord {
  studentId: string;
  startTime: string;
  finalTime: string;
}

export default function AddNewRecord({ isModalOpen, handleCloseModal, handleSaveModal, records, students }: AddNewRecordProps) {
  const [newRecord, setNewRecord] = useState<NewRecord>({
    studentId: '',
    startTime: '',
    finalTime: '',
  });

  const onStudentSelect = (studentId: string) => {
    setNewRecord(prev => ({ ...prev, studentId }));
  };

  const onStartTimeChange = (time: string) => {
    setNewRecord(prev => ({ ...prev, startTime: time }));
  };

  const onFinalTimeChange = (time: string) => {
    setNewRecord(prev => ({ ...prev, finalTime: time }));
  };

  const onSave = () => {
    if (newRecord.studentId && newRecord.startTime && newRecord.finalTime) {
      handleSaveModal(newRecord);
    } else {
      // Handle validation error
      console.error('All fields are required');
    }
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={onSave}
      title={translations.addNewRecord}
      description={translations.addNewRecordDescription}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="student-select">{translations.chooseStudent}</Label>
          <Select onValueChange={onStudentSelect} value={newRecord.studentId}>
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
            id="start-time"
            value={newRecord.startTime}
            onChange={onStartTimeChange}
          />
        </div>

        <div>
          <TimePicker
            label={translations.finalTime}
            id="final-time"
            value={newRecord.finalTime}
            onChange={onFinalTimeChange}
          />
        </div>
      </div>
    </GenericModal>
  );
}
