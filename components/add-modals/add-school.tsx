'use client';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddSchoolProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
}


export default function AddSchool({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddSchoolProps) {
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addSchool}
      description={translations.addDescription}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{translations.name}</Label>
          <Input id="name" placeholder={translations.newSchoolName} value={newRecord.name || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, name: e.target.value }))
          } />
        </div>
      </div>
    </GenericModal>
  );
}
