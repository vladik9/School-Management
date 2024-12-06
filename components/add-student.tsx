import React from 'react';
import GenericModal from '@/components/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddStudentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
}


export default function AddStudent({ isModalOpen, handleCloseModal, handleSaveModal }: AddStudentProps) {
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title="Add New Student"
      description="Enter the details of the new student."
    >
      {/* Your modal content goes here */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter student name" />
        </div>
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Input id="grade" placeholder="Enter student grade" />
        </div>
      </div>
    </GenericModal>
  );
}
