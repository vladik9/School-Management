'use client';
import React, { useRef, useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';

interface UploadDocumentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: {
    name?: string;
    doc?: string;
  };
  setNewRecord: (data: { name?: string; doc?: string; }) => void;
}

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

  // Handle text input for the document name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({
      ...newRecord,
      name: e.target.value,
    });
  };

  // Open the file explorer when the dropzone area is clicked
  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle when a user selects a file via the file explorer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRecord({
        ...newRecord,
        doc: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // Drag event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRecord({
        ...newRecord,
        doc: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };
  const isFormValid = (): boolean => {
    const { name, doc, } = newRecord;
    return !!(name && doc);
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
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
          {uploadedFileName ? `Uploaded file: ${uploadedFileName}` : 'No file uploaded yet.'}
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
