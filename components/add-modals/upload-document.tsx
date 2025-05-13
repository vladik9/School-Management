'use client';
import React, { useRef, useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface UploadDocumentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: (formData: FormData) => void;
  newRecord: {
    name?: string;
    doc?: File;
  };
  setNewRecord: (data: { name?: string; doc?: File; }) => void;
}

/**
 * A modal component for adding a new document.
 *
 * The component renders a form with two required fields: document name and file.
 * The file input is a drag-and-drop area or a file explorer.
 *
 * The component also renders a "Save" button and a "Close" button. When the "Save"
 * button is clicked, the `handleSaveModal` callback is called with the current
 * `newRecord` state. If the form is not valid, the "Save" button is disabled.
 *
 * The component receives the following props:
 *
 * - `isModalOpen`: A boolean indicating whether the modal should be open or not.
 * - `handleCloseModal`: A callback function to call when the modal is closed.
 * - `handleSaveModal`: A callback function to call when the "Save" button is clicked.
 * - `newRecord`: An object containing the current state of the form.
 * - `setNewRecord`: A function to update the `newRecord` state.
 */
export default function UploadDocument({
  isModalOpen,
  handleCloseModal,
  handleSaveModal,
  newRecord,
  setNewRecord,
}: UploadDocumentProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  /**
   * Updates the `newRecord` state with the new document name.
   *
   * Called when the user types a new name in the input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({
      ...newRecord,
      name: e.target.value,
    });
  };

  /**
   * Handles a click on the dropzone element.
   *
   * When the user clicks on the dropzone, we simulate a click on the hidden file input element.
   * This allows the user to select a file from their file system.
   */
  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handles a change in the file input field.
   *
   * Called when the user selects a new file in the file explorer or drags and drops a file.
   * If a file is selected, the `newRecord` state is updated with the file object and the file name is stored in the `uploadedFileName` state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setNewRecord({
      ...newRecord,
      doc: file,
    });
  };

  /**
   * Handles a dragover event on the dropzone element.
   *
   * We must call `e.preventDefault()` here to allow the drop event to fire.
   * @param {React.DragEvent<HTMLDivElement>} e - The drag event.
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /**
   * Handles a dragenter event on the dropzone element.
   *
   * This function is triggered when a file is dragged into the dropzone area.
   * It prevents the default behavior to allow the drop event to occur,
   * and sets `isDragActive` to `true` to visually indicate that a file
   * is being dragged over the dropzone.
   *
   * @param {React.DragEvent<HTMLDivElement>} e - The drag event.
   */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    /**
     * Handles a dragenter event on the dropzone element.
     *
     * We call `e.preventDefault()` here to allow the drop event to fire.
     * When the user drags a file over the dropzone, we set `isDragActive` to `true` to indicate that a file is being dragged.
     * @param {React.DragEvent<HTMLDivElement>} e - The drag event.
     */
    setIsDragActive(true);
  };

  /**
   * Handles a dragleave event on the dropzone element.
   *
   * When the user drags a file away from the dropzone, we set `isDragActive` to `false` to remove the dragover styling.
   * @param {React.DragEvent<HTMLDivElement>} e - The drag event.
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  /**
   * Handles a drop event on the dropzone element.
   *
   * When the user drops a file on the dropzone, this function is called.
   * It prevents the default behavior of opening the file in the browser,
   * and updates the `newRecord` state with the dropped file.
   *
   * If no file was dropped, the function returns early.
   * @param {React.DragEvent<HTMLDivElement>} e - The drop event.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setNewRecord({
      ...newRecord,
      doc: file,
    });
  };

  /**
   * Checks if the form is valid.
   *
   * The form is considered valid if both the document name and the document file are present in the `newRecord` state.
   *
   * @returns {boolean} Whether the form is valid.
   */

  const isFormValid = (): boolean => {
    const { name, doc } = newRecord;
    return !!(name && doc);
  };

  /**
   * Handles saving the document.
   *
   * This function creates a new FormData object and appends the document name and file to it.
   * It then calls the `handleSaveModal` callback with the FormData object.
   *
   * @returns {undefined}
   */
  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', newRecord.name || '');
    if (newRecord.doc) {
      formData.append('file', newRecord.doc);
    }
    handleSaveModal(formData);
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSave}
      title={translations.addDocument}
      description={translations.addDocumentDescription}
      isFormValid={isFormValid()}
    >
      <div className="space-y-4">
        {/* Document Name */}
        <div className="flex flex-col">
          <Label className="mb-5" htmlFor="docName">{translations.documentName}</Label>
          <Input
            id="docName"
            type="text"
            placeholder={translations.documentNamePlaceholder}
            value={newRecord.name || ''}
            onChange={handleNameChange}
          />
        </div>
        {/* Dropzone for the Document */}
        <div
          className={`border-2 border-dashed p-4 flex flex-col items-center justify-center
            transition-colors rounded cursor-pointer select-none
            ${isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
            }`}
          onClick={handleDropzoneClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-center text-gray-500">
            {isDragActive
              ? translations.dropHere
              : translations.dragDropFileHere
            }
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {translations.allowedFileFormats}
          </p>
        </div>
        {/* File Upload Feedback */}
        <p className="text-sm text-gray-500 mt-2">
          {uploadedFileName ? `${translations.fileNameUploaded}: ${uploadedFileName.slice(0, 40)}...${uploadedFileName.slice(-20)}` : `${translations.noDocuments}.`}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.png"
        />
      </div>
    </GenericModal>
  );
}
