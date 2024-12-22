'use client';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface AddYearProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { year: number; }) => void;
}


export default function AddYear({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddYearProps) {
  const isFormValid = (): boolean => {
    const { year } = newRecord;
    return !!(year);
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addANewYear}
      description={translations.addDescription}
      isFormValid={isFormValid()}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="year">{translations.year}</Label>
          <Input id="year" placeholder={translations.addYear} value={newRecord.year || ''} onChange={(e) =>
            setNewRecord((prev: any) => ({ ...prev, year: e.target.value }))
          } />
        </div>
      </div>
    </GenericModal>
  );
}
