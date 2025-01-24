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

/**
 * A modal component for adding a new year.
 *
 * The component renders a form with a single required field: year.
 * The component also renders a "Save" button and a "Close" button. When the "Save" button is clicked,
 * the `handleSaveModal` callback is called with the current `newRecord` state. If the form is not valid,
 * the "Save" button is disabled.
 *
 * The component receives the following props:
 *
 * - `isModalOpen`: A boolean indicating whether the modal should be open or not.
 * - `handleCloseModal`: A callback function to call when the modal is closed.
 * - `handleSaveModal`: A callback function to call when the "Save" button is clicked.
 * - `newRecord`: An object containing the current state of the form.
 * - `setNewRecord`: A function to update the `newRecord` state.
 */
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
