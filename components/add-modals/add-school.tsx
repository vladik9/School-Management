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


/**
 * A modal component for adding a new school.
 *
 * This component renders a modal that allows users to input and save a new school name.
 * The modal utilizes the `GenericModal` component for consistent styling and behavior.
 * It includes form validation to ensure that all required fields are filled
 * before allowing the user to save the new school.
 *
 * Props:
 * - isModalOpen (boolean): Determines if the modal is open.
 * - handleCloseModal (function): Function to close the modal.
 * - handleSaveModal (function): Function to save the school details.
 * - newRecord (object): The current state of the school details being entered.
 * - setNewRecord (function): Function to update the school details state.
 *
 * Returns:
 * - A JSX element representing the modal to add a new school.
 */
export default function AddSchool({ isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord }: AddSchoolProps) {
  /**
   * Checks if the form is valid.
   *
   * The form is considered valid when the school name is not empty.
   * @returns {boolean} Whether the form is valid.
   */
  const isFormValid = (): boolean => {
    const { name } = newRecord;
    return !!(name);
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.addSchool}
      description={translations.addDescription}
      isFormValid={isFormValid()}
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
